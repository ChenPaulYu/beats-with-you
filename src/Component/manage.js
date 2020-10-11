import React, { Component } from 'react';
import styled from 'styled-components'
import { rgba } from 'polished'
import { connect } from "react-redux";
import { loadUrl } from '../Utility/api'
import download from '../Assets/button/download.svg'
import Slider from './slider'
import { toggleMute, toggleSolo } from '../Action'
const Container = styled.div`
    display: grid;
    margin-left: 10px;
    & * {
        margin: 0px 5px;
    }
`
const CONTROL = styled.div`
    align-self: flex-start;
    display: flex;
    align-items: flex;
    justify-content: space-between;
`
const Button = styled.button`
    margin-left: 0px;
    color: #FFFFFF;
    background-color: ${props => rgba('#ffffff', props.active ? 0.2 : 0)};
    font-weight: normal;
    border: 1px solid ${rgba('#FFFFFF', 0.2)};
    box-sizing: border-box;
    border-radius: 2px;
    text-transform: uppercase;
    font-size: 10px;
    text-align: center;
    width: 100%;
    height: 100%;
    min-width : 50px;
    min-height: 30px;
`
const DOWNLOAD = styled.a`
    border: none;
    display: flex;
    background-color: ${rgba('#FFFFFF', 0)};
    margin-right: 0px;
    
`

class Manage extends Component {
    constructor(props) {
        super(props);
        this.mute = this.mute.bind(this);
        this.solo = this.solo.bind(this);
    }

    mute() {
        const { id, onToggleMute } = this.props
        onToggleMute(id)
    }

    solo() {
        const { id, onToggleSolo } = this.props
        onToggleSolo(id)
    }

    render() {
        const { id, mute, solo, url } = this.props
        return (
            <Container>
                <CONTROL>
                    <Button onClick={this.mute} active={mute}>Mute</Button>
                    <Button onClick={this.solo} active={solo}>Solo</Button>
                    <DOWNLOAD href={loadUrl(url)    }>
                        <img src={download} />
                    </DOWNLOAD>
                </CONTROL>
                <Slider id={id}/>
            </Container>
        )
    }
}
const mapDispatchToProps = (dispatch) => ({
    onToggleMute(id) {
        dispatch(toggleMute(id))
    },
    onToggleSolo(id) {
        dispatch(toggleSolo(id))
    }
});
const mapStateToProps = (state, ownProps) => {
    const url = state['decision'].tracks[ownProps.id].url
    const mute = state['decision'].tracks[ownProps.id].mute
    const solo = state['decision'].tracks[ownProps.id].solo
    return {
        url: url ? url : '',
        mute: mute ? mute : false,
        solo: solo ? solo : false,
    }
};
Manage = connect(mapStateToProps, mapDispatchToProps)(Manage);  
export default Manage;