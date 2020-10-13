export const steps = [
    {
        element: '.track',
        intro: '<p>The main loop <br> chosen by you is here</p>',
        position: 'right',
        highlightClass: 'highlighter',
        tooltipClass: 'tooltip',
    },  {
        element: '.control-block',
        intro: '<p>Click button to <br> control (play/stop) the sequencer</p>',
        position: 'left',
        highlightClass: 'highlighter',
        tooltipClass: 'tooltip',
    }, {
        element: '.acc_loops',
        intro: '<p>AI model will recommend some loop for you <br> according to the loops in your sequencer</p>',
        position: 'left',
        highlightClass: 'highlighter',
        tooltipClass: 'tooltip',
    }, {
        element: '.add_track',
        intro: '<p>Choose a loop you like and add new track in your sequencer</p>',
        position: 'right',
        highlightClass: 'highlighter',
        tooltipClass: 'tooltip',
    }, {
        element: '.refresh',
        intro: '<p>If you do not like these loop, let AI recommend others for you</p>',
        position: 'right',
        highlightClass: 'highlighter',
        tooltipClass: 'tooltip',
    }, {
        element: '.tracks',
        intro: '<p>The recommend loops is according to your loops in last track, drag and drop loops to change order</p>',
        position: 'right',
        highlightClass: 'highlighter',
        tooltipClass: 'tooltip',
    }, {
        element: '.feedback',
        intro: '<p>Let’s give us feedback, Thanks !</p>',
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