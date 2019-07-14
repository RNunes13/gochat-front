
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

// Reducers
import { contactReducer } from './contact/reducers'
import { globalReducer } from './global/reducers'
import { authReducer } from './auth/reducers'

const rootReducer = combineReducers({
  contact: contactReducer,
  global: globalReducer,
  auth: authReducer,
})

export type AppState = ReturnType<typeof rootReducer>

export default function configureStore() {
  const middlewares = [thunkMiddleware];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(
    rootReducer,
    composeWithDevTools(middleWareEnhancer)
  );

  return store;
}
