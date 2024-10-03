import React from "react";
import "./styles/loader.css";
const Loader = () => {
  return (
    <div
      className="ytp-spinner relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      data-layer="4"
    >
      <div>
        <div className="ytp-spinner-container">
          <div className="ytp-spinner-rotator">
            <div className="ytp-spinner-left">
              <div className="ytp-spinner-circle"></div>
            </div>
            <div className="ytp-spinner-right">
              <div className="ytp-spinner-circle"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
