import React from "react";
import "./Deleted.css";

import { useState } from "react";
export default function Deleted({ deleted, onRestoreActivity }) {
  const [reveal, setReveal] = useState(false);
  function handleReveal() {
    setReveal(!reveal);
  }
  const items = deleted?.map((e) => (
    <article key={e.id} className="activity">
      <li className="activity-item">
        {e.name}
        <button
          className="delete-button"
          onClick={() => {
            onRestoreActivity(e.id);
          }}
        >
          +
        </button>
      </li>
    </article>
  ));

  return (
    <>
      <button
        onClick={() => {
          handleReveal();
        }}
        className="revealButton"
      >
        {reveal ? "Hide history" : "Reveal history"}
      </button>
      {reveal && <section className="deleted-container">{items}</section>}
    </>
  );
}
