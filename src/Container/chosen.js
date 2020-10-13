import React, { Component } from 'react';
import styled from 'styled-components'
import { rgba } from 'polished'
import { connect } from "react-redux";
import  Loading  from '../Component/load'
import refresh from '../Assets/button/refresh.svg'
import Loop from '../Component/loop'
import { fetchMainPlayer, refreshPlayer, addTrack } from "../Action"; 
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
    font-weight: 400;
    font-size: 40px;
    line-height: 48px;
    text-transform: uppercase;  
`
const Main = styled.div`
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(4, 1fr);
`
const RefreshBlock = styled.div`
    width: 100%;
    grid-column: 1/ -1;
    display: flex;
    flex-direction: row;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    text-align: justify;
    color: ${rgba('#FFFFFF', 0.6)};
    background: #212529;
    justify-content: flex-end; 
    justify-self: flex-end;
    margin-right: 0;
`
const Refresh = styled.button`
    border: 1px solid white;
    display: flex;
    justify-content: flex-end; 
    border: none;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    text-align: justify;
    color: ${rgba('#FFFFFF', 0.6)};
    background: #212529;
    text-transform: uppercase;
    margin-right: 0;
    & * {
        margin-right: 0;
    }
    &:hover, :active {
        background: ${ rgba('#ffffff', 0.2) };
    }
`
const Button = styled.button`
    width: 160px;
    height: 45px;
    color: ${ props => rgba('#ffffff', props.active ? 1 : 0.2)};
    border-radius: 2px;
    font-weight: normal;  
    box-sizing: border-box;
    text-transform: uppercase;  
    background-color: ${rgba('#ffffff', 0)};
    border: 1px solid ${props => rgba('#ffffff', props.active ? 0.2 : 0.1)};
    cursor: ${ props => props.active ? 'pointer' : 'default'};
    pointer-events: ${ props => props.active ? 'auto' : 'none'};
    &:hover, :active {
        background: ${ rgba('#ffffff', 0.2) };
    }
`

class Chosen extends Component {
    constructor(props) {
        super(props);
        this.next       = this.next.bind(this);
        this.fetching = this.fetching.bind(this);
    }


    next() {
        const { active, activeLoop, onAddTrack, track_num } = this.props
        if(active) {
            onAddTrack(activeLoop, track_num, 'main')
        }
    }

    fetching() {
        const { onFetchMainLoop } = this.props
        onFetchMainLoop()
    }

    componentDidMount() {
        const { onBackMobile } = this.props
        if (isMobile) {
            onBackMobile()
        } else {
            this.fetching()
        }
    }
    
    render() {
        const { ids, active, loaded } = this.props;
        return (
            <Container className='Chosen'>
                <H1>Choose One Main Loop First</H1>
                <Main>
                    {loaded && ids.map((id) => ( 
                        <Loop 
                            id={id} 
                            keys={id}
                        />)
                    )}
                    {loaded && 
                        <RefreshBlock>
                            <Refresh onClick={this.fetching}>
                                <img src={refresh} />
                                <p>Refresh</p>
                            </Refresh>
                        </RefreshBlock>
                    }
                </Main>
                {loaded
                    ? <Button active={active} onClick={this.next} >Next</Button>
                    : <Loading />
                }
            </Container>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    onFetchMainLoop() {
        dispatch(refreshPlayer())
        dispatch(fetchMainPlayer())
    }, 
    onAddTrack(loop, track_num, loop_type) {
        dispatch(refreshPlayer())
        dispatch(addTrack(loop, track_num, loop_type))
        dispatch(push('/interface'))
    }, 
    onBackMobile() {
        dispatch(push('/mobile'))
    },
});

const mapStateToProps = (state) => {
    return {
        ids: state['candidate'].ids,
        active: state['candidate']['activateId'] != '',
        loaded: state['candidate']['loading'].loaded,
        activeLoop: state['candidate'].loops[state['candidate']['activateId']],
        track_num: state['decision'].ids.length
    };
};
Chosen = connect(mapStateToProps, mapDispatchToProps)(Chosen);



export default Chosen;
