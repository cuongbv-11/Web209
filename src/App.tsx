import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.scss";
import AuthForm from "./pages/AuthForm/AuthForm";
import Header from "./pages/Header";
import Dashboard from "./pages/Admin/Dashboard";
import Form from "./pages/Form/Form";
import Home from "./pages/Home/Home";
import Detail from "./pages/Home/Detail";
import { StoreProvider } from "./Context/StoreContext";
import Cart from "./pages/Cart/Cart";

function App() {
  const nav = useNavigate();

  return (
    <StoreProvider>
      <Header />

      <Routes>
        <Route path="/login" element={<AuthForm isLogin />} />
        <Route path="/register" element={<AuthForm />} />
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/">
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/add" element={<Form />} />
          <Route path="/edit/:id" element={<Form />} />
        </Route>
      </Routes>
    </StoreProvider>
  );
}

export default App;
