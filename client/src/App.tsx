import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/ui/Navbar";
import useStore from "./store";
import Product from "./pages/Product";
import { Toaster } from "react-hot-toast";

function App() {
  const { cart, initializeCart } = useStore((state) => state);

  useEffect(() => {
    if (!localStorage.getItem("cart")) return;
    const cart = JSON.parse(localStorage.getItem("cart") || "");
    console.log({
      cart,
    });
    initializeCart(cart);
  }, []);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log({
      cart,
    });
  }, [cart]);

  return (
    <>
      <Toaster />

      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/:section" element={<Home />} />
          <Route path="/:section/:id" element={<Product />} />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
