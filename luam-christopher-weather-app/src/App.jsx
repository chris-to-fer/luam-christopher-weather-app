import { useState } from "react";
import Form from "./Form/Form";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";
import List from "./List/List";

import "./App.css";

function App() {
  const [activities, setActivities] = useLocalStorageState("activities", {
    defaultValue: [],
  });
  const isGoodWeather = true;

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
        <List isForGoodWeather={isGoodWeather} activities={activities} />
        <Form onAddActivity={handleAddActivity} />
      </main>
    </>
  );
}

export default App;
