import React, { Component } from 'react';
import styled from 'styled-components'
import { rgba } from 'polished'
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
    margin: 30px;
    color: ${rgba('#ffffff', 0.8)};
    width: 700px;
    text-align: justify;
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 160%;
`
const A = styled.a`
    padding: 3px;
    color: #FFFFFF;
    cursor: pointer;
    text-decoration: none;
    background: ${rgba('#ffffff', 0)};
    &:hover {
        background: ${rgba('#ffffff', 0.2)};
        text-decoration: underline;
    }
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
    render() {
        const { onClickNext } = this.props
        return (
            <Container className='Intro'>
                <H1 class="title">Intro</H1>
                <HR/> 
                <P>Beats with You join force with AI to help you create beats designed by
                    <A href='https://www.yachinhsiao.com/about' target="_blank">YC Hsiao</A> & developed by
                    <A href={'https://paulyuchen.com/'} target="_blank">Bo-Yu Chen</A>. In this website, you are allowed to make beats by choosing the loops extracted from
                    <A href={'https://freemusicarchive.org/'} target="_blank">Free Music Archive</A>. 
                    On top of that, our AI models can help with recommending suitable loops for your work by calculating compatibility 
                    between loops. Please enjoy playing with loops here, and for further technical information, please check out the
                    <A href='https://arxiv.org/abs/2008.02011' target="_blank">Paper</A>.
                </P>
                <HR/> 
                <Button active={true} onClick={onClickNext}>Next</Button>
            </Container>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    onClickNext() {
        dispatch(push('/chosen'));
    }
});


Intro = connect(undefined, mapDispatchToProps)(Intro);
Intro = connect(null, { push })(Intro);


export default Intro;
