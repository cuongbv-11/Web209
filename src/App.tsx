import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import AuthForm from "./pages/AuthForm/AuthForm";
import Header from "./pages/Header";
import Dashboard from "./pages/Admin/Dashboard";
import Form from "./pages/Form/Form";
import Home from "./pages/Home/Home";
import Detail from "./pages/Home/Detail";
import Cart from "./pages/Cart/Cart";
function App() {
  return (
    <>
      <Header />

      <Routes>
<<<<<<< HEAD
        <Route path="/login" element={<AuthForm isRegister />} />
        <Route path="/register" element={<AuthForm />} />
=======
        <Route path="/login" element={<AuthForm />} />
        <Route path="/register" element={<AuthForm isRegister />} />
>>>>>>> 44a5c579e20b6d09b6ff4e7a132fc98672315067
        <Route path="/" element={<Home />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/product-detail/:id" element={<Detail />} />
        <Route path="/">
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/product-add" element={<Form />} />
          <Route path="/edit/:id" element={<Form />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
