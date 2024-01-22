import "./List.css";
export default function List({ activities, isGoodWeather, goodActivities }) {
  console.log("isGoodWeather: ", isGoodWeather);
  return (
    <>
      <h2>
        {isGoodWeather === true
          ? "The weather is awesome! Go outside and:"
          : "Bad weather outside! Here's what you can do now:"}
      </h2>
      <ul className="list">
        {isGoodWeather
          ? goodActivities.map((activity) => (
              <li key={activity.id} className="activity">
                {activity.name}
              </li>
            ))
          : goodActivities.map((activity) => (
              <li key={activity.id} className="activity">
                {activity.name}
              </li>
            ))}
      </ul>
    </>
  );
}
