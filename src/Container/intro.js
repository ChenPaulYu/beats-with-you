import React, { Component } from 'react';
import styled from 'styled-components'
import { rgba } from 'polished'
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { isMobile } from "react-device-detect";

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
const H1 = styled.div`
    font-family: Work Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 36px;
    line-height: 52px;
    text-transform: uppercase;  
`
const HR = styled.hr`
    width: 800px;
    opacity: 0.2;
    border: 1px solid #FFFFFF;
    box-sizing: border-box;
`
const P = styled.p`
    color: ${rgba('#ffffff', 0.8)};
    width: 700px;
    text-align: center;
    font-style: normal;
    font-weight: 300;
    font-size: 24px;
    line-height: 160%;
`

const OL = styled.ol`
    text-align: left;
`

const LI = styled.li`
    color: ${rgba('#ffffff', 0.8)};
    font-style: normal;
    font-weight: 100;
    font-size: 20px;
    line-height: 160%;
`

const Button = styled.button`
    width: 160px;
    height: 45px;
    color: #ffffff;
    cursor: pointer;
    border-radius: 2px;
    font-weight: normal;  
    box-sizing: border-box;
    text-transform: uppercase;  
    background-color: ${rgba('#ffffff', 0)};
    border: 1px solid ${props => rgba('#ffffff', props.active ? 0.2 : 0)};
    &:hover, :active {
        background: ${ rgba('#ffffff', 0.2) };
    }
`

class Intro extends Component {
    componentDidMount() {
        const { onBackMobile } = this.props
        if (isMobile) {
            onBackMobile()
        }
    }
    render() {
        const { onClickNext } = this.props
        return (
            <Container className='Intro'>
                <H1 class="title">Intro</H1>
                <HR/> 
                <P>Let's make beats with AI in 5 minutes !</P>
                <OL>
                    <LI>Choose a main loop you like first</LI>
                    <LI>Let's AI recommend some accomany loops for you</LI>
                    <LI>Arrange your music in the seqeuncer</LI>
                    <LI>Have Fun !</LI>
                </OL>
                <HR/> 
                <Button active={true} onClick={onClickNext}>Next</Button>
            </Container>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    onClickNext() {
        dispatch(push('/chosen'));
    }, 
    onBackMobile() {
        dispatch(push('/mobile'))
    },
});


Intro = connect(undefined, mapDispatchToProps)(Intro);
Intro = connect(null, { push })(Intro);


export default Intro;
