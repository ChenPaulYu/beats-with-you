import React, { Component } from 'react';
import styled from 'styled-components';
import { Droppable } from "react-beautiful-dnd";

import { Transport } from "tone";
import { moveSequencer } from '../Action'
import { connect } from "react-redux";
import Tracks from './tracks'
import { rgba } from 'polished'

const Container = styled.div`
    width : 100%;
    height: 100%;
    display: grid;
    align-items: center;
`
const Block = styled.div`
    width: 90%;
    height: 100%;
    justify-self: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
`
const TITLE = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    & * {
        margin: 5px;
    }
`
const P = styled.p`
    display: flex;
    justify-content: flex-start;
    text-transform: uppercase;
`
const T = styled.p`
    font-weight: 100;
    font-size: 0.75rem;
    color: ${rgba('#FFFFFF', 0.6)};
    text-transform: none;
`
const HR = styled.hr`
    margin: 10px 0px;
    width: 100%;
    opacity: 0.2;
    border: 1px solid #FFFFFF;
    box-sizing: border-box;
`

class Sequencer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { onMoveSequencer, bpm, location } = this.props
        console.log(location)
        Transport.scheduleRepeat(() => {
            onMoveSequencer();
        }, '1n');
        Transport.bpm.value = bpm;
    }

    render() {
        return (
            <Container className='Sequencer'>
                <Block>
                    <TITLE>
                        <P>
                            Sequencer &nbsp;
                            <T>AI recommends loops in Loop area according to the last track here. Just drag and drop a waveform to adjust the order!</T>
                        </P>
                        <HR />
                    </TITLE>
                    <Tracks />
                </Block>
            </Container>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    onMoveSequencer() {
        dispatch(moveSequencer())
    }
});

const mapStateToProps = (state) => {
    return {
        bpm: state['decision']['control'].bpm,
        playing: state['decision']['control'].playing,
        location: state['router'].pathname
    }
};
Sequencer = connect(mapStateToProps, mapDispatchToProps)(Sequencer);  

export default Sequencer;