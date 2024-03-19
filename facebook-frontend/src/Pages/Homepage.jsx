import { useEffect, useState } from "react";
import axios from "axios";
import Account from "../components/navbarComponents/LittleComps/Account/Account";
import PostCard from "../components/navbarComponents/LittleComps/PostCard/PostCard";

const Homepage = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/");
      console.log(response.data);
      const { photos } = response.data;
      setData(photos);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <div className="container mx-auto flex justify-center flex-col items-center w-8/12">
        <form className="container my-4 flex justify-center items-center w-6/12 h-32 bg-zinc-800 rounded-md flex-col">
          <div className="flex justify-evenly items-center w-full mb-3">
            <Account />
            <input
              className="h-10 w-10/12 rounded-full bg-neutral-700"
              type="text"
              placeholder="Bugün ne düşünüyorsun?"
            />
          </div>
          <div className="flex flex-col justify-between items-center w-full">
            <div className="w-11/12 border-b border-zinc-700"></div>
            <div className="flex flex-row justify-center mt-5 gap-x-24">
              <div>Canlı Video</div>
              <div>Fotoğraf/Video</div>
              <div>His/Hareket</div>
            </div>
          </div>
        </form>
        <div className="w-6/12">
          {data &&
            data.map((item, idx) => {
              return <PostCard key={idx} photo={item} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
