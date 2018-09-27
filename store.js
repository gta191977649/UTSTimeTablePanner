
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from "./Redux/Reducers";
import devToolsEnhancer from 'remote-redux-devtools';
import {composeWithDevTools} from "redux-devtools-extension";


export default function configureStore() {
    const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000 });

    const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
    return { store };
}
