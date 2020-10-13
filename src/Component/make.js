import React, { Component } from 'react';
import styled from 'styled-components';
import Control from './control'
import Park from './park'
import Sequencer from './sequencer'

const Container = styled.div`
    height: 100%;
    width : 100%;
    display: grid;
    grid-template-rows: 1.5fr 5.5fr 1fr;
`


class Make extends Component {

    render() {
        return (
            <Container className='Make'>
                <Park />
                <Sequencer />
                <Control />
            </Container>
        )
    }
}


export default Make;