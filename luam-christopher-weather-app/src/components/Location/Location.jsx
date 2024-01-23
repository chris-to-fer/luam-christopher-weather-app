import "./Location.css";

export default function Location({ location, onLocationChange }) {
  return (
    <>
      <section className="location-container">
        <label htmlFor="location">Choose Location: </label>
        <select id="location" value={location} onChange={onLocationChange}>
          <option value="europe">Europe</option>
          <option value="arctic">Arctic</option>
          <option value="sahara">Sahara</option>
          <option value="rainforest">Rainforest</option>
        </select>
      </section>
    </>
  );
}
