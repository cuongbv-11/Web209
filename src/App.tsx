import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.scss";
import AuthForm from "./pages/AuthForm/AuthForm";
import Header from "./pages/Header";

import { useEffect, useState } from "react";
import { Product } from "./interfaces/Product";
import { instance } from "./api/api";

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
    nav("/product");
  };
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<AuthForm isLogin />} />
        <Route path="/register" element={<AuthForm />} />
        <Route path="/product" />
        <Route path="/product-add" />
        <Route path="/product-edit/:id" />
      </Routes>
    </>
  );
}

export default App;
