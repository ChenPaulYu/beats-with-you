import React, { Component } from 'react';
import { connect } from "react-redux";
import styled from 'styled-components'
import Search from '../Component/search'
import Make from '../Component/make'
import { push } from "connected-react-router";
import { DragDropContext } from "react-beautiful-dnd";
import { changeTrackOrder, introFinish } from '../Action'
import { Steps, Hints } from 'intro.js-react';
import "intro.js/introjs.css";
import FullLoading from '../Component/fullLoad'
import { isMobile } from "react-device-detect";
import { steps, hints } from '../Utility/intro'
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
        this.state = {
            stepsEnabled: true
        }
    }

    componentDidMount() {
        const { onBack, track_num, onBackMobile } = this.props

        if (isMobile) {
            onBackMobile()
        }

        if (track_num <= 0) {
            onBack()
        }
    }



    onDragEnd(result) {
        const { source, destination } = result
        const { onChangeTrackOrder } = this.props
        onChangeTrackOrder(source.index, destination.index)
    }


    onExit = () => {
        const { onIntroFinish } = this.props
        this.setState(() => ({ stepsEnabled: false }));
        onIntroFinish()
    };
    

    render() {
        const { intro, drawed, track_num } = this.props
        const { stepsEnabled } = this.state
        return (
                <Container className='Interface'>
                    {!drawed && !intro && <FullLoading />}
                    {drawed && 
                        <Steps
                            enabled={stepsEnabled}
                            initialStep={0}
                            steps={steps}
                            onExit={this.onExit}
                            onChange={this.onChange}
                        />
                    }
                    {
                        drawed && <Hints enabled={true} hints={hints} />
                    }
                    {track_num > 0 && 
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
    onBackMobile() {
        dispatch(push('/mobile'))
    },
    onChangeTrackOrder(source_index, target_index) {
        dispatch(changeTrackOrder(source_index, target_index))
    }, 
    onIntroFinish() {
        dispatch(introFinish())
    }

});
const mapStateToProps = (state) => {
    const trackIds = state['decision'].ids
    return {
        intro: state['decision'].intro,
        track_num: trackIds.length,
        drawed: state['candidate'].drawing['loaded']
    }
};
Interface = connect(mapStateToProps, mapDispatchToProps)(Interface)
export default Interface;
