import React from 'react';
import PropTypes from 'prop-types';


class TempoSlider extends React.Component{
    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleIncClick = this.handleIncClick.bind(this);
        this.handleDecClick = this.handleDecClick.bind(this);
    }

    handleChange(e){
        this.props.onTempoChange(e.target.value);
    }

    handleDecClick(){
        this.props.onClick(-1);
    }
    handleIncClick(){
        this.props.onClick(1);
    }

    render(){
        const tempo = this.props.tempo;
        return(
            <div className="slide-container">
                <input type="button" value="-" className="tempo-button" onClick={this.handleDecClick}/>
                <input type="range" min="30" max="300" step="1" value={tempo} className="slider" id="myRange" onChange={this.handleChange}/>
                <input type="button" value="+" className="tempo-button" onClick={this.handleIncClick}/>
            </div>
        )
    }
}

TempoSlider.propTypes = {
    tempo: PropTypes.number.isRequired,
};

export default TempoSlider;