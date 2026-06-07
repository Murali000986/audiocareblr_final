import { r as reactExports } from "../_libs/react.mjs";
const CartContext = reactExports.createContext(null);
const useCart = () => {
  const c = reactExports.useContext(CartContext);
  if (!c) throw new Error("useCart must be inside CartProvider");
  return c;
};
export {
  useCart as u
};
