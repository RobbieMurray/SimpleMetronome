import React from 'react';
import './Metronome.css';
import WAAClock from 'waaclock';
import TempoSlider from './TempoSlider';
import TempoDisplay from './TempoDisplay';
import BeatDisplay from './BeatDisplay';
import MetronomePlayPause from './MetronomePlayPause';
import { triggerSound } from './MetronomeHelper';

class MetronomeContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentStep: 0,
            steps: [1, 1, 1, 1],
            playing: false,
            tempo: 120,
            secPerMin: 60
        }
        this.handleSliderChange = this.handleSliderChange.bind(this);
        this.handleBPMTextChange = this.handleBPMTextChange.bind(this);
        this.handlePlayPress = this.handlePlayPress.bind(this);
        this.handleTempoCrement = this.handleTempoCrement.bind(this);
    }

    handlePlayPress(){
      if (!this.state.playing){
        //Check Tempo isn't outside the range
        this.updateTempo(this.state.tempo);
        this.setState({
          currentStep: -1,
          playing: true
        }, () => {
          this.clock.start();
          this.tickEvent = this.clock.callbackAtTime(
            this.handleTick.bind(this),
            this.audioContext.currentTime
          ).repeat(this.state.secPerMin/this.state.tempo);
        })
      } else {
        this.setState(
          {playing: false},
          () => {
            this.clock.stop();
            this.tickEvent.clear();
            this.tickEvent = null;
          })
      }
    }
  
    handleTick({ deadline }){
      const {currentStep, steps} = this.state;
      const newCurrentStep = currentStep + 1;
      if (steps[newCurrentStep % steps.length]) {
        triggerSound(this.audioContext, deadline);
      }
      this.setState({currentStep : newCurrentStep})
    }
  
    componentDidMount(){
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioContext();
      this.clock = new WAAClock(this.audioContext);
    }
  
    componentWillUnmount(){
      this.audioContext.clear();
    }
  
    handleSliderChange(newTempo){
      this.updateTempo(newTempo);
      if (this.state.playing){
        this.clock.timeStretch(this.audioContext.currentTime, [this.tickEvent], this.state.tempo / newTempo);
        this.setState({currentStep: 0});
      }
    }

    handleBPMTextChange(newTempo,valid){
      if (!this.state.playing && valid){
        //Allow easier typing of tempo - update on metronome start
        this.setState({tempo: newTempo});
      }
    }

    handleTempoCrement(value){
      let newTempo = this.state.tempo;
      newTempo = Number.parseInt(newTempo);
      newTempo += (value == 1) ? 1 : -1;
      this.updateTempo(newTempo)
    }

    updateTempo(newTempo){
      newTempo = (newTempo < 300) ? newTempo : 300;
      newTempo = (newTempo > 30) ? newTempo : 30;
      this.setState({tempo: newTempo});
    }

    render(){
        const { currentStep, steps, playing, tempo} = this.state;
        return(
          <div>
            <TempoDisplay tempo={tempo} onTempoChange={this.handleBPMTextChange} />
            <TempoSlider tempo={tempo} onTempoChange={this.handleSliderChange} onClick={this.handleTempoCrement}/>
            <BeatDisplay playing={playing} currentStep={currentStep} steps={steps}/>
            <MetronomePlayPause playing={playing} onMetronomePlayPause={this.handlePlayPress} />
          </div>
        );
    }
} 

export default MetronomeContainer;