import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import reducer from './reducers/index';


const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));



const StoreProvider = ({children}) => (
    <Provider store={store}>
        {children}
    </Provider>
)

export default StoreProvider;

