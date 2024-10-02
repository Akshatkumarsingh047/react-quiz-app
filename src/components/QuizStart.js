import React from "react";
import Options from "./Options";

const QuizStart = ({
  que: { question, options, correctOption, id, points },
  dispatch,
  ans,
}) => {
  return (
    <div>
      <h4>{question}</h4>
      <Options
        options={options}
        dispatch={dispatch}
        ans={ans}
        correctOption={correctOption}
      />
    </div>
  );
};

export default QuizStart;
