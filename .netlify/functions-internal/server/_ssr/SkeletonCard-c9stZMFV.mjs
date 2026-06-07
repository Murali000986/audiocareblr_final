import { j as jsxRuntimeExports } from "../_libs/react.mjs";
function SkeletonCard() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-4 flex flex-col gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/3] rounded-xl shimmer" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 mt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-3/4 rounded shimmer" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-1/2 rounded shimmer" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-1/3 rounded shimmer" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-full rounded-lg shimmer mt-3" })
    ] })
  ] });
}
export {
  SkeletonCard as S
};
