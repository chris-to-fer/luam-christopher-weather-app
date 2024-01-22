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
  const [weather, setWeather] = useState(true);
  const isGoodWeather = weather;
  const url = "https://example-apis.vercel.app/api/weather";

  useEffect(() => {
    async function getWeather() {
      try {
        const response = await fetch(url);
        console.log("response status", response.status);
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    getWeather();
  }, []);

  const goodActivities = activities.filter(
    (a) => a.isForGoodWeather === isGoodWeather
  );
  console.log("GA ", goodActivities);

  function handleAddActivity(newActivity) {
    setActivities([{ id: uid(), ...newActivity }, ...activities]);
  }

  return (
    <>
      <main>
        <List
          isGoodWeather={isGoodWeather}
          activities={activities}
          goodActivities={goodActivities}
        />
        <Form onAddActivity={handleAddActivity} />
      </main>
    </>
  );
}

export default App;
