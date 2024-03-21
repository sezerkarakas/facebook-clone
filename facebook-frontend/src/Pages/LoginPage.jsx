import { useState } from "react";
import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        loginCredentials
      );
      console.log(response);
      if (response.status === 200) {
        console.log("Login successful");
        navigate("/");
      } else {
        console.log("Login failed");
        return <h1>Failed to login</h1>;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="full-screen-center bg-slate-200">
      <div className="w-1/3 h-2/6 flex justify-start items-start flex-col">
        <h1 className="text-6xl text-blue-600 font-bold pb-5">facebook</h1>
        <p className="text-3xl text-black">
          Facebook tanıdıklarınla iletişim kurmanı ve hayatında olup bitenleri
          paylaşmanı sağlar.
        </p>
      </div>
      <div className="flex flex-col justify-center items-center w-1/5 h-2/5 bg-white  rounded-md shadow-gray-300 shadow-2xl border-gray-200 border-2 p-1 pb-5">
        <form
          className="flex flex-col justify-center items-center gap-5 w-full h-full"
          onSubmit={handleSubmit}
        >
          <input
            className="login-input"
            type="email"
            name="email"
            placeholder="E-posta"
            value={loginCredentials.email}
            onChange={(e) =>
              setLoginCredentials({
                ...loginCredentials,
                email: e.target.value,
              })
            }
          />
          <input
            className="login-input"
            type="password"
            name="password"
            placeholder="Şifre"
            value={loginCredentials.password}
            onChange={(e) =>
              setLoginCredentials({
                ...loginCredentials,
                password: e.target.value,
              })
            }
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
