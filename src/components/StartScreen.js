import React from "react";

const StartScreen = ({ num, dispatch }) => {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{num} questions to test your React Mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "active" })}
      >
        Start Quiz
      </button>
    </div>
  );
};

export default StartScreen;
