import fx from '../Assets/type/fx.svg'
import bass from '../Assets/type/bass.svg'
import chord from '../Assets/type/chord.svg'
import vocal from '../Assets/type/vocal.svg'
import melody from '../Assets/type/melody.svg'
import percussion from '../Assets/type/percussion.svg'
const mapTable = {
    'percussion': {
        'color': '#FF5ADA',
        'icon' : percussion,
    }, 
    'bass': {
        'color': '#FF7D05',
        'icon' : bass,
    } , 
    'chord': {
        'color': '#FFF500',
        'icon' : chord,
    },
    'melody': {
        'color': '#46E72C',
        'icon' : melody,
    }, 
    'vocal': {
        'color': '#B23FF9',
        'icon' : vocal,
    }, 
    'fx': {
        'color': '#05B4FF',
        'icon' : fx,
    }
}
export const mapIcon = (group) => (mapTable[group]['icon'])
export const mapColor = (group) => (mapTable[group]['color'])
export const randomGroup = () => (Object.keys(mapTable)[Math.floor(Math.random() * Object.keys(mapTable).length)])
export const mapRange = (value, low1, high1, low2, high2) => (low2 + (high2 - low2) * (value - low1) / (high1 - low1))