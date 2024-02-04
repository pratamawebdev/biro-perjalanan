import React, { useEffect, useRef } from "react";
import { login } from "../../../services/auth.service";
import { useNavigate } from "react-router-dom";

interface LoginData {
  email: string;
  password: string;
}
const FormLogin = () => {
  const navigate = useNavigate();
  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data: LoginData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    login(data, (status, res) => {
      if (status) {
        localStorage.setItem("token", res);

        navigate("/");
      } else {
        console.log("error");
      }
    });
  };

  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  return (
    <form onSubmit={handleLogin}>
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-bold text-slate-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          className="w-full px-3 py-2 text-sm border rounded opacity-50 text-slate-700"
          placeholder="example@gmail.com"
          name="email"
          autoComplete="email"
          ref={emailRef}
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-bold text-slate-700"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          className="w-full px-3 py-2 text-sm border rounded opacity-50 text-slate-700"
          placeholder="******"
          name="password"
        />
      </div>

      <button type="submit" className="w-full text-white bg-blue-600 btn">
        Login
      </button>
    </form>
  );
};

export default FormLogin;
