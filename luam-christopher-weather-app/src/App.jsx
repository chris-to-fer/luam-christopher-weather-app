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
  const [condition, setCondition] = useState("");
  const [temperature, setTemperature] = useState("");

  const url = "https://example-apis.vercel.app/api/weather";

  useEffect(() => {
    async function getWeather() {
      try {
        const response = await fetch(url);

        const data = await response.json();
        setWeather(data.isGoodWeather);
        setCondition(data.condition);
        setTemperature(data.temperature);
        console.log("url fetch ", data);
      } catch (error) {
        console.log(error);
      }
    }
    getWeather();
    const interval = setInterval(() => {
      getWeather();
      return () => clearInterval(interval);
    }, 5000);
  }, [activities]);

  const isGoodWeather = weather;

  const filteredActivities = activities.filter(
    (a) => a.isForGoodWeather === isGoodWeather
  );
  console.log("iGW ", isGoodWeather);

  function handleAddActivity(newActivity) {
    setActivities([{ id: uid(), ...newActivity }, ...activities]);
  }

  function handleDeleteActivity(id) {
    setActivities(activities.filter((a) => a.id !== id));
  }

  return (
    <>
      <main>
        <header>
          <h1>{condition}</h1>
          <h1>{temperature}</h1>
        </header>
        <List
          isGoodWeather={isGoodWeather}
          activities={activities}
          filteredActivities={filteredActivities}
          onDeleteActivity={handleDeleteActivity}
        />
        <Form onAddActivity={handleAddActivity} />
      </main>
    </>
  );
}

export default App;
