import { useState, useEffect } from "react";
import "../index.css";
import { Link } from "react-router-dom";

const LoginPage = () => {

  const [loginCredentials, setLoginCredentials] = useState({})

  return (
    <div className="flex flex-row justify-center items-center h-dvh w-screen bg-slate-200">
      <div className="w-1/3 h-2/6 flex justify-start items-start flex-col">
        <h1 className="text-6xl text-blue-600 font-bold pb-5">facebook</h1>
        <p className="text-3xl text-black">
          Facebook tanıdıklarınla iletişim kurmanı ve hayatında olup bitenleri
          paylaşmanı sağlar.
        </p>
      </div>
      <div className="flex flex-col justify-center items-center w-1/5 h-2/5 bg-white  rounded-md shadow-gray-300 shadow-2xl border-gray-200 border-2 p-1 pb-5">
        <form className="flex flex-col justify-center items-center gap-5 w-full h-full">
          <input
            className="login-input"
            type="email"
            name="email"
            placeholder="E-posta"
          />
          <input
            className="login-input"
            type="password"
            name="password"
            placeholder="Şifre"
          />
          <button
            className="w-11/12 h-1/5  bg-blue-700 h-1/6 rounded-md font-bold text-xl"
            type="submit"
          >
            Giriş Yap
          </button>
          <Link className="text-blue-600" to="/forgotPassword">
            Şifreni mi unuttun?
          </Link>
          <div className="w-11/12 border-b border-gray-300"></div>
        </form>
        <button className="w-6/12 h-1/6  bg-lime-600 rounded-md font-bold text-xl flex justify-center items-center">
          Yeni Hesap Oluştur
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
