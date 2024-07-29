import React from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../interfaces/User";
import { instance } from "../../api/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(255),
});
export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(255),
  confirmPass: z.string().min(6).max(255),
});

type Props = {
  isLogin?: boolean;
};

const AuthForm = ({ isLogin }: Props) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<User>({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
  });
  const nav = useNavigate();
  const onSubmit = async (data: User) => {
    try {
      if (isLogin) {
        const res = await instance.post(`/login`, data);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("accessToken", res.data.accessToken);
        nav("/product");
      } else {
        await instance.post(`/register`, {
          email: data.email,
          password: data.password,
        });
        nav("/login");
      }
    } catch (error: any) {
      alert(error.response.data || "Error!");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>{isLogin ? "Login" : "Register"}</h1>
      <div className="mb-3">
        <label htmlFor="email" className="form-lable">
          email
        </label>
        <input
          className="form-control"
          type="text"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="text-danger">{errors.email.message}</span>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-lable">
          password
        </label>
        <input
          type="password"
          className="form-control"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <span className="text-danger">{errors.password.message}</span>
        )}
      </div>
      {!isLogin && (
        <div className="mb-3">
          <label htmlFor="comfirmPass" className="form-lable">
            comfirmPass
          </label>
          <input
            type="password"
            className="form-control"
            {...register("confirmPass", { required: true })}
          />
          {errors.confirmPass && (
            <span className="text-danger">{errors.confirmPass.message}</span>
          )}
        </div>
      )}
      <button className="btn btn-success">
        {isLogin ? "Login" : "Register"}
      </button>
    </form>
  );
};

export default AuthForm;
