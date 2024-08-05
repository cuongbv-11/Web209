import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "../../interfaces/User";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { schemaLogin, schemaRegister } from "../../utils/authSchema";
import instance from "../../api/api";

type Props = {
  isRegister?: boolean;
};

const AuthForm = ({ isRegister }: Props) => {
  const nav = useNavigate();
  const { login: contextLogin } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(isRegister ? schemaRegister : schemaLogin),
  });
  const onSubmit = async (user: User) => {
    try {
      if (isRegister) {
        const { data } = await instance.post("/auth/register", {
          email: user.email,
          password: user.password,
        });
        console.log(data);
        alert(`Register success with email: ${data.email}`);
        nav("/login");
      } else {
        const { data } = await instance.post("/auth/login", user);
        console.log(data);
        contextLogin(data.token, data.user);
        nav(data.user.role === "admin" ? "/admin" : "/");
      }
    } catch (error: any) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={handleSubmit(onSubmit)} className="login-popup-container">
        <h1>{isRegister ? "Login" : "Register"}</h1>
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
      </form>
    </div>
  );
};

export default AuthForm;
