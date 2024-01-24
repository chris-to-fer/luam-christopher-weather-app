import React from "react";
import "./Deleted.css";

import { useState } from "react";
export default function Deleted({ deleted, onRestoreActivity, onFinalDelete }) {
  const [reveal, setReveal] = useState(false);

  function handleReveal() {
    setReveal(!reveal);
    setTimeout(() => {
      reveal ? window.scrollBy(0, -50) : window.scrollBy(0, +500);
    }, 10);
  }
  const items = deleted?.map((e) => (
    <article key={e.id} className="activity">
      <li className="activity-item">
        {e.name}
        <section className="kill">
          <button
            alt="restore"
            className="tooltip"
            onClick={() => {
              onRestoreActivity(e.id);
            }}
          >
            ✚<span class="tooltiptext">Press to restore</span>
          </button>

          <button
            alt="kill"
            className="tooltip"
            onClick={() => {
              onFinalDelete(e.id);
            }}
          >
            ❌<span class="tooltiptext">Press to kill for good</span>
          </button>
        </section>
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
        {reveal ? "hide history" : "show history"}
      </button>
      {reveal && <section className="deleted-container">{items}</section>}
    </>
  );
}
