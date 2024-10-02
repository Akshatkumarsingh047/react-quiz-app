import React from "react";

const Progress = ({ index, numQuestions, points, maxPoints, ans }) => {
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={`${ans != null && index + 1}`}
      ></progress>
      <p>
        Question <strong>{index + 1}</strong>/{numQuestions}
      </p>
      <p>
        <strong>{points}</strong>/{maxPoints}
      </p>
    </header>
  );
};

export default Progress;
