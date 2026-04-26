import { Outlet } from "react-router-dom";
import { Footer } from "./modules/customer/components/Home/Footer";
import Navbar from "./modules/customer/components/Home/Navbar";
import CartDrawer from "./modules/customer/components/cart/CartDrawer";
import { useCart } from "./store/cart";
import ChatBot from "./modules/customer/components/Home/ChatBot";

const App = () => {
  const { cart } = useCart();

  const actualCartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <div className="overflow-x-hidden w-full">
      <Navbar cartCount={actualCartCount} />

      <CartDrawer />
      <main>
        <Outlet />
      </main>

      <Footer />
      <ChatBot />
    </div>
  );
};

export default App;
