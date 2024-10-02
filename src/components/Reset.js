import React from "react";

export const Reset = ({ dispatch }) => {
  return (
    <button className="btn btn-ui" onClick={() => dispatch({ type: "reset" })}>
      Reset
    </button>
  );
};
