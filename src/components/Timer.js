import React, { useEffect } from "react";

export const Timer = ({ dispatch, remSeconds }) => {
  const min = Math.floor(remSeconds / 60);
  const sec = remSeconds % 60;
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);
      return () => clearInterval(id);
    },

    [dispatch]
  );
  return (
    <div className="timer btn">
      {min < 10 && "0"} {min}:{sec < 10 && "0"}
      {sec}
    </div>
  );
};
