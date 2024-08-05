import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "../../interfaces/User";
import { useAuth } from "../../Context/AuthContext";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import { schemaLogin, schemaRegister } from "../../utils/authSchema";
import instance from "../../api/api";
=======
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
>>>>>>> 44a5c579e20b6d09b6ff4e7a132fc98672315067

type Props = {
  isRegister?: boolean;
};

const AuthForm = ({ isRegister }: Props) => {
<<<<<<< HEAD
  const nav = useNavigate();
  const { login: contextLogin } = useAuth();
=======
  const { login: contextLogin } = useAuth();
  const nav = useNavigate();
>>>>>>> 44a5c579e20b6d09b6ff4e7a132fc98672315067
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
<<<<<<< HEAD
    resolver: zodResolver(isRegister ? schemaRegister : schemaLogin),
  });
=======
    resolver: zodResolver(isRegister ? loginSchema : registerSchema),
  });

>>>>>>> 44a5c579e20b6d09b6ff4e7a132fc98672315067
  const onSubmit = async (user: User) => {
    try {
      if (isRegister) {
        const { data } = await instance.post("/auth/register", {
          email: user.email,
          password: user.password,
        });
<<<<<<< HEAD
        console.log(data);
        alert(`Register success with email: ${data.email}`);
        nav("/login");
      } else {
        const { data } = await instance.post("/auth/login", user);
        console.log(data);
        contextLogin(data.token, data.user);
        nav(data.user.role === "admin" ? "/admin" : "/");
=======
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
>>>>>>> 44a5c579e20b6d09b6ff4e7a132fc98672315067
      }
    } catch (error: any) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={handleSubmit(onSubmit)} className="login-popup-container">
<<<<<<< HEAD
        <h1>{isRegister ? "Login" : "Register"}</h1>
=======
        <h1>{isRegister ? "Register" : "Login"}</h1>
>>>>>>> 44a5c579e20b6d09b6ff4e7a132fc98672315067
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
<<<<<<< HEAD
        {!isRegister && (
          <div className="login-popup-inputs">
            <label htmlFor="confirmPass" className="form-label">
              Confirm Password
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
        <button className="submit">{isRegister ? "Login" : "Register"}</button>
=======

        <button className="submit">{isRegister ? "Register" : "Login"}</button>
>>>>>>> 44a5c579e20b6d09b6ff4e7a132fc98672315067
      </form>
    </div>
  );
};

export default AuthForm;
