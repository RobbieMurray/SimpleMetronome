import React from 'react';
import PropTypes from 'prop-types';


function BeatDisplay(props){
    const { playing, currentStep, steps } = props;
    return(
        <div className="step-display">
            {`Current Beat ${playing ? currentStep % steps.length + 1 : '-' }`} 
        </div>
    );
}

BeatDisplay.propTypes = {
    playing: PropTypes.bool.isRequired,
    currentStep: PropTypes.number.isRequired,
    steps: PropTypes.array.isRequired,
};

export default BeatDisplay;
