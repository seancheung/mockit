import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Route from './Route';
import { list } from './store/commands';

class RouteList extends React.Component {

    render() {
        return (
            <div>
                {this.props.routes.map((route, index) => (
                    <Route key={index} {...route} />
                ))}
            </div>
        );
    }

    componentDidMount() {
        this.props.list(0, 10);
    }

    static get propTypes() {
        return {
            list: PropTypes.func,
            routes: PropTypes.arrayOf(
                PropTypes.shape({
                    method: PropTypes.string.isRequired,
                    path: PropTypes.string.isRequired,
                    code: PropTypes.number,
                    headers: PropTypes.object,
                    body: PropTypes.string,
                    delay: PropTypes.number
                })
            )
        };
    }

}

export default connect(
    state => ({ routes: state.routes }),
    dispatch => ({
        list: (index, size) => {
            dispatch(list(index, size));
        }
    })
)(RouteList);
