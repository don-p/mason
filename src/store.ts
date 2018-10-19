import { applyMiddleware, compose, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';


const initialState = {
  colorList: new Array(0)
};
const enhancers: any[] = [];
const middleware: any = [thunk];
const composedEnhancers = compose(
  applyMiddleware(...middleware, logger)
);

const appReducer =  (state: any = initialState, action: any) => {
  switch (action.type) {
    case 'DROP':
      // Copy state array to avoid mutating state objects.
      const listDrop = state.colorList.slice(0);
      // Assign a unique ID to the item for searching in array.
      action.data.id = action.data.id + '-' + listDrop.length;
      // Add new dropped item to state list.
      listDrop.push(action.data);
      return Object.assign({}, state, {
        colorList: listDrop,
        dropItem: action.data
      });  
    case 'DROP-ORDER':
      // Copy state array to avoid mutating state objects.
      const listOrder = state.colorList.slice(0);
      // Assign a unique ID to the item for searching in array.
      action.data.id = action.data.id + '-' + listOrder.length;
      // Add new dropped item to state list at the specified index.
      listOrder.splice(action.index, 0, action.data);
      return Object.assign({}, state, {
        colorList: listOrder,
        dropItem: action.data
      });  
    default:
      return state;
  }
};

const store = createStore(
  appReducer,
  initialState as any,
  composedEnhancers
);
    
if((process as NodeJS.Process).env.NODE_ENV === 'development') {
  const win = (window as any);
  const devToolsExtension = win.devToolsExtension;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

export default store;