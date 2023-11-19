import { useEffect, useState } from "react";
import data from "./data.json";

const App = () => {
  const [restaurants, setRestaurants] = useState([]);

  const formattedRestaurants = (data) => {
    const groupedByState = data.reduce((result, restaurant) => {
      const state = restaurant.state;
      if (!result[state]) {
        result[state] = [];
      }
      result[state].push(restaurant);
      return result;
    }, {});

    return groupedByState;
  };

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(
          "https://nextjs-orpin-omega-98.vercel.app/api/restaurants"
        );
        const data = await response.json();
        const formattedData = formattedRestaurants(data);

        setRestaurants(formattedData);
      } catch (error) {
        // API call not working due to CORS
        // I created a file "data.json" and pasted the json data coming from the give API
        const formattedData = formattedRestaurants(data);

        setRestaurants(formattedData);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div className="grid place-content-center">
      {Object.entries(restaurants).map(([state, list]) => (
        <ul
          className="space-y-4 text-gray-500 list-disc list-inside dark:text-gray-400 mt-5"
          key={state}
        >
          <li>
            {state}
            <ol className="ps-5 mt-2 space-y-1 list-inside list-disc">
              {list.map((item, index) => (
                <li key={index}>{item.restaurant_name}</li>
              ))}
            </ol>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default App;
