import * as commands from './commands';

export default dispatch =>
    Object.entries(commands).reduce(
        (t, [k, v]) =>
            Object.assign(t, { [k]: (...args) => dispatch(v(...args)) }),
        {}
    );
