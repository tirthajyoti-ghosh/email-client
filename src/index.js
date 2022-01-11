import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './App';
import reportWebVitals from './reportWebVitals';
import reducer from './redux/reducers/emails';

const initialState = {
    emails: {},
    currentPage: 1,
    selectedEmailId: '',
    isEmailBodyOpen: false,
    currentEmailBody: {},
    currentFilter: 'unread',
    filteredEmails: {},
};

const store = createStore(
    reducer,
    initialState,
    // eslint-disable-next-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
