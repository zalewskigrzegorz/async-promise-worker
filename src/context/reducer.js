import initialState from "./initialState";

const reducer = (state, action) => {
  switch (action.type) {
    case "setInProgress":
      return {
        ...state,
        inProgress: action.newValue,
      };
    case "setStartTime":
      return {
        ...state,
        startTimes: {...state.startTimes, [action.name]: action.time},
      };
    case "setAwaitResults":
      return {
        ...state,
        awaitResults: {
          first: action.values.first - state.startTimes.async,
          second: action.values.second - state.startTimes.async,
          third: action.values.third - state.startTimes.async,
          all: action.time - state.startTimes.async,
        },
      };
    case "setPromiseResults":
      return {
        ...state,
        promiseResults: {
          first: action.values.first - state.startTimes.promise,
          second: action.values.second - state.startTimes.promise,
          third: action.values.third - state.startTimes.promise,
          all: action.time - state.startTimes.promise,
        },
      };
    case "setTaskResults":
      const results = {
        ...state,
        taskResults: {...state.taskResults, [action.name]: action.newValue},
      };
      if (
        results.taskResults.first === 0 ||
        results.taskResults.second === 0 ||
        results.taskResults.third === 0
      )
        return results;
      return {
        ...results,
        taskResults: {
          ...results.taskResults,
          all: action.time - results.startTimes.task,
        },
        inProgress: false,
      };
    case "reset":
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
export default reducer;
