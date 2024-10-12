interface State {
  backgroundColor: string;
}

interface Action {
  type: string;
}

const initialState: State = {
  backgroundColor: "black",
};

export default function reducer(
  currentState: State = initialState,
  action: Action
): State {
  const newState = { ...currentState };

  switch (action.type) {
    case "white":
      newState.backgroundColor = "white";
      break;
    default:
      break;
  }

  return newState;
}
