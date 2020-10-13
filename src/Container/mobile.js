import React, { Component } from 'react';
import logo from '../Assets/logo/logo_white.svg'
import { rgba } from 'polished'
import styled from 'styled-components'
const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2em;

    & * {
        margin: 5px;
    }
`
const IMG = styled.img`
    width: 128px;
    height: 128px;
    margin-bottom: 10px;
`
const H1 = styled.h1`
    font-weight: 600;
    font-size: 40px;
    line-height: 47px;
    text-transform: uppercase;  
`
const P = styled.p`
    margin-bottom: 10px;
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 160%;
    letter-spacing: 0.4px;
    opacity: 0.8;
`
const T = styled.p`
    font-style: normal;
    font-weight: 2000;
    font-size: 16px;
    line-height: 160%;
    letter-spacing: 0.4px;
    opacity: 0.8;
    color: ${rgba('#ffffff', 0.8)}
`
const A = styled.div`
    color: #ffffff;
    font-size: 14px;
    cursor: pointer;
    font-weight: normal;
    box-sizing: border-box;
    text-transform: uppercase;
    background-color: ${rgba('#ffffff', 0)};
    margin-bottom: 20px;
    &:hover, :active {
        text-decoration: underline;
    }
`

class Mobile extends Component {
    render() {
        return (
            <Container className='Mobile'>
                <IMG src={logo} alt="logo" />
                <H1>Beats With You</H1>
                <P>Partnership with AI to create Beats</P>
                <T>Not support mobile device, Please open the computer</T>
            </Container>
        )
    }
}


export default Mobile;
