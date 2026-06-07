import { j as jsxRuntimeExports } from "../_libs/react.mjs";
const SplitErrorComponent = ({
  error,
  reset
}) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-10 text-center", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
    "Error: ",
    error.message
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: reset, className: "mt-4 px-4 py-2 bg-primary text-primary-foreground rounded", children: "Retry" })
] });
export {
  SplitErrorComponent as errorComponent
};
