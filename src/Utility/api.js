import { Player } from "tone";
import { randomGroup } from './map'
import { default_volume } from './initial'
const server_url = "https://musicai.citi.sinica.edu.tw/mashup_ml_server";

export const getMainLoop = async (number) =>
    await fetch(`${server_url}/get_main_loop/${number}`).then((response) =>
        response.json()
    );
export const getAccLoop = async (url, number) =>
    await fetch(`${server_url}/get_mashup_result?url=${url}&num=${number}`).then((response) =>
        response.json()
    );
export const loadUrl = (url) => `${server_url}/download_filepath?url=${url}`;
export const loadPlayer = (url) => {
    return new Promise((resolve) => {
        const player = new Player(loadUrl(url), () => {
            player.mute = false
            player.volume.value = default_volume
            player.toDestination();
            resolve({
                url,
                player, 
                group: randomGroup(),
            });
        });
    });
};