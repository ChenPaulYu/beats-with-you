import React, { Component } from 'react';
import { connect } from "react-redux";
import styled from 'styled-components'
import Search from '../Component/search'
import Make from '../Component/make'
import { push } from "connected-react-router";
import { DragDropContext } from "react-beautiful-dnd";
import { changeTrackOrder } from '../Action'
const Container = styled.div`
    height: 100%;
    display: grid;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    grid-template-columns: 3fr 1fr;
`
class Interface extends Component {

    constructor(props) {
        super(props);
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    componentDidMount() {
        const {onBack, sourceUrl } = this.props
        if (!sourceUrl) {
            onBack()
        }
    }

    onDragEnd(result) {
        const { source, destination } = result
        const { onChangeTrackOrder } = this.props
        console.log(source.index, destination.index)
        onChangeTrackOrder(source.index, destination.index)
    }

    render() {
        const { sourceUrl } = this.props
        return (
            <Container>
                {sourceUrl && 
                    <DragDropContext
                        onDragEnd={this.onDragEnd}
                    >
                        <Make />
                        <Search />
                    </DragDropContext>
                }
            </Container>
        )
    }
}


const mapDispatchToProps = (dispatch) => ({
    onBack() {
        dispatch(push('/chosen'))
    },
    onChangeTrackOrder(source_index, target_index) {
        dispatch(changeTrackOrder(source_index, target_index))
    }

});
const mapStateToProps = (state) => {
    const trackIds = state['decision'].ids
    return {
        sourceUrl: trackIds.length > 0 ? state['decision']['tracks'][trackIds[trackIds.length - 1]].url : undefined
    }
};
Interface = connect(mapStateToProps, mapDispatchToProps)(Interface)
export default Interface;
