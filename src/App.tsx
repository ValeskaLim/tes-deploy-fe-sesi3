import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [datas, setData] = useState([]);

  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    axios
      .get("https://holodex.net/api/v2/channels", {
        params: {
          org: "Hololive",
          lang: "en",
          limit: 100,
          order: "desc",
          offset: 0,
        },
        headers: {
          "X-APIKEY": API_KEY,
        },
      })
      .then((response) => {
        const filteredData = response.data.filter(
          (channel) =>
            channel.group && channel.group.toLowerCase().trim().includes("english")
        );
        console.log(response.data);
        setData(filteredData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="text-center min-h-screen flex flex-col justify-center mt-5">
        <h1 className="text-blue-600 text-5xl">
          Fetch API in React using Axios
        </h1>
        <div className="grid grid-cols-3 gap-3 mt-5 mx-10">
          {datas.map((data) => (
            <div key={data.id} className="p-4 border rounded shadow">
              <h2 className="text-xl font-bold">{data.name}</h2>
              <p>{data.group}</p>
              <img src={data.photo} />
              <p>{data.lang}</p>
              <p>{data.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
