import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // allows for asynchronous action creators
import { persistStore, autoRehydrate } from 'redux-persist';  // this is a store enhancer
import { AsyncStorage } from 'react-native';
import reducers from '../reducers';

const store = createStore(
    reducers,
    {},
    compose(
        applyMiddleware(thunk),
        autoRehydrate() 

    )
);
persistStore(store, { storage: AsyncStorage, whitelist: ['answers'] }); //this will come from reducers/index file

export default store;