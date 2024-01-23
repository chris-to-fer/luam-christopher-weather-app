import { uid } from "uid";
import { useState, useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";

import Deleted from "./Deleted/Deleted";
import Location from "./components/Location/Location";
import List from "./components/List/List";
import Form from "./components/Form/Form";

import "./App.css";

function App() {
  //Hooks
  const [deleted, setDeleted] = useLocalStorageState("deleted", {
    defaultValue: [],
  });
  const [activities, setActivities] = useLocalStorageState("activities", {
    defaultValue: [],
  });
  const [weather, setWeather] = useState("");
  const [location, setLocation] = useState("europe");
  const [condition, setCondition] = useState("");
  const [temperature, setTemperature] = useState("");

  // const baseUrl = "https://example-apis.vercel.app/api/weather";
  // let url = `${baseUrl}/${location}`;

  // const url =
  //   location === "europe"
  //     ? "https://example-apis.vercel.app/api/weather"
  //     : `https://example-apis.vercel.app/api/weather/${location}`;

  //Fetch data
  useEffect(() => {
    async function getWeather() {
      try {
        let apiUrl = "https://example-apis.vercel.app/api/weather";
        if (location !== "europe") {
          apiUrl += `/${location}`;
        }

        const response = await fetch(apiUrl);
        const data = await response.json();

        setWeather(data.isGoodWeather);
        setCondition(data.condition);
        setTemperature(data.temperature);

        // check fetch url and data
        console.log("url ", apiUrl);
        console.log("data ", data);
      } catch (error) {
        console.log(error);
      }
    }
    getWeather();

    //Set fetch interval
    const interval = setInterval(() => {
      getWeather();
    }, 5000);

    //Clear interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, [location]);

  const isGoodWeather = weather;

  useEffect(() => {
    document.body.classList.toggle("good-weather", isGoodWeather);
    document.body.classList.toggle("bad-weather", !isGoodWeather);
  }, [isGoodWeather]);

  const filteredActivities = activities.filter(
    (a) => a.isForGoodWeather === isGoodWeather
  );

  // functions
  function handleLocationChange(e) {
    const selectedLocation = e.target.value;
    setLocation(selectedLocation);
  }

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

  // render
  return (
    <>
      <main>
        <Location location={location} onLocationChange={handleLocationChange} />
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
        <Deleted deleted={deleted} onRestoreActivity={handleRestoreActivity} />
      </main>
    </>
  );
}

export default App;
