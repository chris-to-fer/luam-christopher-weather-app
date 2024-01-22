import "./List.css";
export default function List({ activities, isGoodWeather }) {
  console.log(activities);
  return (
    <>
      <h2>
        {isGoodWeather === true
          ? "The weather is awesome! Go outside and:"
          : "Bad weather outside! Here's what you can do now:"}
      </h2>
      <ul className="list">
        {activities.map((activity) => (
          <li key={activity.id} className="activity">
            {activity.name}
          </li>
        ))}
      </ul>
    </>
  );
}
