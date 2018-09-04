import { createStore, combineReducers } from 'redux';
import * as reducers from './reducers';

const store = createStore(combineReducers(reducers), {
    routes: [
        { name: 'GET /api/v1/account', code: 200, body: '{"name":"user"}' },
        { name: 'GET /api/v1/preference', code: 200, body: '{"name":"user"}' },
        { name: 'GET /api/v1/mails', code: 200, body: '{"name":"user"}' }
    ]
});

export default store;
