import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import candidate from './candidate'
import decision from './decision'


const createRootReducer = (history) =>
    combineReducers({
        router: connectRouter(history),
        candidate, 
        decision
    });

export default createRootReducer;