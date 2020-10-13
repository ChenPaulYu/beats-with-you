import { combineReducers } from 'redux';
import { intializePads, default_volume } from '../Utility/initial'
import { deleteKey, reorder } from '../Utility/manipulate'

const tracks = (state={}, action) => {
    switch (action.type) {
        case 'ADD_TRACK':
            return {
                ...state,
                [action.loop.id]: {
                    ...action.loop,
                    mute: false,
                    solo: false,
                    volume: default_volume,
                    pads: intializePads(1),
                    track_num: action.track_num,
                    loop_type: action.loop_type
                }
            }
        case 'REMOVE_TRACK': 
            return deleteKey(state, action.id)
        case 'ACTIVATE_PAD':
            const pads = state[action.id].pads
            return {    
                ...state, 
                [action.id] : {
                    ...state[action.id],
                    pads: [
                        ...pads.slice(0, action.index),
                        !pads[action.index],
                        ...pads.slice(action.index + 1)
                    ]
                }
            };
        case 'ADJUST_VOLUME':
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    volume: action.volume
                }
            }
        case 'TOGGLE_SOLO':
            const nextSate = {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    solo: !state[action.id].solo,
                    mute: !state[action.id].solo ? false : state[action.id].mute
                }
            } 
            Object.keys(state).filter((id) => (id != action.id)).forEach((id) => {
                nextSate[id] = {
                    ...state[id], 
                    mute: !state[action.id].solo ? false : state[id].mute,
                    solo: !state[action.id].solo ? false : state[id].solo
                }
            });
            return nextSate;
        case 'TOGGLE_MUTE':
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    mute: !state[action.id].mute,
                    solo: !state[action.id].mute ? false : state[action.id].solo
                }
            } 
        default:
            return state;
    }
};
const ids = (state=[], action) => {
    switch (action.type) {
        case 'ADD_TRACK':
            return [...state, action.loop.id]
        case 'REMOVE_TRACK':
            return state.filter ((id) => (id != action.id))
        case 'CHANGE_ORDER':
            return reorder(state, action.source_index, action.target_index )
        default:
            return state;
    }
}
const control = (state = {bpm: 120, playing: false, bar: -1}, action) => {
    switch (action.type) {
        case 'MOVE_SEQUENCER':
            console.log(state.bar)
            return { ...state, bar: (state.bar + 1) % 8 }
        case 'TOGGLE_PLAY':
            return { ...state, playing: !state.playing, bar: -1 }
        case 'CHANGE_BPM':
            return { ...state, bpm: action.bpm }
        default:
            return state;
    }
}
const intro = (state=false, action) => {
    switch (action.type) {
        case 'INTRO_FINISH':
            return true
        default:
            return state;
    }
}

const decision = combineReducers({
    ids, 
    intro,
    tracks,
    control,
})

export default decision;