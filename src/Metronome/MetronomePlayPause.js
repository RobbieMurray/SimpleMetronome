import React from 'react';
import PropTypes from 'prop-types';

class MetronomePlayPause extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        this.props.onMetronomePlayPause(e.target.value)
    }

    render(){
        const { playing } = this.props
        return(
            <button className="play-button" onClick={this.handleClick}>
              {playing ? 'Stop' : 'Start'}
            </button>
        );
    }
}

MetronomePlayPause.propTypes = {
    playing: PropTypes.bool.isRequired,
};

export default MetronomePlayPause;