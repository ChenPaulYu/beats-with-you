import React, { Component } from 'react';
import loading from '../Assets/icon/loading.svg'
import styled from 'styled-components'
import { rgba } from 'polished'

const Container = styled.div`
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    position: fixed;
    display: block; 
    z-index: 99; 
    background-color: ${rgba('#000000', 0.5)}
`


const IMG = styled.img`
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 100
`



class FullLoading extends Component {
    render() {
        return (
            <Container className='Load'>
                <IMG src={loading} alt="Loading" />
            </Container>
        )
    }
}

export default FullLoading;