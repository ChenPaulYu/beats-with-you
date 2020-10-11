import React, { Component } from 'react';
import { Droppable } from "react-beautiful-dnd";
import styled from 'styled-components'
import DragLoop from './dragloop'

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

`
const Block = styled.div`
    width: 85%;
    height: 100%;
    justify-self: center;
    justify-content: start;
    align-items: center;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
`
const TITLE = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    & * {
        margin: 10px;
        margin-left: 0px;
    }
`
const P = styled.p`
    display: flex;
    text-transform: uppercase;
`
const HR = styled.hr`
    margin: 10px 0px;
    width: 100%;
    opacity: 0.2;
    border: 1px solid #FFFFFF;
    box-sizing: border-box;
`
const PARKS = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    justify-content: start;
    align-items: start;
    text-transform: uppercase;
    & * {
        margin-right: 20px;
        margin-left: 0px;
    }
`


class Park extends Component {
    render() {
        return (
            <Container className='park'>
                <Block>
                    <TITLE>
                        <P>Parking List</P>
                        <HR />
                    </TITLE>
                    <PARKS>
                        Coming Soon ......
                    </PARKS>
                </ Block>
            </Container>
        )
    }
}

export default Park;