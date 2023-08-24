let matchesContainer = document.querySelector(".all-matches");
let resetBtn = document.querySelector(".lws-reset");
let addMatch = document.querySelector(".lws-addMatch");

const INCREMENT = "INCREMENT";
const DECREMENT = " DECREMENT";
const ADD_MATCH = "ADD_MATCH";
const DELETE_MATCH = "DELETE_MATCH";
const RESET_MATCH = "RESET_MATCH";

initialState = [
  {
    match: "Match 1",
    score: 0,
    id: 1,
  },
];

function MatchReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT: {
      const updatedScore = state.map((match) => {
        if (match.id === action.payload.id) {
          return {
            ...match,
            score: match.score + action.payload.value,
          };
        } else {
          return match;
        }
      });

      return updatedScore;
    }
    case DECREMENT: {
      const updatedScore = state.map((match) => {
        if (match.id === action.payload.id) {
          return {
            ...match,
            score: Math.max(0, match.score - action.payload.value),
          };
        } else {
          return match;
        }
      });

      return updatedScore;
    }
    case ADD_MATCH: {
      let newMatch = {
        match: `Match ${state[state.length - 1].id + 1}`,
        score: 0,
        id: state[state.length - 1].id + 1,
      };
      return [...state, newMatch];
    }

    case DELETE_MATCH: {
      let updatedMatches = state.filter(
        (match) => match.id !== action.payload.id
      );
      return updatedMatches;
    }

    case RESET_MATCH: {
      let updatedMatches = state.map((match) => {
        return {
          ...match,
          score: 0,
        };
      });
      return updatedMatches;
    }

    default: {
      return state;
    }
  }
}

const store = Redux.createStore(MatchReducer);

function render() {
  matchesContainer.innerHTML = "";
  const state = store.getState();

  state.map((match) => {
    matchesContainer.innerHTML += `
        <div class="match">
            <div class="wrapper">
                <button class="lws-delete" onclick="handleDelete(event, ${match.id})">
                    <img src="./image/delete.svg" alt="" />
                </button>
                <h3 class="lws-matchName">${match.match}</h3>
            </div>
            <div class="inc-dec">
                <form class="incrementForm" onsubmit="handleIncrement(event, ${match.id})">
                    <h4>Increment</h4>
                    <input type="number" name="increment" class="lws-increment" />
                </form>
                <form class="decrementForm" onsubmit="handleDecrement(event, ${match.id})">
                    <h4>Decrement</h4>
                    <input type="number" name="decrement" class="lws-decrement" />
                </form>
            </div>
            <div class="numbers">
                <h2 class="lws-singleResult">${match.score}</h2>
            </div>
        </div>
    `;
  });
  console.log(state);
}

render();
store.subscribe(render);

// Handle Increment
const handleIncrement = (event, matchId) => {
  event.preventDefault();
  const incrementValue = event.target.elements["increment"].value;
  store.dispatch({
    type: INCREMENT,
    payload: {
      id: matchId,
      value: +incrementValue,
    },
  });
};

// Handle Decrement
const handleDecrement = (event, matchId) => {
  event.preventDefault();
  const decrementValue = event.target.elements["decrement"].value;

  store.dispatch({
    type: DECREMENT,
    payload: {
      id: matchId,
      value: +decrementValue,
    },
  });
};

// handle delete
const handleDelete = (event, matchId) => {
  store.dispatch({
    type: DELETE_MATCH,
    payload: {
      id: matchId,
    },
  });
};

// add another match
addMatch.addEventListener("click", () => {
  store.dispatch({
    type: ADD_MATCH,
  });
});

// add another match
resetBtn.addEventListener("click", () => {
  store.dispatch({
    type: RESET_MATCH,
  });
});
