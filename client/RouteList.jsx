import React from 'react';
import Route from './Route';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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

    static get propTypes() {
        return {
            routes: PropTypes.arrayOf(
                PropTypes.shape({
                    name: PropTypes.string.isRequired,
                    code: PropTypes.number,
                    headers: PropTypes.object,
                    body: PropTypes.string,
                    delay: PropTypes.number
                })
            )
        };
    }

}

export default connect(state => ({ routes: state.routes }))(RouteList);
