import React from "react";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faPause } from "@fortawesome/free-solid-svg-icons";

const Controls = ({ activeStatus, handleReset }) => {
  const [active, setActive] = activeStatus;
  return (
    <div id="controls-wrapper">
      <button id="start_stop" onClick={() => setActive(!active)}>
        {active ? (
          <FontAwesomeIcon
            icon={faPause}
            size="3x"
            className="gyphicon"
          ></FontAwesomeIcon>
        ) : (
          <FontAwesomeIcon
            icon={faPlay}
            size="3x"
            className="gyphicon"
          ></FontAwesomeIcon>
        )}
      </button>
      <div id="gap"></div>
      <button id="reset" onClick={handleReset}>
        <FontAwesomeIcon
          icon={faSync}
          size="3x"
          className="gyphicon"
        ></FontAwesomeIcon>
      </button>
    </div>
  );
};

export default Controls;
