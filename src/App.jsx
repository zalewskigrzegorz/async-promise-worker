import "./styles.css";
import React from "react";
import worker from "./worker";
import WebWorker from "./workerSetup";

import emulateLongReq from "./emulateLongReq";
import Charts from "./components/Charts";
import Form from "./components/Form";
import { useStateValue } from "./context/StateContext";

export default function App() {
  const [{},dispatch] = useStateValue();

  const ApiWorker = new WebWorker(worker);
  const ApiWorker2 = new WebWorker(worker);
  const ApiWorker3 = new WebWorker(worker);

  ApiWorker.addEventListener(
    "message",
    function (e) {
      dispatch({
        type: "setTaskResults",
        name: "first",
        time: performance.now(),
        newValue: e.data,
      });
    },
    false
  );
  ApiWorker2.addEventListener(
    "message",
    function (e) {
      dispatch({
        type: "setTaskResults",
        name: "second",
        time: performance.now(),
        newValue: e.data,
      });
    },
    false
  );
  ApiWorker3.addEventListener(
    "message",
    function (e) {
      dispatch({
        type: "setTaskResults",
        name: "third",
        time: performance.now(),
        newValue: e.data,
      });
    },
    false
  );

  const runTest = async (firstDelay,secondDelay,thirdDelay) => {
    dispatch({
      type: "reset",
    });
    dispatch({
      type: "setInProgress",
      newValue: true,
    });
    //async await
    dispatch({
      type: "setStartTime",
      name: "async",
      time: performance.now(),
    });

    const asyncX = await emulateLongReq(firstDelay);
    const asyncY = await emulateLongReq(secondDelay);
    const asyncZ = await emulateLongReq(thirdDelay);
    dispatch({
      type: "setAwaitResults",
      time: performance.now(),
      values: { first: asyncX, second: asyncY, third: asyncZ },
    });

    //Promise all
    dispatch({
      type: "setStartTime",
      name: "promise",
      time: performance.now(),
    });
    const [promiseX, promiseY, promiseZ] = await Promise.all([
      emulateLongReq(firstDelay),
      emulateLongReq(secondDelay),
      emulateLongReq(thirdDelay),
    ]);
    dispatch({
      type: "setPromiseResults",
      time: performance.now(),
      values: { first: promiseX, second: promiseY, third: promiseZ },
    });

    //Web worker
    // "the value in the worker will be lower than performance.now() in the window who spawned that worker."
    dispatch({
      type: "setStartTime",
      name: "task",
      time: performance.now(),
    });
    ApiWorker.postMessage({ cmd: "start", delay: firstDelay });
    ApiWorker2.postMessage({ cmd: "start", delay: secondDelay });
    ApiWorker3.postMessage({ cmd: "start", delay: thirdDelay });
  };
  return (
    <>
      <Form runTests={runTest} />
      <br />
      <Charts />
    </>
  );
}
