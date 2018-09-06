import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Route from './Route';
import * as commands from './store/commands';

class RouteList extends React.Component {

    render() {
        return (
            <div>
                {this.props.routes.map((data, index) => (
                    <Route
                        key={index}
                        data={data}
                        removeHandler={this.props.remove.bind(this, index)}
                        updateHandler={this.props.update.bind(this, index)}
                    />
                ))}
            </div>
        );
    }

    componentDidMount() {
        this.props.list(this.props.app.index, this.props.app.size);
    }

    static get propTypes() {
        return {
            classes: PropTypes.object,
            app: PropTypes.shape({
                index: PropTypes.number,
                size: PropTypes.number,
                pending: PropTypes.bool,
                error: PropTypes.any
            }),
            routes: PropTypes.array,
            list: PropTypes.func,
            insert: PropTypes.func,
            remove: PropTypes.func,
            update: PropTypes.func,
            dump: PropTypes.func,
            load: PropTypes.func
        };
    }

}

export default connect(
    state => ({ app: state.app, routes: state.routes }),
    dispatch =>
        Object.entries(commands).reduce(
            (t, [k, v]) =>
                Object.assign(t, { [k]: (...args) => dispatch(v(...args)) }),
            {}
        )
)(RouteList);
