import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User } from "../../interfaces/User";
import { useAuth } from "../../Context/AuthContext";
import { instance } from "../../api/api";
import { useNavigate } from "react-router-dom";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(255),
});

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(255),
});

type Props = {
  isRegister?: boolean;
};

const AuthForm = ({ isRegister }: Props) => {
  const { login: contextLogin } = useAuth();
  const nav = useNavigate();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<User>({
    resolver: zodResolver(isRegister ? loginSchema : registerSchema),
  });

  const onSubmit = async (user: User) => {
    try {
      if (isRegister) {
        const { data } = await instance.post("/auth/register", {
          email: user.email,
          password: user.password,
        });
        console.log(user);
        alert(`Register success with email: ${data.data.email}`);
        // nav("/login");
      } else {
        const { data } = await instance.post("/auth/login", {
          email: user.email,
          password: user.password,
        });
        console.log(data);
        contextLogin(data.token, data.user);
        nav(data.data.user.role === "admin" ? "/admin" : "/");
      }
    } catch (error: any) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={handleSubmit(onSubmit)} className="login-popup-container">
        <h1>{isRegister ? "Register" : "Login"}</h1>
        <div className="login-popup-title">
          <label htmlFor="email" className="form-label">
            Email
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

        <div className="login-popup-inputs">
          <label htmlFor="password" className="form-label">
            Password
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

        <button className="submit">{isRegister ? "Register" : "Login"}</button>
      </form>
    </div>
  );
};

export default AuthForm;
