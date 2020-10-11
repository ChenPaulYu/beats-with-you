import React, { Component } from 'react';
import styled from 'styled-components'
import { removeTrack } from '../Action'
import { connect } from "react-redux";
import trash from '../Assets/button/trash.svg'
import trash_block from '../Assets/button/trash_block.svg'
import { rgba } from 'polished'

const CONTAINER = styled.div`
    margin-left: 10px;
    color: #ffffff;
    cursor: pointer;
    border-radius: 2px;
    font-weight: normal;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-transform: uppercase;
    background-color: ${rgba('#ffffff', 0)};
    pointer-events: ${ props => props.deletable ? 'auto' : 'none'};
    &:hover, :active {
        background-color: ${props => rgba('#ffffff', props.deletable ? 0.2 : 0)};
    }
`
const IMG = styled.img`
    width: 18px;
    height: 18px;
    opacity: ${props => props.deletable ? 0.66 : 0.66 * 0.2}
`


class Trash extends Component {
    constructor(props) {
        super(props)
        this.deleting = this.deleting.bind(this)
    }

    deleting() {
        const { onRemoveTrack, id } = this.props
        onRemoveTrack(id)
    }

    render() {
        const { deletable } = this.props
        console.log(deletable)
        return (
            <CONTAINER onClick={this.deleting} deletable={deletable}>
                <IMG deletable={deletable} src={deletable ? trash : trash_block} />
            </CONTAINER>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    onRemoveTrack(id) {
        dispatch(removeTrack(id))
    },
});

const mapStateToProps = (state, ownProps) => {
    return {
        deletable: state['decision'].tracks[ownProps.id].loop_type == 'acc'
    }
};

Trash = connect(mapStateToProps, mapDispatchToProps)(Trash);

export default Trash;