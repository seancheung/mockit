import * as actors from './actors';

export default dispatch =>
    Object.entries(actors).reduce(
        (t, [k, v]) =>
            Object.assign(t, { [k]: (...args) => dispatch(v(...args)) }),
        {}
    );
