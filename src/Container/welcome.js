import React, { Component } from 'react';
import logo from '../Assets/logo/logo_white.svg'
import { rgba } from 'polished'
import styled from 'styled-components'
import { connect } from "react-redux";
import { push } from "connected-react-router";

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
    margin-bottom: 30px;
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 160%;
    letter-spacing: 0.4px;
    opacity: 0.8;
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
const Button = styled.button`
    width: 160px;
    height: 45px;
    font-size: 14px;
    color: #ffffff;
    cursor: pointer;
    border-radius: 2px;
    font-weight: normal;  
    box-sizing: border-box;
    text-transform: uppercase;  
    background-color: ${rgba('#ffffff', 0)};
    border: 1px solid ${rgba('#ffffff', 0.2)};
    &:hover, :active {
        background: ${ rgba('#ffffff', 0.2) };
    }
`

class Welcome extends Component {
    render() {
        const { onClickChosen, onClickAbout } = this.props
        return (
            <Container className='Welcome'>
                <IMG src={logo} alt="logo" />
                <H1>Beats With You</H1>
                <P>Partnership with AI to create Beats</P>
                <A onClick={onClickAbout}>About</A>
                <Button onClick={onClickChosen}>Start</Button>
            </Container>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    onClickChosen() {
        dispatch(push('/chosen'));
    }, 
    onClickAbout() {
        dispatch(push('/about'));
    }
});


Welcome = connect(undefined, mapDispatchToProps)(Welcome);
Welcome = connect(null, { push })(Welcome);

export default Welcome;
