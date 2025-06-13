import { type RouteConfig, index, route } from "@react-router/dev/routes";
import { Q } from "node_modules/react-router/dist/development/lib-CCSAGgcP.mjs";

export default [
  index("routes/LoginPage.tsx"),
  route("signup", "routes/Signup.tsx"),
  route("homepage", "routes/HomePage.tsx"),
  route("cart", "routes/Cart.tsx"),
  route("admin", "routes/Admin.tsx"),
] satisfies RouteConfig;