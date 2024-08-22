import { useState, useEffect } from "react";
import axios from "axios";
import logo from "/logo.svg";

function App() {
  const [data, setData] = useState([]);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/data/data.json');
        setData(response.data);
      } catch (error) {
        console.log('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  const getCurrentDay = () => {
    const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const currentDayIndex = new Date().getDay();
    return days[currentDayIndex];
  };

  const currentDay = getCurrentDay();

  return (
    <div className="flex justify-center flex-col items-center h-auto bg-white">
      <div  className=" bg-orange-600 h-24 rounded-xl m-8 px-4 flex items-center justify-between w-full max-w-lg">
        <div>
          <h1 className="text-sm mb-1 text-gray-500">My Balance</h1>
          <p className="text-2xl text-white font-medium">$921.48</p>
        </div>
        <div>
          <img src={logo} alt="logo" className="w-14 h-14" />
        </div>
      </div>
      <div className="bg-orange-50 rounded-2xl pt-10 items-center w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Spending last 7 days</h1>
        <div className="flex items-end space-x-4 h-64 mt-20 lg:ml-8 sm:m-20 relative">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center relative"
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                className={`flex flex-col items-center justify-end rounded-xl hover:cursor-pointer 
                 ${item.day === currentDay ? 'bg-teal-500 hover:bg-opacity-45' : 'bg-orange-500 hover:bg-opacity-45'}`}
                style={{
                  height: `${item.amount * 5}px`,
                  width: '50px',
                  transition: 'height 0.3s ease',
                }}
              >
                {hovered === index && (
                  <span className="absolute bottom-full mb-2 text-sm bg-gray-700 text-white p-1 rounded">
                    ${item.amount.toFixed(2)}
                  </span>
                )}
              </div>
              <span className="mt-2 text-sm">{item.day}</span>
            </div>
          ))}
        </div>
          <div className="border border-slate-300 border-solid m-10">
          </div>
          <div className="flex items-center justify-between mx-10 mb-10">
            <div>
              <h1 className="text-sm mb-1 text-gray-500">My Balance</h1>
              <p className="text-4xl text-black font-medium">$921.48</p>
            </div>
            <div className="pt-4">
              <p className="font-semibold">+2.4%</p>
              <p className="text-gray-500">From Last Month</p>
            </div>
          </div>
      </div>
    </div>
  );
}

export default App;


