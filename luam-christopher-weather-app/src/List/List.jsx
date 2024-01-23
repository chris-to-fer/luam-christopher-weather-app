import "./List.css";
export default function List({
  isLoading,
  activities,
  isGoodWeather,
  filteredActivities,
  onDeleteActivity,
}) {
  const listItems = filteredActivities?.map((activity) => (
    <article key={activity.id} className="activity">
      <li className="activity-item">
        {activity.name}
        <button
          className="delete-button"
          onClick={() => {
            onDeleteActivity(activity.id);
          }}
        >
          X
        </button>
      </li>
    </article>
  ));

  return (
    <>
      {isLoading === "start" ? (
        ""
      ) : (
        <h2>
          {isGoodWeather === true
            ? "The weather is awesome! Go outside and:"
            : "Bad weather outside! Here's what you can do now:"}
        </h2>
      )}
      <ul className="activity-container">{listItems}</ul>
    </>
  );
}
