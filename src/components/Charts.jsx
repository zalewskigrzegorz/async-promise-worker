import React, {useEffect, useState} from "react";
import {Chart, Bars, Transform} from "rumble-charts";
import {useStateValue} from "../context/StateContext";

export default function Charts() {
  const [{awaitResults, promiseResults, taskResults}] =
    useStateValue();
  const [memory, setMemory] = useState(0)
  useEffect(() => {
    let timer;
    if (window.performance.memory) {
      timer = setInterval(() => {
        setMemory(window.performance.memory.totalJSHeapSize / 1000000)
      }, 1000)
    }
    return () => {
      clearInterval(timer)
    };
  }, []);

  const series = [
    {
      data: [awaitResults.first, promiseResults.first, taskResults.first],
      color: "Orange",
    },
    {
      data: [awaitResults.second, promiseResults.second, taskResults.second],
      color: "Blue",
    },
    {
      data: [awaitResults.third, promiseResults.third, taskResults.third],
      color: "Violet",
    },
  ];
  return (
    <div className="container">
      {memory} MB
      <div className="is-flex is-flex-direction-row">
        <div
          className="is-flex is-flex-direction-column container"
          style={{gap: "0.5rem"}}
        >
          <div className="title">Await:</div>
          <div className="subtitle"> {Math.round(awaitResults.all)}</div>
          <div className="title">Promise all:</div>
          <div className="subtitle"> {Math.round(promiseResults.all)}</div>
          <div className="title">Web worker:</div>
          <div className="subtitle">{Math.round(taskResults.all)}</div>
        </div>
        <div className="container">
          <Chart width={600} height={250} series={series}>
            <Transform
              method={[
                'stack',
                'rotate'
              ]}
            >
              <Bars combined innerPadding="2%"/>
            </Transform>
          </Chart>
        </div>
      </div>
      <table className="table">
        <thead>
        <tr>
          <th></th>
          <th>First</th>
          <th>Second</th>
          <th>Third</th>
          <th>Total</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <th>Async await</th>
          <td>{Math.round(awaitResults.first)}</td>
          <td>{Math.round(awaitResults.second)}</td>
          <td>{Math.round(awaitResults.third)}</td>
          <td>{Math.round(awaitResults.all)}</td>
        </tr>
        <tr>
          <th>Promise all</th>
          <td>{Math.round(promiseResults.first)}</td>
          <td>{Math.round(promiseResults.second)}</td>
          <td>{Math.round(promiseResults.third)}</td>
          <td>{Math.round(promiseResults.all)}</td>
        </tr>
        <tr>
          <th>Web worker</th>
          <td>{Math.round(taskResults.first)}</td>
          <td>{Math.round(taskResults.second)}</td>
          <td>{Math.round(taskResults.third)}</td>
          <td>{Math.round(taskResults.all)}</td>
        </tr>
        </tbody>
      </table>
    </div>
  );
}
