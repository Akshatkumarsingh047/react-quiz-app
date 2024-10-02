import React from "react";

const Options = ({ options, dispatch, ans, correctOption }) => {
  const hadAnswered = ans !== null;
  return (
    <div className="options">
      {options.map((ele, ind) => (
        <button
          key={ind}
          className={`btn btn-option ${ind === ans ? "answer" : ""} ${
            hadAnswered && (ind === correctOption ? "correct" : "wrong")
          }`}
          onClick={() => dispatch({ type: "newAnswer", payload: ind })}
          disabled={hadAnswered}
        >
          {ele}
        </button>
      ))}
    </div>
  );
};

export default Options;
