import React from "react";
import App from "../App";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TimeSet = ({ type, value, block, setter }) => {
  const [val, setVal] = value;

  const handleIncrement = () => {
    if (val >= 60) {
      return null;
    } else {
      setVal(val + 1);
      if (block == type) {
        setter((val + 1) * 60 * 1000);
      }
    }
  };
  const handleDecrement = () => {
    if (val === 1) {
      return null;
    } else {
      setVal(val - 1);
      if (block == type) {
        setter((val + 1) * 60 * 1000);
      }
    }
  };
  return (
    <div class="control">
      <h2 id={`${type.toLowerCase()}-label`}>
        {type} <br />
        Length
      </h2>
      <div id="arrow-wrapper">
        <button
          id={`${type.toLowerCase()}-increment`}
          onClick={handleIncrement}
        >
          <FontAwesomeIcon
            icon={faArrowUp}
            size="3x"
            className="button"
          ></FontAwesomeIcon>
        </button>
        <h3 id={`${type.toLowerCase()}-length`} className="button">
          {val}
        </h3>
        <button
          id={`${type.toLowerCase()}-decrement`}
          onClick={handleDecrement}
          className="button"
        >
          <FontAwesomeIcon
            icon={faArrowDown}
            size="3x"
            className="button"
          ></FontAwesomeIcon>
        </button>
      </div>
    </div>
  );
};

export default TimeSet;
