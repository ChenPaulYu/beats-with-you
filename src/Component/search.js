import React, { Component } from 'react';
import styled from 'styled-components'
import { rgba } from 'polished'
import arrow from '../Assets/icon/arrow.svg'
import recycle from '../Assets/icon/recycle.svg'
import DragLoop from './dragloop'
import refresh from '../Assets/button/refresh.svg'
import add from '../Assets/button/add.svg'
import Loading from './load'
import { fetchAccPlayer, refreshPlayer, addTrack } from "../Action"; 
import { connect } from "react-redux";
import { notify } from '../Utility/alert'

const LoadContainer = styled.div`
    height: 100%;
    width : 100%;
    display: grid;
    align-items: center;
    flex-direction: row;
    align-content: center;
    justify-content: center;
    margin-top: auto;
`
const Container = styled.div`
    height: 100%;
    width : 100%;
    background-color: #282B2E;
    display: flex;
    flex-direction: row;

    align-content: center;
    justify-content: center;
    margin-top: auto;
`
const Block = styled.div`
    display: flex;
    flex-direction: column;
    align-self: center;
    width : 90%;
    height: 90%;
`
const CONTENT = styled.div`
    padding: 10px;
    margin-top: 10px;
`
const TITLE = styled.div`
    display: flex;
    padding: 3px;
    & * {
        margin: 0px 5px;
    }
`
const P = styled.p`
    font-style: normal;
    font-weight: normal;
    font-size: 32px;
    line-height: 38px;
    display: flex;
    align-items: center;
    text-transform: uppercase;
    color: #FFFFFF;
`
const DROPDOWN = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 45px;
    color: #FFFFFF;
    cursor: pointer;
    background: ${ rgba('#3A3E43', 0) };
    border: 1px solid ${ rgba('#FFFFFF', 0.2) };
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
    border-radius: 2px;
`
const SPAN = styled.span`
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.2px;
    text-transform: uppercase;
`
const ARROW = styled.img`
    position: absolute;
    top: 50%;
    right: 10%;
    transform: translateY(-50%);
`
const Loops = styled.div` 
    margin-top: 40px;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
`
const ButtonBlock = styled.div`
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
    background: #282B2E;
    justify-content: space-between; 
`
const Refresh = styled.button`
    display: flex;
    border: none;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    text-align: justify;
    color: ${rgba('#FFFFFF', 0.6)};
    background: #282B2E;
    text-transform: uppercase;
    border-radius: 5px;
    & * {
        padding: 5px;
    }
    &:hover, :active {
        background: ${rgba('#FFFFFF', 0.2)};
    }

`
const ADD = styled.button`
    display: flex;
    border: none;
    align-items: center;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    justify-content: center;
    color: ${rgba('#FFFFFF', 0.6)};
    background: #282B2E;
    text-transform: uppercase;
    border-radius: 5px;

    & p {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    & img {
        display: grid;
        align-items: center;
        justify-content: center;
    }

    & * {
        padding: 2px;
    }
    &:hover, :active {
        background: ${rgba('#FFFFFF', 0.2)};
    }

`
class Search extends Component {
    constructor(props) {
        super(props);
        this.fetching = this.fetching.bind(this);
        this.adding = this.adding.bind(this);
        this.genreSelect = this.genreSelect.bind(this);
    }

    componentDidMount() {
        this.fetching()
    }
    
    genreSelect() {
        notify(
            'The feature is coming soon !',
            'Interested in "filtering music genres"?\nClick "Feedback" button to share your preference with us!')
    }
    adding() {
        const { activeLoop, onAddTrack, track_num, active } = this.props
        if (active) {
            if (track_num >= 5) {
                notify(
                    'Over the limit !',
                    'Tracks number exceeds the upper limit, \ndeleted some tracks to continue.')
            } else {
                onAddTrack(activeLoop, track_num, 'acc')
                this.fetching()
            }
        }
    }

    fetching() {
        const { onFetchAccLoop, sourceUrl } = this.props
        onFetchAccLoop(sourceUrl)
    }


    render() {
        const { ids, loaded } = this.props;
        return (
            <Container className='loopCache'>
                <Block>
                    <TITLE>
                        <img src={recycle} alt="Recycle Icon" />
                        <P>Loop</P>
                    </ TITLE>
                    <CONTENT>
                        <DROPDOWN onClick={this.genreSelect}> 
                            <ARROW src={arrow} alt="Arrow" />
                            <SPAN>Hip-Hop</SPAN>
                        </DROPDOWN>
                        {loaded && 
                            <Loops>
                                {ids.map((id, index) => (
                                    <DragLoop
                                        index={index}
                                        id={id}
                                        keys={id}
                                    />
                                ))}
                                </Loops>
                        }
                        {loaded &&
                            <ButtonBlock>
                                <ADD onClick={this.adding}>
                                    <img src={add} />
                                    <p>Add</p>
                                </ADD>
                                <Refresh onClick={this.fetching}>
                                    <img src={refresh} />
                                    <p>Refresh</p>
                                </Refresh>
                            </ButtonBlock>
                        }
                        {!loaded && <LoadContainer><Loading/></LoadContainer>}
                    </ CONTENT>
                </Block>
            </Container>
        )
    }
}


const mapDispatchToProps = (dispatch) => ({
    onFetchAccLoop(url) {
        dispatch(refreshPlayer())
        dispatch(fetchAccPlayer(url))
    }, 
    onAddTrack(loop, track_num, loop_type) {
        dispatch(addTrack(loop, track_num, loop_type))
    }
});
const mapStateToProps = (state) => {
    const trackIds = state['decision'].ids
    return {
        track_num: state['decision'].ids.length,
        ids: state['candidate'].ids,
        track_num: state['decision'].ids.length,
        loaded: state['candidate']['loading'].loaded,   
        active: state['candidate']['activateId'] != '',
        activeLoop: state['candidate'].loops[state['candidate']['activateId']],
        sourceUrl: trackIds.length > 0 ? state['decision']['tracks'][trackIds[trackIds.length - 1]].url : undefined
    }
};
Search = connect(mapStateToProps, mapDispatchToProps)(Search)
export default Search;