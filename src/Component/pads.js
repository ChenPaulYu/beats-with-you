import React, { Component } from "react";
import styled from "styled-components";
import Pad from "./pad";
import { connect } from "react-redux";
import { intializePads } from '../Utility/initial'
const Container = styled.div`
    display: flex;
    margin-left: 10px;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`;

class Pads extends Component {
    render() {
        const { id } = this.props;
        const pads = id != '' ? this.props.pads : intializePads(0);
        return (
            <Container>
                {pads.map((_, index) => (
                    <Pad
                        id={id}
                        pads={pads}
                        key={`${id}${index}`}
                        index={index}
                    />
                ))}
            </Container>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        pads: state['decision'].tracks[ownProps.id].pads
    }
};

Pads = connect(mapStateToProps, undefined)(Pads);


export default Pads;
