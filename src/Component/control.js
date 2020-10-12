import React, { Component } from 'react';
import styled from 'styled-components'
import { connect } from "react-redux";
import { rgba } from 'polished'
import play from '../Assets/button/play.svg'
import pause from '../Assets/button/pause.svg'
import arrow from '../Assets/icon/arrow.svg'
import { togglePlay, changeBpm } from '../Action'
import { Transport } from "tone";
import { notify } from '../Utility/alert'
const Container = styled.div`
    width : 100%;
    height: 100%;
    display: grid;
    background-color: #2F3236;
`
const Block = styled.div`
    width: 90%;
    height: 80%;
    align-self: center;
    justify-self: center;
    display: flex;
    flex-direction: row;
    align-items: center;
`
const PLAY = styled.img`
    margin-right: 30px;
    cursor: pointer;
`
const DROPDOWN = styled.div`
`
const CONTENT = styled.div`
    display: none;
    position: absolute;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
`
const A = styled.div`
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
`
const BUTTON = styled.button`
    position: relative;
    width: 180px;
    height: 45px;
    color: #FFFFFF;
    background: ${rgba('#3A3E43', 0)};
    border: 1px solid ${rgba('#FFFFFF', 0.2)};
    box-sizing: border-box;
    border-radius: 2px;
`
const SPAN = styled.span`
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.2px;
    text-transform: uppercase;
`
const ARROW = styled.img`
    position: absolute;
    top: 50%;
    right: 10%;
    transform: translateY(-50%);
`
const SAVE = styled.button`
    margin-left: auto;
    margin-right: 0;
    color: #FFFFFF;
    background-color: ${rgba('#ffffff', 0)};
    border: 1px solid ${rgba('#ffffff', 0.2)};
    font-weight: normal;
    box-sizing: border-box;
    border-radius: 2px;
    width: 160px;
    height: 45px;
    text-transform: uppercase;
    cursor: pointer;
    &:hover, :active {
        background: ${ rgba('#ffffff', 0.2) };
    }
`
class Control extends Component {
    constructor(props) {
        super(props);
        this.controlPlay = this.controlPlay.bind(this)
        this.controlBpm = this.controlBpm.bind(this)
        this.save = this.save.bind(this)
    }

    controlPlay() {
        const { onTogglePlay } = this.props
        onTogglePlay()
    }

    controlBpm() {
        notify(
            'The feature is coming soon !',
            'Interested in "adjusting BPM of loops"? \n Click "Feedback" button to share your preference with us!')
        // const { bpm, controlBpm } = this.props
        // controlBpm(bpm)
    }

    save() {
        window.open('https://reurl.cc/N6bWpk', '_blank');
    }

    componentDidUpdate() {
        const { playing } = this.props
        if(playing) {
            Transport.start()
        } else {
            Transport.stop()
        }
    }

    render() {
        const { playing, bpm } = this.props
        return (
            <Container className='control'>
                <Block>
                    <PLAY src={playing ? pause : play} alt='Play' onClick={this.controlPlay}/>
                    <DROPDOWN>
                        <BUTTON onClick={this.controlBpm}>
                            <SPAN>{bpm} Bpm</SPAN>
                            <ARROW src={arrow} alt="Arrow" />
                        </BUTTON>
                        <CONTENT>
                            <A href="#">Link 1</A>
                            <A href="#">Link 2</A>
                            <A href="#">Link 3</A>
                        </CONTENT>
                    </DROPDOWN>
                    <SAVE onClick={this.save}>Feedback</SAVE>
                </Block>
            </Container>
        )
    }
}


const mapDispatchToProps = (dispatch) => ({
    onTogglePlay() {
        dispatch(togglePlay())
    },
    onChangeBpm(bpm) {
        dispatch(changeBpm(bpm))
    }
});

const mapStateToProps = (state) => {
    return {
        bpm: state['decision']['control'].bpm,
        playing: state['decision']['control'].playing,
    }
};
Control = connect(mapStateToProps, mapDispatchToProps)(Control);
export default Control;