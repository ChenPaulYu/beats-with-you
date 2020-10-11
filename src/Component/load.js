import React, { Component } from 'react';
import loading from '../Assets/icon/loading.svg'
import styled from 'styled-components'

const IMG = styled.img`
    width: 32px;
    height: 32px;
    height: 100%;
    width : 100%;
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: center;
`


class Loading extends Component {
    render() {
        return (
            <div className='Loading'>
                <IMG src={loading} alt="Loading" />
            </div>
        )
    }
}

export default Loading;