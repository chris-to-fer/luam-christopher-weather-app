import "./Form.css";
export default function Form({ onAddActivity }) {
  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const newActivity = {
      name: data.name,
      isForGoodWeather: e.target.isForGoodWeather.checked,
    };

    e.target.reset();
    onAddActivity(newActivity);
  }
  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <h2>Add new Activity:</h2>
        <section className="name-container">
          <label htmlFor="name">Name:</label>
          <input className="name" type="text" id="name" name="name" required />
        </section>
        <section className="checkbox-container">
          <label htmlFor="checkbox">Good-weather activity:</label>
          <input
            className="check"
            type="checkbox"
            id="checkbox"
            name="isForGoodWeather"
          />
        </section>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </>
  );
}
