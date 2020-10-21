import React from 'react';
import PropsTypes from 'prop-types';

class TempoDisplay extends React.Component {
    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        this.props.onTempoChange(e.target.value,e.target.validity.valid);
    }

    render(){
        const tempo = this.props.tempo;
        return(
            <div>
                BPM: 
                <input type="text" pattern="[\d]{1,4}" value={tempo} className="tempo-display" onChange={this.handleChange}></input>
            </div>
        )
    };
}

TempoDisplay.propTypes = {
    tempo: PropsTypes.number.isRequired,
};

export default TempoDisplay;