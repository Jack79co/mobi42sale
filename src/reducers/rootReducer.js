import { combineReducers, createStore } from 'redux';
import cartItems from './cartItems';
import totalPrice from './totalPrice';
import domainReducer from './domain';
import checkOutArray from './checkOutArray';
import _quantity from './_quantity';
import favItems from './favItems';



const rootReducer = combineReducers({
  cartItems: cartItems,
  favItems : favItems,
  totalPrice: totalPrice,
  domainReducer: domainReducer,
  checkOutArray: checkOutArray,
  _quantity: _quantity
})
export default rootReducer;    