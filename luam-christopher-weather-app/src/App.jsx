import { useState, useEffect } from "react";
import Form from "./Form/Form";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";
import List from "./List/List";

import "./App.css";

function App() {
  const [activities, setActivities] = useLocalStorageState("activities", {
    defaultValue: [],
  });
  const [weather, setWeather] = useState("");

  const url = "https://example-apis.vercel.app/api/weather";

  useEffect(() => {
    async function getWeather() {
      try {
        const response = await fetch(url);

        const data = await response.json();
        setWeather(data.isGoodWeather);
        console.log("url fetch ", data);
      } catch (error) {
        console.log(error);
      }
    }
    getWeather();
  }, []);
  const isGoodWeather = weather;

  const filteredActivities = activities.filter(
    (a) => a.isForGoodWeather === isGoodWeather
  );
  console.log("iGW ", isGoodWeather);

  function handleAddActivity(newActivity) {
    setActivities([{ id: uid(), ...newActivity }, ...activities]);
  }

  return (
    <>
      <main>
        <List
          isGoodWeather={isGoodWeather}
          activities={activities}
          filteredActivities={filteredActivities}
        />
        <Form onAddActivity={handleAddActivity} />
      </main>
    </>
  );
}

export default App;
