import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
    key: 'rootReducer',
    storage: AsyncStorage,
    whitelist: ['cartItems' , 'favItems', 'totalPrice', 'domainReducer', 'checkOutArray'],
    timeout: null, 
};


const pReducer = persistReducer(persistConfig, rootReducer);
const middleware = applyMiddleware(thunk);
const store = createStore(pReducer, middleware);
const persistor = persistStore(store);
              

export default store ;










// import { createStore, applyMiddleware } from 'redux';
// import rootReducer from '../reducers/rootReducer';
// import thunk from 'redux-thunk';



// export default store = createStore(rootReducer, applyMiddleware(thunk));