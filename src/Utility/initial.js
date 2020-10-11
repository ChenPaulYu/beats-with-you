import { v4 } from "node-uuid";
const bar_num = 8;
const track_num = 5;
export const max_volume  = 1;
export const min_volume = -25;
export const default_volume = -5;

export const intializePads = (initial) => Array(bar_num).fill(initial);
export const intializeTrack = (id) => ({
    id,
    url: '',
    group: '',
    player: '',
    solo: false,    
    mute: false,
    pads: intializePads(0),
})
export const intialTracksIds = () => (Array(track_num).fill(''))
