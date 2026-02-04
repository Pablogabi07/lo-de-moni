import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Products from "./pages/Products";
import Offers from "./pages/Offers";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";

// Admin
import Login from "./pages/Admin/Login";
import Dashboard from "./pages/Admin/Dashboard";
import EditProduct from "./pages/Admin/EditProduct";
import NewProduct from "./pages/Admin/NewProduct";
import OffersDashboard from "./pages/Admin/OffersDashboard";
import NewOffer from "./pages/Admin/NewOffer";
import EditOffer from "./pages/Admin/EditOffer";



export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Público */}
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Products />} />
        <Route path="/ofertas" element={<Offers />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/carrito" element={<Cart />} />

        {/* Admin */}
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/new" element={<NewProduct />} />
        <Route path="/admin/edit/:id" element={<EditProduct />} />
        <Route path="/admin/offers" element={<OffersDashboard />} />
<Route path="/admin/offers/new" element={<NewOffer />} />
<Route path="/admin/offers/edit/:id" element={<EditOffer />} />

      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
