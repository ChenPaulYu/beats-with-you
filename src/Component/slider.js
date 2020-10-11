import React, { Component } from 'react';
import styled from 'styled-components'
import { connect } from "react-redux";
import { mapRange } from '../Utility/map'
import { adjustVolume } from '../Action'
const SLIDER = styled.input.attrs({
    type: 'range',
})` 
    -webkit-appearance: none;
    background: none;
    outline: none;
    border-radius: 0;
    cursor: pointer;
                            
    position: relative;
    &::-webkit-slider-runnable-track {
        background-color: #FFFFFF;
        height: 1px;
    }
                            

    &::-webkit-slider-thumb {
        position: relative;
        -webkit-appearance: none;
        background-color: #212529;
        border: 1px solid #FFFFFF;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        top: -6px;
    }
`

class Slider extends Component {
    constructor(props) {
        super(props)
        this.onVolume = this.onVolume.bind(this)
    }

    onVolume(event) {
        const { id, onAdjustVolume } = this.props
        const volume = mapRange(event.target.value, 0, 100, -20, -1)
        onAdjustVolume(id, volume)
    }

    render() {
        const { volume } = this.props
        console.log(volume)
        console.log('Value: ', mapRange(volume, -20, -1, 0, 100))
        return (
            <SLIDER min='0' max='100' value={mapRange(volume, -20, -1, 0, 100)} onInput={this.onVolume}/>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    onAdjustVolume(id, index) {
        dispatch(adjustVolume(id, index))
    },
});

const mapStateToProps = (state, ownProps) => {
    return {
        volume: state['decision'].tracks[ownProps.id].volume
    }
};

Slider = connect(mapStateToProps, mapDispatchToProps)(Slider);

export default Slider;