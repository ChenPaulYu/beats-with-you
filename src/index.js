import React from "react";
import ReactDOM from "react-dom";
import Root from "./root";
import WebFont from 'webfontloader';
import configureStore from "./configure";

const store = configureStore();
const rootElement = document.getElementById("root");

WebFont.load({
    google: {
        families: ['Noto+Sans|Roboto+Mono|Work+Sans:400,700', 'Work Sans']
    }
}); 

ReactDOM.render(<Root store={store} />, rootElement);