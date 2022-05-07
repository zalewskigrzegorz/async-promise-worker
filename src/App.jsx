import "./styles.css";
import React from "react";
import worker from "./worker";
import WebWorker from "./workerSetup";

import emulateLongReq from "./emulateLongReq";
import heavyLoad from "./heavyLoad";
import Charts from "./components/Charts";
import Form from "./components/Form";
import {useStateValue} from "./context/StateContext";

export default function App() {
  const [{}, dispatch] = useStateValue();

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

  const runTest = async ({runAsync,runPromise,runWorker},firstDelay, secondDelay, thirdDelay, heavy) => {
    dispatch({
      type: "reset",
    });
    dispatch({
      type: "setInProgress",
      newValue: true,
    });
    //async await
    if(runAsync){
      dispatch({
        type: "setStartTime",
        name: "async",
        time: performance.now(),
      });

      const asyncX = heavy ? await heavyLoad(firstDelay) : await emulateLongReq(firstDelay);
      const asyncY = heavy ? await heavyLoad(secondDelay) : await emulateLongReq(secondDelay);
      const asyncZ = heavy ? await heavyLoad(thirdDelay) : await emulateLongReq(thirdDelay);
      dispatch({
        type: "setAwaitResults",
        time: performance.now(),
        values: {first: asyncX, second: asyncY, third: asyncZ},
      });
    }
    //Promise all
    if(runPromise){
      dispatch({
        type: "setStartTime",
        name: "promise",
        time: performance.now(),
      });
      const [promiseX, promiseY, promiseZ] = await Promise.all([
        heavy ? heavyLoad(firstDelay) : emulateLongReq(firstDelay),
        heavy ? heavyLoad(secondDelay) : emulateLongReq(secondDelay),
        heavy ? heavyLoad(thirdDelay) : emulateLongReq(thirdDelay),
      ]);
      dispatch({
        type: "setPromiseResults",
        time: performance.now(),
        values: {first: promiseX, second: promiseY, third: promiseZ},
      });
    }

    //Web worker
    // "the value in the worker will be lower than performance.now() in the window who spawned that worker."
    if(runWorker){
      dispatch({
        type: "setStartTime",
        name: "task",
        time: performance.now(),
      });
      ApiWorker.postMessage({cmd: "start", delay: firstDelay, heavy});
      ApiWorker2.postMessage({cmd: "start", delay: secondDelay, heavy});
      ApiWorker3.postMessage({cmd: "start", delay: thirdDelay, heavy});
    }else{
      dispatch({
        type: "setInProgress",
        newValue: false,
      });
    }

  };
  return (
    <>
      <Form runTests={runTest}/>
      <br/>
      <Charts/>
    </>
  );
}
