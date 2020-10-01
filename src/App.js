import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faPause } from "@fortawesome/free-solid-svg-icons";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useInterval } from "./hooks/useInterval";
import moment from "moment";
import TimeSet from "./components/TimeSet";
import Timer from "./components/Timer";
import Controls from "./components/Controls";

//PomApr2020responsiveB
function App() {
  // active set to true means clock is running
  const [active, setActive] = useState(false);
  const [sessionLength, setSessionLength] = useState(25);

  const [breakLength, setBreakLength] = useState(5);

  const [time, setTime] = useState(sessionLength * 60 * 1000);

  // blockType can be set to "Session" or "Break" and is displayed by id="timer-label"
  const [blockType, setBlockType] = useState("Session");

  //ref referring to audio element
  let qRef = useRef();

  //initial call of setInterval
  useInterval(() => setTime(time - 1000), active ? 1000 : null);

  useEffect(() => {
    handleSessionLengthChange();
  }, [sessionLength]);

  function handleSessionLengthChange() {
    if (blockType == "Session") {
      setTime(sessionLength * 60 * 1000);
    } else {
      return null;
    }
  }

  //function called by - Problem here in that I set seconds to 59???
  useEffect(() => {
    if (time === 0 && blockType == "Session") {
      setTime(breakLength * 60 * 1000);
      setBlockType("Break");
      qRef.current.play();
      qRef.current.currentTime = 0;
    } else if (time === 0 && blockType == "Break") {
      setTime(sessionLength * 60 * 1000);
      setBlockType("Session");
      qRef.current.play();
      qRef.current.currentTime = 0;
    }
  }, [time, blockType, sessionLength, breakLength]);

  //function called onClick of reset button
  function resetting() {
    setActive(false);

    setSessionLength(25);

    setBreakLength(5);
    qRef.current.pause();
    qRef.current.currentTime = 0;
    setTime(25 * 60 * 1000);
    setBlockType("Session");
  }

  //conditions for dealing with the click of buttons that change session and break times

  return (
    <div id="wrap-all">
      <div id="control-box">
        <TimeSet type={"Break"} value={[breakLength, setBreakLength]} />
      </div>
      <div id="control-gap"></div>
      <div id="control-box2">
        <TimeSet
          type={"Session"}
          value={[sessionLength, setSessionLength]}
          block={blockType}
          setter={setTime}
        />
      </div>
      <div className="App">
        <div id="black-board-1">
          <div id="title">Pomodoro Clock</div>
          <div id="timer-wrapper">
            <Timer
              id="timer"
              currentTime={[time]}
              currentMode={[blockType, setBlockType]}
            />
          </div>
          <div id="button-wrapper">
            <Controls
              activeStatus={[active, setActive]}
              handleReset={resetting}
            />
          </div>
          <audio
            src="https://freecodecampassets.s3.us-east-2.amazonaws.com/Clock+Sounds/37720__still-frames__om.mp3"
            type="audio/ogg"
            className="clip"
            id="beep"
            ref={qRef}
            title="Ohm"
          ></audio>
        </div>
        <div id="black-board-2">
          <div id="timer-label">
            {blockType === "Session" ? "Session" : "Break"}
          </div>
        </div>
      </div>{" "}
    </div>
  );
}

export default App;
