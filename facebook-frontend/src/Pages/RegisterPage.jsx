import { useState } from "react";
import axios from "axios";

const RegisterPage = ({ handleModal }) => {
  const [registerCredentials, setRegisterCredentials] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    dateOfBirth: new Date(),
    gender: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/register",
        registerCredentials
      );
      if (response.status === 201) {
        console.log("Register successful");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="full-screen-center text-black">
      <div className="bg-white w-1/4 h-4/6 p-4 border-neutral-300 border rounded-md shadow-md">
        <div className="h-1/6 w-full">
          <div className="flex-row flex justify-between">
            <h1 className="text-4xl font-bold text-neutral-800">Kaydol</h1>
            <button className="text-neutral-500 text-3xl" onClick={handleModal}>
              x
            </button>
          </div>
          <p className="text-neutral-400">Hızlı ve kolaydır.</p>
          <div className="w-full border-neutral-300 border-b "></div>
        </div>
        <form className="w-1/2 h-4/6 grid gap-4 p-2" onSubmit={handleSubmit}>
          <div className="grid grid-flow-col gap-x-4">
            <input
              type="text"
              placeholder="Adın"
              name="name"
              className="border border-neutral-300 bg-neutral-100 rounded-md pl-2"
              value={registerCredentials.name}
              onChange={(e) =>
                setRegisterCredentials({
                  ...registerCredentials,
                  name: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Soyadın"
              name="surname"
              className="border border-neutral-300 bg-neutral-100 rounded-md pl-2"
              value={registerCredentials.surname}
              onChange={(e) =>
                setRegisterCredentials({
                  ...registerCredentials,
                  surname: e.target.value,
                })
              }
            />
          </div>
          <input
            type="email"
            placeholder="E-posta"
            name="email"
            className="border border-neutral-300 bg-neutral-100 rounded-md pl-2"
            value={registerCredentials.email}
            onChange={(e) =>
              setRegisterCredentials({
                ...registerCredentials,
                email: e.target.value,
              })
            }
          />
          <input
            type="password"
            placeholder="Yeni Şifre"
            name="password"
            className="border border-neutral-300 bg-neutral-100 rounded-md pl-2"
            value={registerCredentials.password}
            onChange={(e) =>
              setRegisterCredentials({
                ...registerCredentials,
                password: e.target.value,
              })
            }
          />
          <div className="flex flex-col">
            <label className="h-2/6 text-sm"> Doğum Tarihi</label>
            <input
              type="date"
              name="dateOfBirth"
              className="rounded-md h-4/6 border-neutral-300 bg-neutral-100 border"
              value={registerCredentials.dateOfBirth}
              onChange={(e) =>
                setRegisterCredentials({
                  ...registerCredentials,
                  dateOfBirth: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col h-full">
            <label className="text-sm">Cinsiyet</label>
            <div className="flex flex-row h-5/6 gap-4">
              <div className="bg-white border border-neutral-300 w-1/3 flex flex-row justify-around items-center rounded-md">
                Erkek
                <input
                  type="radio"
                  name="gender"
                  onChange={() =>
                    setRegisterCredentials({
                      ...registerCredentials,
                      gender: "Erkek",
                    })
                  }
                />
              </div>
              <div className="bg-white border border-neutral-300 w-1/3 flex flex-row justify-around items-center rounded-md">
                Kadın
                <input
                  type="radio"
                  name="gender"
                  onChange={() =>
                    setRegisterCredentials({
                      ...registerCredentials,
                      gender: "Kadın",
                    })
                  }
                />
              </div>
              <div className="bg-white border border-neutral-300 w-1/3 flex flex-row justify-around items-center rounded-md">
                Özel
                <input
                  type="radio"
                  name="gender"
                  onChange={() =>
                    setRegisterCredentials({
                      ...registerCredentials,
                      gender: "Özel",
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <button className="bg-special-green text-white w-5/12 h-5/6 rounded-md font-bold text-lg">
              Kaydol
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
