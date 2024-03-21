import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div className="full-screen-center bg-slate-800">
      <div className="bg-black w-1/4 h-1/2 p-4">
        <div className="h-1/6">
          <h1 className="text-4xl">Kaydol</h1>
          <p>Hızlı ve kolaydır.</p>
        </div>
        <form className="w-1/2 h-3/6 grid gap-4">
          <div className="grid grid-flow-col h-full gap-x-4">
            <input type="text w-1/2" />
            <input type="text w-1/2" />
          </div>
          <input type="text w-full" />
          <input type="text w-full" />
          <input type="date" />
          <div className="flex flex-col h-1/6">
            <label>
              <input type="radio" />
              Erkek
            </label>
            <label>
              <input type="radio" />
              Kadın
            </label>
            <label>
              <input type="radio" />
              Özel
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
