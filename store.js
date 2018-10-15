
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from "./Redux/Reducers";
import devToolsEnhancer from 'remote-redux-devtools';
import {composeWithDevTools} from "redux-devtools-extension";
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from "react-native"


export default function configureStore() {
    const persistConfig = {
        key: 'root',
        storage: AsyncStorage
    };
    const pReducer = persistReducer(persistConfig, rootReducer);


    const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000 });

    const store = createStore(pReducer, composeEnhancers(applyMiddleware(thunk)));
    return { store };

}
