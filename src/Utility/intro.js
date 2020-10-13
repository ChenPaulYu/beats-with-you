import { acc_num } from '../Action'


export const steps = [
    {
        element: '.track',
        intro: '<p>The main loop <br> chosen by you is here</p>',
        position: 'right',
        highlightClass: 'highlighter',
        tooltipClass: 'tooltip',
    },  {
        element: '.control-block',
        intro: '<p>Click the button to <br> control (play/stop) the whole sequencer</p>',
        position: 'left',
        highlightClass: 'highlighter',
        tooltipClass: 'tooltip',
    }, {
        element: '.acc_loops',
        intro: `p> Our AI model recommends ${acc_num} loops for you,<br> according to the last track of loop in the sequencer</p>`,
        position: 'left',
        highlightClass: 'highlighter',
        tooltipClass: 'tooltip',
    }, {
        element: '.add_track',
        intro: '<p>Choose a loop you like <br> and click here <br> to add a new track</p>',
        position: 'right',
        highlightClass: 'highlighter',
        tooltipClass: 'tooltip',
    }, {
        element: '.refresh',
        intro: `p>If the current ${acc_num} loops aren’t your type, click here to ask for ${acc_num} new ones from AI</p>`,
        position: 'right',
        highlightClass: 'highlighter',
        tooltipClass: 'tooltip',
    }, {
        element: '.tracks',
        intro: '<p>Since AI recommends loops based on the last track here, drag and drop the waveform to change the order</p>',
        position: 'right',
        highlightClass: 'highlighter',
        tooltipClass: 'tooltip',
    }, {
        element: '.feedback',
        intro: '<p>Please feel free to <br> share any thoughts on the website, thanks!</p>',
        position: 'right',
        highlightClass: 'highlighter',
        tooltipClass: 'tooltip',
    },
];
export const hints = [
    {
        element: ".sequencer-p",
        hint: '<p>AI recommends loops according to the last track <br> Just drag and drop track to adjust the order! </p>',
        hintPosition: "top-right",
        tooltipClass: 'tooltip',
    }
]