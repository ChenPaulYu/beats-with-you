import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { drawWaveform } from "../Utility/draw";
import { mapIcon, mapColor }from '../Utility/map'
import { rgba } from 'polished'
import { activatePlayer } from "../Action"; 
const Container = styled.div`
    justify-self: ${ props => props.pos && (props.pos == 'right' ? 'end' : 'start')};
    position: relative;
`
const Canvas = styled.canvas`
  background-color: ${props => props.color == '' ? rgba('#000000', 0.2) : rgba(props.color, props.active ? 0.2 : 0.04)};
  border-radius: 5px;

  width : 100%;
  height: 100%;

`;
const IMG = styled.img`
    top: 6.67%;
    right: 2.5%;
    position: absolute;
    width: 16px;
    height: 16px;
    opacity: ${props => props.active ? 0.66 * 0.2 : 0.66}
`


class DropLoop extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { player, active, color, play, mute, volume, track_num, bar } = this.props;
        console.log('track: ', track_num, ' bar: ', bar, 'play: ', play)
        if (player) {
            const canvas = this.canvas
            const data = player.buffer.getChannelData()
            drawWaveform(canvas, data, color, active);
            player.mute = mute
            player.volume.value = volume
            player.fadeIn = '8n'
            player.fadeOut = '8n'
            if (play) {
                player.start();
            } else {
                player.stop();
            }
        } 
    }

    componentWillUnmount() {
        const { player } = this.props
        player.stop()
    }

    componentDidUpdate(prevProps) {
        if (prevProps === this.props) return;
        const { player, active, color, play, mute, volume, soloId, id, bar } = this.props;
        if(player) {
            const canvas = this.canvas
            const data = player.buffer.getChannelData()
            drawWaveform(canvas, data, color, active);
            player.volume.value = volume
            if (soloId) {
                console.log(soloId, id)
                player.mute = id == soloId ? false : true
            } else {
                player.mute = mute
            }
            if (prevProps.bar == bar) return
            if (play) {
                player.start();
            } else {
                player.stop();
            }
        } 
    }


    render() {
        const { color, icon, active, pos } = this.props

        return (
            <Container pos={pos}>
                <Canvas
                    active={active}
                    color={color}
                    ref={(x) => (this.canvas = x)}
                    onClick={this.canvasClick}
                />
                {icon != '' && <IMG acitve={active} src={icon} alt='loop type'/> }
            </Container>
        );
    }
}
const mapDispatchToProps = (dispatch) => ({
    onAtivatePlayer(id) {
        dispatch(activatePlayer(id))
    }
});

const mapStateToProps = (state, ownProps) => {
    const loop = state['decision'].tracks[ownProps.id]
    const soloIds = Object.keys(state['decision'].tracks).filter((id) => state['decision'].tracks[id].solo)
    return {
        track_num: state['decision'].tracks[ownProps.id].track_num,
        player: loop.player,
        active: state['decision']['control'].playing,
        color : loop.group?mapColor(loop.group): '',
        icon  : loop.group?mapIcon(loop.group) : '',
        play  : state['decision'].tracks[ownProps.id].pads[state['decision']['control'].bar],
        volume: state['decision'].tracks[ownProps.id].volume,
        mute  : state['decision'].tracks[ownProps.id].mute,
        soloId: soloIds.length > 0 ? soloIds[0] : '',
        bar: state['decision']['control'].bar,
    };
};

DropLoop = connect(mapStateToProps, mapDispatchToProps)(DropLoop);
export default DropLoop;
