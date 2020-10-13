import React, { Component } from 'react';
import styled from 'styled-components'
import { connect } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
import Track from './track'
const Container = styled.div`
    width : 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 20px;
    padding: 0px;
`

class Tracks extends Component {
    render() {
        const { ids } = this.props
        return (
            <Droppable key='droppable-tracks' droppableId='droppable-tracks'>
                {(provided) => (
                    <Container
                        className='tracks'
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {ids.map((id, index) => (<Track id={id} key={id} index={index}/>))}
                        {provided.placeholder}
                    </Container>
                )}
            </Droppable>
        )
    }
}


const mapStateToProps = (state) => {
    const ids = state['decision'].ids
    return {
        ids
    }
};

Tracks = connect(mapStateToProps, undefined)(Tracks);


export default Tracks;