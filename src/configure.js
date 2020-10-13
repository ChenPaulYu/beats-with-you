import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import createLogger from "redux-logger";
import thunk from "redux-thunk";
import createRootReducer from "./Reducer";

export const history = createHistory(createHashSource())


// export const history = createBrowserHistory({
//     basename: process.env.PUBLIC_URL,
// });

export default function configureStore(preloadedState) {
    
    let middlewares = [thunk];
    middlewares.push(createLogger);

    const store = createStore(
        createRootReducer(history),
        preloadedState,
        compose(
            applyMiddleware(
                ...middlewares,
                routerMiddleware(history)
            )
        )
    );

    return store;
}
