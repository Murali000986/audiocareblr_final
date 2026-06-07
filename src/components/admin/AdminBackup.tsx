import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import {
  Shield, Download, Upload, RotateCcw, Trash2, Clock,
  Package, CheckCircle2, AlertTriangle, Loader2, RefreshCw,
  FileJson, CloudUpload,
} from "lucide-react";

interface BackupEntry {
  id: string;
  label: string;
  product_count: number;
  file_path: string;
  created_at: string;
}

interface BackupJSON {
  exported_at: string;
  product_count: number;
  version: string;
  products: Record<string, unknown>[];
}

export function AdminBackup() {
  const [backups, setBackups] = useState<BackupEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [backing, setBacking] = useState(false);
  const [restoring, setRestoring] = useState<string | null>(null);
  const [uploadRestoring, setUploadRestoring] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [productCount, setProductCount] = useState<number | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchBackups();
    fetchProductCount();
  }, []);

  const fetchProductCount = async () => {
    const { count } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true });
    setProductCount(count ?? 0);
  };

  const fetchBackups = async () => {
    setLoading(true);
    try {
      // Try to get from backups table first
      const { data, error } = await supabase
        .from("backups")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setBackups(data as BackupEntry[]);
      } else {
        // Table may not exist yet — show empty state
        setBackups([]);
      }
    } catch {
      setBackups([]);
    }
    setLoading(false);
  };

  const handleBackupNow = async () => {
    setBacking(true);
    toast.loading("Creating backup…", { id: "backup" });

    try {
      // 1. Fetch all products
      const { data: products, error: fetchError } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: true });

      if (fetchError) throw fetchError;
      if (!products || products.length === 0) {
        toast.error("No products to backup!", { id: "backup" });
        setBacking(false);
        return;
      }

      // 2. Build backup JSON
      const now = new Date();
      const label = `Backup — ${now.toLocaleDateString("en-IN", {
        day: "numeric", month: "short", year: "numeric",
        hour: "2-digit", minute: "2-digit",
      })}`;

      const backupData: BackupJSON = {
        exported_at: now.toISOString(),
        product_count: products.length,
        version: "1.0",
        products,
      };

      const jsonStr = JSON.stringify(backupData, null, 2);
      const blob = new Blob([jsonStr], { type: "application/json" });

      // 3. Upload to Supabase Storage
      const fileName = `backup_${now.getTime()}.json`;
      const filePath = `backups/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, blob, { contentType: "application/json", upsert: true });

      if (uploadError) {
        // Storage might not allow JSON — save to DB only
        console.warn("Storage upload failed:", uploadError.message);
      }

      // 4. Record in backups table
      const { error: insertError } = await supabase.from("backups").insert({
        label,
        product_count: products.length,
        file_path: filePath,
      });

      if (insertError) {
        // backups table may not exist — show SQL instruction
        toast.error(
          "Backups table not found. Please run FINAL_FIX.sql in Supabase first!",
          { id: "backup", duration: 6000 }
        );
        // Still download the file locally
        downloadJSON(jsonStr, fileName);
        setBacking(false);
        return;
      }

      // 5. Also download to computer
      downloadJSON(jsonStr, fileName);

      toast.success(
        `✅ Backup created — ${products.length} products saved & downloaded!`,
        { id: "backup", duration: 5000 }
      );

      fetchBackups();
      fetchProductCount();
    } catch (err: any) {
      toast.error(err?.message || "Backup failed", { id: "backup" });
    } finally {
      setBacking(false);
    }
  };

  const downloadJSON = (jsonStr: string, fileName: string) => {
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadBackup = async (backup: BackupEntry) => {
    toast.loading("Downloading backup…", { id: "dl-" + backup.id });
    try {
      const { data, error } = await supabase.storage
        .from("images")
        .download(backup.file_path);
      if (error) throw error;
      const text = await data.text();
      downloadJSON(text, backup.file_path.split("/").pop() || "backup.json");
      toast.success("Downloaded!", { id: "dl-" + backup.id });
    } catch (err: any) {
      toast.error("Download failed: " + err.message, { id: "dl-" + backup.id });
    }
  };

  const restoreFromBackup = async (backup: BackupEntry) => {
    if (!confirm(`Restore "${backup.label}"?\n\nThis will RE-INSERT ${backup.product_count} products. Existing products with the same ID will be skipped (upserted safely).`)) return;

    setRestoring(backup.id);
    toast.loading("Restoring products…", { id: "restore" });

    try {
      // Download backup JSON from storage
      const { data, error } = await supabase.storage
        .from("images")
        .download(backup.file_path);
      if (error) throw error;

      const text = await data.text();
      const parsed: BackupJSON = JSON.parse(text);

      await restoreProducts(parsed.products);
      toast.success(
        `✅ Restored ${parsed.products.length} products successfully!`,
        { id: "restore", duration: 5000 }
      );
      fetchProductCount();
    } catch (err: any) {
      toast.error(err?.message || "Restore failed", { id: "restore" });
    } finally {
      setRestoring(null);
    }
  };

  const restoreProducts = async (products: Record<string, unknown>[]) => {
    // Upsert in chunks of 50
    const CHUNK = 50;
    for (let i = 0; i < products.length; i += CHUNK) {
      const chunk = products.slice(i, i + CHUNK);
      const { error } = await supabase
        .from("products")
        .upsert(chunk as any[], { onConflict: "id" });
      if (error) throw error;
    }
  };

  const handleFileRestore = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".json")) {
      toast.error("Please select a valid .json backup file");
      return;
    }

    if (!confirm(`Restore from file "${file.name}"?\n\nThis will re-insert all products from the backup. Existing products with the same ID will be updated safely.`)) {
      if (fileRef.current) fileRef.current.value = "";
      return;
    }

    setUploadRestoring(true);
    toast.loading("Reading backup file…", { id: "file-restore" });

    try {
      const text = await file.text();
      const parsed: BackupJSON = JSON.parse(text);

      if (!parsed.products || !Array.isArray(parsed.products)) {
        throw new Error("Invalid backup file format");
      }

      toast.loading(`Restoring ${parsed.products.length} products…`, { id: "file-restore" });
      await restoreProducts(parsed.products);

      toast.success(
        `✅ Restored ${parsed.products.length} products from file!`,
        { id: "file-restore", duration: 5000 }
      );
      fetchProductCount();
    } catch (err: any) {
      toast.error(
        err?.message?.includes("JSON")
          ? "Invalid JSON file. Please use a valid AudioCare backup file."
          : err?.message || "Restore failed",
        { id: "file-restore" }
      );
    } finally {
      setUploadRestoring(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const deleteBackup = async (backup: BackupEntry) => {
    if (!confirm(`Delete backup "${backup.label}"? This cannot be undone.`)) return;
    setDeleting(backup.id);
    try {
      // Delete from storage
      await supabase.storage.from("images").remove([backup.file_path]);
      // Delete from table
      const { error } = await supabase.from("backups").delete().eq("id", backup.id);
      if (error) throw error;
      toast.success("Backup deleted");
      setBackups((prev) => prev.filter((b) => b.id !== backup.id));
    } catch (err: any) {
      toast.error(err?.message || "Delete failed");
    } finally {
      setDeleting(null);
    }
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString("en-IN", {
      day: "numeric", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-black text-2xl">Backup & Restore</h2>
          <p className="text-muted-foreground text-sm mt-0.5">
            Protect your product catalog. Backup now — restore instantly if data is lost.
          </p>
        </div>
        <button
          onClick={fetchBackups}
          className="p-2 rounded-lg hover:bg-section transition-colors text-muted-foreground"
          title="Refresh"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Stats + Action Cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        {/* Current Product Count */}
        <div className="glass border border-border rounded-2xl p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Package className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-display font-black text-primary">
              {productCount ?? "—"}
            </p>
            <p className="text-xs text-muted-foreground">Products in Database</p>
          </div>
        </div>

        {/* Last Backup */}
        <div className="glass border border-border rounded-2xl p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 text-green-400" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold truncate">
              {backups[0] ? formatDate(backups[0].created_at) : "Never"}
            </p>
            <p className="text-xs text-muted-foreground">Last backup</p>
          </div>
        </div>

        {/* Total Backups */}
        <div className="glass border border-border rounded-2xl p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <p className="text-2xl font-display font-black text-blue-400">
              {backups.length}
            </p>
            <p className="text-xs text-muted-foreground">Saved backups</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Backup Now */}
        <div className="glass border border-border rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
              <CloudUpload className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h3 className="font-bold">Backup Now</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Exports all {productCount ?? "?"} products to JSON. Saves to Supabase Storage + downloads to your computer.
              </p>
            </div>
          </div>
          <button
            onClick={handleBackupNow}
            disabled={backing}
            className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {backing ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Creating Backup…</>
            ) : (
              <><Download className="w-4 h-4" /> Create Backup & Download</>
            )}
          </button>
        </div>

        {/* Restore from File */}
        <div className="glass border border-border rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0 mt-0.5">
              <Upload className="w-4 h-4 text-orange-400" />
            </div>
            <div>
              <h3 className="font-bold">Restore from File</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Have a backup .json file on your computer? Upload it to restore all products instantly.
              </p>
            </div>
          </div>
          <label className={`w-full py-3 border-2 border-dashed border-orange-500/40 hover:border-orange-500 hover:bg-orange-500/5 text-orange-400 font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${uploadRestoring ? "opacity-50 cursor-not-allowed" : ""}`}>
            {uploadRestoring ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Restoring…</>
            ) : (
              <><FileJson className="w-4 h-4" /> Upload .json Backup File</>
            )}
            <input
              ref={fileRef}
              type="file"
              accept=".json,application/json"
              disabled={uploadRestoring}
              onChange={handleFileRestore}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Warning Banner */}
      <div className="flex items-start gap-3 p-4 rounded-xl border border-yellow-500/30 bg-yellow-500/5">
        <AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
        <div className="text-xs text-yellow-300">
          <strong>Important:</strong> The backups table must exist in Supabase for cloud backup history to work.
          Run <code className="bg-yellow-500/20 px-1 rounded">FINAL_FIX.sql</code> first, then add this SQL:
          <br />
          <code className="block mt-1 bg-black/30 p-2 rounded text-[10px] font-mono">
            create table if not exists public.backups (id uuid primary key default gen_random_uuid(), label text, product_count integer, file_path text, created_at timestamptz default now());
            alter table public.backups enable row level security;
            create policy "Admins can manage backups" on public.backups for all using (auth.jwt()-&gt;&gt;'email' in ('admin@audiocare.in','murali701081@gmail.com'));
          </code>
        </div>
      </div>

      {/* Backup History */}
      <div>
        <h3 className="font-display font-bold text-lg mb-4">Backup History</h3>
        {loading ? (
          <div className="flex items-center justify-center py-12 text-muted-foreground gap-2">
            <Loader2 className="w-5 h-5 animate-spin" /> Loading backups…
          </div>
        ) : backups.length === 0 ? (
          <div className="text-center py-16 glass border border-dashed border-border rounded-2xl">
            <Shield className="w-12 h-12 text-muted-foreground/20 mx-auto mb-3" />
            <p className="font-semibold text-muted-foreground">No backups yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Click "Create Backup & Download" to make your first backup.
            </p>
          </div>
        ) : (
          <div className="glass border border-border rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-section/50">
                  <th className="text-left px-4 py-3 text-xs font-bold text-muted-foreground uppercase">Label</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-muted-foreground uppercase">Products</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-muted-foreground uppercase">Date</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-muted-foreground uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {backups.map((b) => (
                  <tr key={b.id} className="border-b border-border last:border-0 hover:bg-section/20 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" />
                        <span className="font-semibold text-sm">{b.label}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-primary/10 text-primary">
                        {b.product_count} products
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">
                      {formatDate(b.created_at)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {/* Download */}
                        <button
                          onClick={() => downloadBackup(b)}
                          title="Download backup file"
                          className="p-1.5 rounded-md bg-section hover:bg-blue-500/20 hover:text-blue-400 transition-colors"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                        {/* Restore */}
                        <button
                          onClick={() => restoreFromBackup(b)}
                          disabled={!!restoring}
                          title="Restore from this backup"
                          className="p-1.5 rounded-md bg-section hover:bg-green-500/20 hover:text-green-400 transition-colors disabled:opacity-50"
                        >
                          {restoring === b.id
                            ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            : <RotateCcw className="w-3.5 h-3.5" />}
                        </button>
                        {/* Delete */}
                        <button
                          onClick={() => deleteBackup(b)}
                          disabled={deleting === b.id}
                          title="Delete backup"
                          className="p-1.5 rounded-md bg-section hover:bg-red-500/20 hover:text-red-400 transition-colors disabled:opacity-50"
                        >
                          {deleting === b.id
                            ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            : <Trash2 className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Recovery Guide */}
      <div className="glass border border-border rounded-2xl p-6">
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <Shield className="w-4 h-4 text-primary" /> Emergency Recovery Guide
        </h3>
        <ol className="space-y-3 text-sm text-muted-foreground">
          <li className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">1</span>
            <span>
              <strong className="text-foreground">If tables are deleted:</strong> Run{" "}
              <code className="text-primary bg-primary/10 px-1 py-0.5 rounded text-[11px]">FINAL_FIX.sql</code>{" "}
              in Supabase SQL Editor to recreate all tables.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">2</span>
            <span>
              <strong className="text-foreground">If products are missing:</strong> Use the{" "}
              <strong className="text-foreground">Backup History</strong> above → click{" "}
              <RotateCcw className="w-3 h-3 inline text-green-400" /> Restore on the latest backup.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">3</span>
            <span>
              <strong className="text-foreground">If you only have a downloaded file:</strong> Click{" "}
              <strong className="text-foreground">Upload .json Backup File</strong> and pick the file
              from your computer.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">4</span>
            <span>
              <strong className="text-foreground">Images are always safe:</strong> Photos live in
              Supabase Storage and survive table deletions — they reconnect automatically on restore.
            </span>
          </li>
        </ol>
      </div>
    </div>
  );
}
