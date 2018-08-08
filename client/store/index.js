import { createStore, combineReducers } from 'redux';
import * as reducers from './reducers';

const store = createStore(combineReducers(reducers), {
    routes: [{ name: 'GET /api/v1/account', code: 200, body: '{"name":"user"}' }]
});

export default store;
