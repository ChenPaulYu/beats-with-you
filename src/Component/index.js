import React, { Component } from 'react';
import styled from 'styled-components'

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid white;
`

class Tracks extends Component {
    render() {
        return (
            <Container className='sequencer'>
                Tracks
            </Container>
        )
    }
}

export default Tracks;