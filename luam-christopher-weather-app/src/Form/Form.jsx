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
        <section className="namesection">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" />
        </section>
        <section className="checkbox-container">
          <label className="container" htmlFor="checkbox">
            Good-weather activity:
          </label>
          <input
            className="checkbox"
            type="checkbox"
            id="checkbox"
            name="isForGoodWeather"
          />
          <span className="checkmark"></span>
        </section>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </>
  );
}
