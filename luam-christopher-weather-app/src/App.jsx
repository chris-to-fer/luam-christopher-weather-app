import { useState, useEffect } from "react";
import Form from "./Form/Form";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";
import List from "./List/List";
import Deleted from "./Deleted/Deleted";

import "./App.css";

function App() {
  const [deleted, setDeleted] = useLocalStorageState("deleted", {
    defaultValue: [],
  });
  const [activities, setActivities] = useLocalStorageState("activities", {
    defaultValue: [],
  });
  const [weather, setWeather] = useState("");
  const [condition, setCondition] = useState("");
  const [temperature, setTemperature] = useState("");
  const [loading, setLoading] = useState("start");

  const url = "https://example-apis.vercel.app/api/weather";

  useEffect(() => {
    async function getWeather() {
      try {
        const response = await fetch(url);

        const data = await response.json();
        setLoading("done");
        setWeather(data.isGoodWeather);
        setCondition(data.condition);
        setTemperature(data.temperature);
        // console.clear();
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
  }, []);

  const isGoodWeather = weather;

  const filteredActivities = activities.filter(
    (a) => a.isForGoodWeather === isGoodWeather
  );

  function handleAddActivity(newActivity) {
    setActivities([{ id: uid(), ...newActivity }, ...activities]);
  }

  function handleDeleteActivity(id) {
    setDeleted([...deleted, ...activities.filter((e) => e.id === id)]);
    console.log("deleted ", deleted);
    setActivities(activities.filter((a) => a.id !== id));
  }

  function handleRestoreActivity(id) {
    setActivities([...activities, ...deleted.filter((a) => a.id === id)]);
    setDeleted(deleted.filter((a) => a.id !== id));
  }

  console.log("acti ", activities);
  console.log("deleted ", deleted);
  return (
    <>
      <main>
        <header>
          <h1>{condition}</h1>
          <h1>{temperature}</h1>
        </header>

        <List
          isLoading={loading}
          isGoodWeather={isGoodWeather}
          activities={activities}
          filteredActivities={filteredActivities}
          onDeleteActivity={handleDeleteActivity}
        />
        <Form onAddActivity={handleAddActivity} />
        <Deleted deleted={deleted} onRestoreActivity={handleRestoreActivity} />
      </main>
    </>
  );
}

export default App;
