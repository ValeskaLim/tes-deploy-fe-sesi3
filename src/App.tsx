import axios from "axios";
import { useEffect, useState } from "react";

interface Channel {
  id: string;
  name: string;
  group: string;
  photo: string;
  subscriber_count: string;
}

function App() {
  const [datas, setData] = useState<Channel[]>([]);

  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    axios
      .get<Channel[]>("https://holodex.net/api/v2/channels", {
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
          (channel: Channel) =>
            channel.group && channel.group.toLowerCase().trim().includes("")
        );
        console.log(filteredData);
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
          Hololive English Channel List
        </h1>
        <div className="grid grid-cols-3 gap-3 my-10 mx-50">
          {datas.map((data) => (
            <div key={data.id} className="p-4 border rounded-xl shadow">
              <h2 className="text-3xl font-bold">{data.name}</h2>
              <p className="text-blue-500 font-bold text-xl">{data.group}</p>
              <div className="w-fit m-auto rounded-3xl overflow-hidden mt-4">
                <img
                  src={data.photo}
                  width={500}
                  height={500}
                  className="w-full h-full object-fit hover:scale-[1.05] transition ease-in-out duration-150"
                />
              </div>
              <p className="text-2xl">
                Subscribers:
                <span className="font-bold text-red-500">
                  {data.subscriber_count}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
