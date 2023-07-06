// select dom elements
const counterEl = document.getElementById("counter");
const incrementEl = document.getElementById("increment");
const decrementEl = document.getElementById("decrement");

// action type
const INCREMENT = "increment";
const DECREMENT = "decrement";

// initial state
const initialState = {
  value: 0,
};

// creating reducer function
function counterReducer(state = initialState, action) {
  if (action.type === INCREMENT) {
    return {
      ...state,
      value: state.value + action.payload,
    };
  } else if (action.type === DECREMENT) {
    return {
      ...state,
      value: state.value - action.payload,
    };
  } else {
    return state;
  }
}

// action creator
const increment = (value) => {
  return { type: INCREMENT, payload: value };
};

const decrement = (value) => {
  return { type: DECREMENT, payload: value };
};

// creating store
const store = Redux.createStore(counterReducer);

// for changing in ui
const render = () => {
  const state = store.getState();
  counterEl.innerText = state.value.toString();
};

// first time changin ui
render();

// store subscribe
store.subscribe(render);

// event listeners for increment
incrementEl.addEventListener("click", () => {
  store.dispatch(increment(5));
});

// event listeners for decrement
decrementEl.addEventListener("click", () => {
  store.dispatch(decrement(4));
});
