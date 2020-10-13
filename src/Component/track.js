import React, { Component } from 'react';
import { Draggable } from "react-beautiful-dnd";
import styled from 'styled-components'
import DropLoop from './droploop'
import Manage from './manage'
import Trash from './trash'
import { connect } from "react-redux";
import Pads from './pads'

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    max-height: 60px;
    margin-top: 5px;
    margin-bottom: 20px;
    padding: 5px 0px;   
`


class Track extends Component {
    render() {
        const { id, index, recommend } = this.props
        return (
            <Draggable key={id} draggableId={id} index={index}>
                {(provided, snapshot) => {
                    return (
                        <Container
                            className='track'
                            recommend={recommend}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                        >
                            <DropLoop id={id} keys={id} />
                            <Manage id={id} keys={id} />
                            <Pads id={id} keys={id} />
                            <Trash id={id} keys={id} />
                        </Container>
                    );
                }}
            </Draggable>
        )
    }
}

// const mapDispatchToProps = (dispatch) => ({
//     onFetchMainLoop() {
//         dispatch(refreshPlayer())
//         dispatch(fetchMainPlayer())
//     },
//     onAddTrack(loop) {
//         dispatch(refreshPlayer())
//         dispatch(addTrack(loop))
//         dispatch(push('/interface'))
//     }
// });

const mapStateToProps = (state, ownProps) => {
    const tracks = state['decision'].tracks
    const ids = state['decision'].ids
    return {
        track: tracks[ownProps.id],
        recommend: ids[ids.length-1] === ownProps.id
    }
};

Track = connect(mapStateToProps, undefined)(Track);

export default Track;