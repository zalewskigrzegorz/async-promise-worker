import React, { useState } from "react";
import { useStateValue } from "../context/StateContext";

export default function Form({ runTests }) {
  const [{inProgress }] = useStateValue();
  const [firstDelay, setFirstDelay] = useState(50);
  const [secondDelay, setSecondDelay] = useState(400);
  const [thirdDelay, setThirdDelay] = useState(1200);

  return (
    <div className="container box">
      <fieldset className="tile is-ancestor " disabled={inProgress}>
        <div className="tile is-parent">
          <div className="tile is-3">
            <div className="field">
              <label className="label">First Delay</label>
              <div className="control">
                <input
                  className={"input"}
                  style={{ backgroundColor: "Orange" }}
                  type="number"
                  placeholder="First Delay"
                  value={firstDelay}
                  onChange={(e) => {
                    setFirstDelay(Number(e.target.value));
                  }}
                />
              </div>
            </div>
          </div>
          <div className="tile is-3">
            <div className="field">
              <label className="label">Second Delay</label>
              <div className="control">
                <input
                  className={"input"}
                  style={{ backgroundColor: "Blue", color: "white" }}
                  type="number"
                  placeholder="Second Delay"
                  value={secondDelay}
                  onChange={(e) => {
                    setSecondDelay(Number(e.target.value));
                  }}
                />
              </div>
            </div>
          </div>
          <div className="tile is-3">
            <div className="field">
              <label className="label">Third Delay</label>
              <div className="control">
                <input
                  className={"input"}
                  style={{ backgroundColor: "violet", color: "white" }}
                  type="number"
                  placeholder="Third Delay"
                  value={thirdDelay}
                  onChange={(e) => {
                    setThirdDelay(Number(e.target.value));
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </fieldset>
      <div className="control">
        <button
          className={`button is-primary ${inProgress ? "is-loading" : ""}`}
          onClick={() => runTests(firstDelay,secondDelay,thirdDelay)}
          type="button"
          disabled={inProgress}
        >
          run test
        </button>
      </div>
    </div>
  );
}
