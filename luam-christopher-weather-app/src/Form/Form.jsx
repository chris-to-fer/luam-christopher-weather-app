import "./Form.css";
export default function Form({ onAddActivity }) {
  return (
    <>
      <form className="form">
        <h2>Add new Activity:</h2>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" />
        <label htmlFor="checkbox">Good-weather activity:</label>
        <input type="checkbox" id="checkbox" name="checkbox" />
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </>
  );
}
