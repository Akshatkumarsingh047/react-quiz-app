import React from "react";

const FinishScreen = ({ points, maxPoints, highScores }) => {
  const percentage = ((points / maxPoints) * 100).toFixed(2);

  return (
    <>
      <p className="result">
        you scored <strong>{points}</strong>
        out of {maxPoints} <strong>&rarr;</strong>
        <span> {percentage} %</span>
      </p>
      <p className="highscore">HighScore : {highScores} points</p>
    </>
  );
};

export default FinishScreen;
