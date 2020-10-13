import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { mapColor } from '../Utility/map'
import { activatePad } from '../Action'
const Container = styled.div`
    width: 100%;
    margin: 0px 10px;
    border-radius: 5px;
    background-color: ${(props) => (props.color ? props.color : '#000000')};
    opacity: ${(props) => (props.play ? props.active ? 1 : 0.4 : props.active ? 0.2 : 0.04)};
`;

class Pad extends Component {
    constructor(props) {
        super(props);
        this.padClick = this.padClick.bind(this);
    }

    padClick() {
        const { onActivatePad, id, index } = this.props
        onActivatePad(id, index)
    }

    render() {
        const { active, color, play } = this.props;
        return <Container 
            play={play}
            active={active} 
            color={color} 
            onClick={this.padClick}
        />;
    }
}
const mapDispatchToProps = (dispatch) => ({
    onActivatePad(id, index) {
        dispatch(activatePad(id, index))
    }
});
const mapStateToProps = (state, ownProps) => {
    return {
        color: mapColor(state['decision'].tracks[ownProps.id].group),
        active: state['decision'].tracks[ownProps.id].pads[ownProps.index],
        play: state['decision']['control'].bar === ownProps.index
    }
};
Pad = connect(mapStateToProps, mapDispatchToProps)(Pad);
export default Pad;
