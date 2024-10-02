import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import QuizStart from "./QuizStart";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import { Reset } from "./Reset";
import Footer from "./Footer";
import { Timer } from "./Timer";
const SECS_PER_QTN = 30;

const initialState = {
  questions: [],
  //LOADING,ERROR, READY, ACTIVE,FINISHED
  status: "loading",
  index: 0,
  ans: null,
  points: 0,
  highScores: 0,
  remSeconds: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "active":
      return {
        ...state,
        status: "active",
        remSeconds: state.questions.length * SECS_PER_QTN,
      };

    case "newAnswer":
      const currQst = state.questions[state.index];
      return {
        ...state,
        ans: action.payload,
        points:
          action.payload === currQst.correctOption
            ? state.points + currQst.points
            : state.points,
      };

    case "error":
      return { ...state, status: "error" };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        ans: null,
      };
    case "finished":
      return {
        ...state,
        status: "finished",
        highScores:
          state.points > state.highScores ? state.points : state.highScores,
        remSeconds: null,
      };

    case "reset":
      return {
        ...initialState,
        status: "ready",
        highScores: state.highScores,
        questions: state.questions,
      };
    case "tick":
      return {
        ...state,
        remSeconds: state.remSeconds - 1,
        status: state.remSeconds === 0 ? "finished" : state.status,
      };

    default:
      throw new Error(`Invalid action ${action.type}`);
  }
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status, index, ans, points, highScores, remSeconds } =
    state;
  useEffect(function () {
    async function getQuestions() {
      try {
        const response = await fetch("http://localhost:8000/questions");
        const data = await response.json();

        dispatch({ type: "dataReceived", payload: data });
      } catch (error) {
        dispatch({ type: "error" });
      }
    }
    getQuestions();
  }, []);
  const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen num={questions.length} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={questions.length}
              points={points}
              maxPoints={maxPoints}
              ans={ans}
            />

            <QuizStart que={questions[index]} dispatch={dispatch} ans={ans} />
            <Footer>
              <Timer dispatch={dispatch} remSeconds={remSeconds} />{" "}
              <NextButton
                dispatch={dispatch}
                ans={ans}
                index={index}
                numQuestions={questions.length}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <>
            <FinishScreen
              points={points}
              maxPoints={maxPoints}
              highScores={highScores}
            />
            <Reset dispatch={dispatch} />
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
