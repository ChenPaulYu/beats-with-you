import { v4 } from "node-uuid";
import * as api from "../Utility/api";
export const main_num = 8;
export const acc_num  = 12;
export const addPlayer = (response, loop_type) => ({
    type: 'ADD_PLAYER',
    loop_type,
    response,
    id: v4()
});
export const refreshPlayer = () => ({
    type: 'REFRESH_PLAYER',
});
export const activatePlayer = (id) => ({
    type: 'ACTIVATE_PLAYER',
    id
})
export const fetchMainPlayer = () => (dispatch) => {
    dispatch({ type: 'REQUEST_START'})
    return api.getMainLoop(main_num).then((response) => {
        response['main'].map((url) =>
            api.loadPlayer(url).then((response) => dispatch(addPlayer(response, 'main'))).then(() => (dispatch({
                type: 'REQUEST_ADD',
                num: main_num
            })))
        );
    });
};
export const fetchAccPlayer = (source_url) => (dispatch) => {
    dispatch({ type: 'REQUEST_START' })
    return api.getAccLoop(source_url, acc_num).then((response) => {
        response['rank'].map((url) =>
            api.loadPlayer(url).then((response) => dispatch(addPlayer(response, 'acc'))).then(() => (dispatch({
                type: 'REQUEST_ADD',
                num: acc_num
            })))
        );
    });
};
export const addTrack = (loop, track_num, loop_type) => ({
    type: 'ADD_TRACK',
    loop,
    loop_type,
    track_num
})
export const removeTrack = (id) => ({
    type: 'REMOVE_TRACK',
    id
})
export const activatePad = (id, index) => ({
    type: 'ACTIVATE_PAD',
    index,
    id
})
export const adjustVolume = (id, volume) => ({
    type: 'ADJUST_VOLUME',
    volume,
    id
})
export const toggleMute = (id) => ({
    type: 'TOGGLE_MUTE',
    id
})
export const toggleSolo = (id) => ({
    type: 'TOGGLE_SOLO',
    id
})
export const togglePlay = () => ({
    type: 'TOGGLE_PLAY',
})
export const changeBpm = (bpm) => ({
    type: 'CHANGE_BPM',
    bpm
})
export const moveSequencer = () => ({
    type: 'MOVE_SEQUENCER'
});
export const changeTrackOrder = (source_index, target_index) => ({
    type: 'CHANGE_ORDER',
    source_index, 
    target_index
})
export const drawFinish = (loop_type) => ({
    type: 'DRAW_FINISH',
    num: loop_type == 'main' ? main_num : acc_num
});
export const introFinish = () => ({
    type: 'INTRO_FINISH',
});