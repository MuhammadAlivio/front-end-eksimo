import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/LoginPage.tsx"),
  route("signup", "routes/Signup.tsx"),
  route("homepage", "routes/HomePage.tsx"),
  route("cart", "routes/Cart.tsx"),
  route("admin", "routes/Admin.tsx"),
  route("history", "routes/History.tsx"),
  route("payment/:id?/:quantity?", "routes/PaymentPage.tsx"),
  route("paymentSuccess", "routes/PaymentSuccess.tsx"),
  route("detailBarang/:id", "routes/DetailBarang.tsx"),
  route("product/:productId?", "routes/AddOrEditProduct.tsx"),
] satisfies RouteConfig;
