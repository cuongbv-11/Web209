import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User } from "../../interfaces/User";
import { useAuth } from "../../Context/AuthContext";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(255),
});

export const registerSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6).max(255),
    confirmPass: z.string().min(6).max(255),
  })
  .refine((data) => data.password === data.confirmPass, {
    message: "Passwords do not match",
    path: ["confirmPass"],
  });

type Props = {
  isLogin?: boolean;
};

const AuthForm = ({ isLogin }: Props) => {
  const { login, register: registerUser } = useAuth();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<User>({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
  });

  const onSubmit = async (data: User) => {
    if (isLogin) {
      await login(data);
    } else {
      await registerUser(data);
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={handleSubmit(onSubmit)} className="login-popup-container">
        <h1>{isLogin ? "Login" : "Register"}</h1>
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
        {!isLogin && (
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
        <button className="submit">{isLogin ? "Login" : "Register"}</button>
      </form>
    </div>
  );
};

export default AuthForm;
