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

  max-width: 160px;
  max-height: 60px;
`;
const IMG = styled.img`
    top: 6.67%;
    right: 2.5%;
    position: absolute;
    width: 16px;
    height: 16px;
    opacity: ${props => props.active ? 0.66 * 0.2 : 0.66}
`


class Loop extends Component {
    constructor(props) {
        super(props);
        this.canvasClick = this.canvasClick.bind(this);
    }

    componentDidMount() {
        const { player, active, color } = this.props;
        if(player) {
            const canvas = this.canvas
            const data = player.buffer.getChannelData()
            drawWaveform(canvas, data, color, active);
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps === this.props) return;
        const { player, active, color } = this.props;
        if(player) {
            const canvas = this.canvas
            const data = player.buffer.getChannelData()
            drawWaveform(canvas, data, color, active);
            if (active) {
                player.loop = true;
                player.start();
            } else {
                player.loop = false;
                player.stop();
            }
        } 
    }

    canvasClick() {
        const { onAtivatePlayer, id, player } = this.props
        if(player) {
            onAtivatePlayer(id)
        }   
    }


    render() {
        const { color, icon, active } = this.props

        return (
            <Container>
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
    const loop = state['candidate']['loops'][ownProps.id]

    return {
        player: loop.player, 
        icon: loop.group ? mapIcon(loop.group) : '',
        color: loop.group ? mapColor(loop.group) : '',
        active: state['candidate']['activateId'] === ownProps.id,
    };
};

Loop = connect(mapStateToProps, mapDispatchToProps)(Loop);

export default Loop;
