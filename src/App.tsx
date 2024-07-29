import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.scss";
import AuthForm from "./pages/AuthForm/AuthForm";
import Header from "./pages/Header";

import { useEffect, useState } from "react";
import { Product } from "./interfaces/Product";
import { instance } from "./api/api";
import Dashboard from "./pages/Admin/Dashboard";
import Form from "./pages/Form/Form";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const nav = useNavigate();
  const fetchProducts = async () => {
    const { data } = await instance.get(`products`);
    setProducts(data);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const handleRemove = async (id: any) => {
    if (confirm("are you su")) {
      await instance.delete(`products/${id}`);
      setProducts(products.filter((item) => item.id !== id));
    }
  };
  const onSubmitProduct = async (data: Product) => {
    if (data.id) {
      await instance.patch(`/products/${data.id}`, data);
      fetchProducts();
    } else {
      const res = await instance.post(`/products`, data);
      setProducts([...products, res.data]);
    }
    nav("/admin");
  };
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<AuthForm isLogin />} />
        <Route path="/register" element={<AuthForm />} />
        <Route
          path="/admin"
          element={<Dashboard products={products} onDel={handleRemove} />}
        />
        <Route path="/add" element={<Form onSubmit={onSubmitProduct} />} />
        <Route path="/edit/:id" element={<Form onSubmit={onSubmitProduct} />} />
      </Routes>
    </>
  );
}

export default App;
