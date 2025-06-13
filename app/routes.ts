import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/LoginPage.tsx"), route("signup", "routes/Signup.tsx"), route("homepage", "routes/HomePage.tsx"), route("cart", "routes/Cart.tsx")] satisfies RouteConfig;
