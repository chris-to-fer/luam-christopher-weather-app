import { uid } from "uid";
import { useState, useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";

import Deleted from "./components/Deleted/Deleted";

import List from "./components/List/List";
import Form from "./components/Form/Form";

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
  const [location, setLocation] = useLocalStorageState("location", {
    defaultValue: "",
  });

  function handleLocation(e) {
    setLocation(e.target.value);
  }
  //let url = `https://example-apis.vercel.app/api/weather/${location}`;
  useEffect(() => {
    async function getWeather() {
      try {
        const response = await fetch(
          `https://example-apis.vercel.app/api/weather/${location}`
        );
        const data = await response.json();
        setWeather(data.isGoodWeather);
        setCondition(data.condition);
        setTemperature(data.temperature);
        console.clear();
        console.log("url fetch ", data);
      } catch (error) {
        console.log(error);
      }
    }
    getWeather();
    const interval = setInterval(() => {
      getWeather();
    }, 5000);
    return () => clearInterval(interval);
  }, [location]);

  const isGoodWeather = weather;

  useEffect(() => {
    document.body.classList.toggle("good-weather", isGoodWeather);
    document.body.classList.toggle("bad-weather", !isGoodWeather);
  }, [isGoodWeather]);

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

  function handleFinalDelete(id) {
    console.log("click");
    setDeleted(deleted.filter((a) => a.id !== id));
  }

  console.log("loc ", location);
  console.log("acti ", activities);
  console.log("deleted ", deleted);
  return (
    <>
      <main>
        <fieldset className="location-buttons">
          <legend>Choose a location:</legend>
          <input
            onChange={handleLocation}
            type="radio"
            id="newyork"
            name="loc"
            value="arctic"
            checked={location === "arctic"}
          />
          <label htmlFor="newyork">New York</label>
          <input
            onChange={handleLocation}
            type="radio"
            id="rio"
            name="loc"
            value="rainforest"
            checked={location === "rainforest"}
          />
          <label htmlFor="rio">Rio</label>
          <input
            onChange={handleLocation}
            type="radio"
            id="tokio"
            name="loc"
            value="sahara"
            checked={location === "sahara"}
          />
          <label htmlFor="tokio">Tokio</label>
          <input
            onChange={handleLocation}
            type="radio"
            id="berlin"
            name="loc"
            value="europe"
            checked={location === "europe"}
          />
          <label htmlFor="berlin">Berlin</label>
        </fieldset>
        <header>
          {" "}
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
        <Deleted
          onFinalDelete={handleFinalDelete}
          deleted={deleted}
          onRestoreActivity={handleRestoreActivity}
        />
      </main>
    </>
  );
}

export default App;
