import React from 'react';

const Ping = () => (
  <div className="ping-dot-container">
    <div className="ping-dot-wrapper">
      <span className="ping-dot">
        <span className="ping-dot-animation"></span>
        <span className="ping-dot-static"></span>
      </span>
    </div>
  </div>
);

const ViewCounter = ({ totalViews }) => {
  return (
    <div className="view-counter">
      <div className="view-counter-ping">
        <Ping />
      </div>
      <p className="view-counter-display">
        <span className="view-counter-text">
          <span className="view-counter-label">Views:</span> {totalViews}
        </span>
      </p>
    </div>
  );
};

export default ViewCounter;