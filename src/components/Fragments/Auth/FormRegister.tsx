import React, { useEffect, useRef } from "react";
import { register } from "../../../services/auth.service";

interface RegisterData {
  email: string;
  name: string;
  password: string;
}
const FormRegister = () => {
  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data: RegisterData = {
      email: formData.get("email") as string,
      name: formData.get("name") as string,
      password: formData.get("password") as string,
    };

    register(data, (status, res) => {
      if (status) {
        localStorage.setItem("token", res);
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
    <form onSubmit={handleRegister}>
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
          className="w-full px-3 py-2 text-sm border rounded opacity-50 text-slate-900"
          placeholder="example@gmail.com"
          name="email"
          autoComplete="false"
          ref={emailRef}
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-bold text-slate-700"
        >
          Name
        </label>
        <input
          type="name"
          id="name"
          className="w-full px-3 py-2 text-sm border rounded opacity-50 text-slate-700"
          placeholder="example@gmail.com"
          name="name"
          autoComplete="false"
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
        Register
      </button>
    </form>
  );
};

export default FormRegister;
