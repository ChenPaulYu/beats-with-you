import { combineReducers } from 'redux';

const loop = (state, action) => {
    switch (action.type) {
        case "ADD_PLAYER":
            return {
                ...state,
                [action.id]: {
                    id: action.id,
                    url: action.response.url,
                    group: action.response.group,
                    player: action.response.player,
                }
            }
        default:
            return state;
    }
};
const ids = (state=[], action) => {
    switch (action.type) {
        case 'ADD_PLAYER':
            return [...state, action.id]
        case 'REFRESH_PLAYER':
            return []
        default:
            return state;
    }  
}
const activateId = (state='', action) => {
    switch (action.type) {
        case 'ACTIVATE_PLAYER':
            return (action.id === state) ? '' : action.id ;
        case 'REFRESH_PLAYER':
            return ''
        default:
            return state;
    }  
}
const loading = (state={}, action) => {
    switch (action.type) {
        case 'REQUEST_START':
        case 'REFRESH_PLAYER':
            return { count: 0, loaded: false }
        case 'REQUEST_ADD':
            const next_count = state.count + 1
            return { count: next_count, loaded: action.num == next_count ? true : false  }
        default:
            return state;
    }  
}

const drawing = (state={}, action) => {
    switch (action.type) {
        case 'REQUEST_START':
            return { count: 0, loaded: false }
        case 'DRAW_FINISH':
            console.log('DRAW FINISH')
            const next_count = state.count + 1
            return { count: next_count, loaded: action.num == next_count ? true : false }
        default:
            return state;
    }  
}

const loops = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_PLAYER':
            return loop(state, action);
        case 'ACTIVATE_PLAYER':
            let nextState = {}
            Object.keys(state).map((key) => (loop(state[key], action))).forEach((s) => {
                nextState[s.id] = s;
            });
            return nextState
        case 'REFRESH_PLAYER':
            Object.keys(state).map((key) => {
                state[key].player.mute = true
                state[key].player.stop()
            })
            return {}
        default:
            return state;
    }
};
const candidate = combineReducers({ 
    ids,
    loops,
    loading,
    drawing,
    activateId  
})

export default candidate;