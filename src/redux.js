var _ = require("lodash");
var Redux = require("redux");

const todo = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        id: action.id,
        text: action.text,
        completed: false,
      };
    case "TOGGLE_TODO":
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state, // the state refers to the individual todo
        completed: !state.completed,
      };
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, todo(undefined, action)];
    case "TOGGLE_TODO":
      return state.map((t) => todo(t, action));
    default:
      return state;
  }
};

const visibilityFilter = (state = "SHOW_ALL", action) => {
  switch (action.type) {
    case "SET_VISIBILITY_FILTER":
      return action.filter;
    default:
      return state;
  }
};

// const todoApp = (state = {}, action) => {
//   return {
//     todos: todos(state.todos, action),
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//   };
// };

const combineReducers = (reducers) => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    }, {});
  };
};

// const { combineReducers } = Redux;
const todoApp = combineReducers({
  todos: todos,
  visibilityFilter: visibilityFilter,
});

// test("Checking if two states are the same", async () => {
//   const stateBefore = [];

//   const action = {
//     type: "ADD_TODO",
//     id: 0,
//     text: "Learn Redux",
//   };
//   const stateAfter = [
//     {
//       id: 0,
//       text: "Learn Redux",
//       completed: false,
//     },
//   ];

//   Object.freeze(stateBefore);
//   Object.freeze(action);
//   Object.freeze(stateAfter);

//   expect(todos(stateBefore, action)).toBe(stateAfter);
// });

// test("Test toggle todos", async () => {
//   const stateBefore = [
//     {
//       id: 0,
//       text: "Learn Redux",
//       completed: false,
//     },
//     {
//       id: 1,
//       text: "Play osu!",
//       completed: false,
//     },
//   ];

//   const action = {
//     type: "TOGGLE_TODO",
//     id: 1,
//   };

//   const stateAfter = [
//     {
//       id: 0,
//       text: "Learn Redux",
//       completed: false,
//     },
//     {
//       id: 1,
//       text: "Play osu!",
//       completed: true,
//     },
//   ];

//   Object.freeze(stateBefore);
//   Object.freeze(action);
//   Object.freeze(stateAfter);

//   expect(todos(stateBefore, action)).toBe(stateAfter);
// });

async function test(title, callback) {
  try {
    await callback();
    console.log(`✓ ${title}`);
  } catch (error) {
    console.error(`✕ ${title}`);
    console.error(error);
  }
}

function expect(actual) {
  return {
    toBe(expected) {
      if (!_.isEqual(actual, expected)) {
        throw new Error(
          `${JSON.stringify(actual)} is not equal to ${JSON.stringify(
            expected
          )}`
        );
      }
    },
  };
}

const { createStore } = Redux;
const store = createStore(todoApp);

console.log("Init state:");
console.log(store.getState());
console.log("------------------");

console.log("Dispatching ADD_TODO");
store.dispatch({
  type: "ADD_TODO",
  id: 0,
  text: " Learn new stuff",
});

console.log("Current State:");
console.log(store.getState());
console.log("-------------------");

console.log("Dispatching ADD_TODO");
store.dispatch({
  type: "ADD_TODO",
  id: 1,
  text: "Play maple",
});

console.log("Current State:");
console.log(store.getState());
console.log("-------------------");

console.log("Dispatching TOGGLE_TODO");
store.dispatch({
  type: "TOGGLE_TODO",
  id: 1,
});

console.log("Current State:");
console.log(store.getState());
console.log("-------------------");

console.log("Dispatching SET_VISIBILITY_FILTER");
store.dispatch({
  type: "SET_VISIBILITY_FILTER",
  filter: "SHOW_COMPLETED",
});
console.log("Current state:");
console.log(store.getState());
console.log("-----------------");
