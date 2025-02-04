import React, { Component } from 'react';
import loading from '../Assets/icon/loading.svg'
import styled from 'styled-components'

const Container = styled.div`
`


const IMG = styled.img`
    width: 32px;
    height: 32px;
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: center;
`



class Loading extends Component {
    render() {
        return (
            <Container className='Load'>
                <IMG src={loading} alt="Loading" />
            </Container>
        )
    }
}

export default Loading;