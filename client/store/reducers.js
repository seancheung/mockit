import * as ACTIONS from './actions';

export function routes(state = [], action) {
    switch (action.type) {
    case ACTIONS.ADD_ROUTE:
        return [...state, {}];
    case ACTIONS.DEL_ROUTE:
        return state.filter((_, i) => i !== action.index);
    case ACTIONS.MOD_ROUTE:
        return state.map((route, i) => {
            if (action.index === i) {
                return Object.assign({}, route, action.data);
            }

            return route;
        });
    default:
        return state;
    }
}
