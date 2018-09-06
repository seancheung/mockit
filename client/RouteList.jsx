import React from 'react';
import { connect } from 'react-redux';
import Route from './Route';
import dispatcher from './store/dispatcher';

class RouteList extends React.Component {

    render() {
        return (
            <div>
                {this.props.routes.map((data, index) => (
                    <Route
                        key={index}
                        data={data}
                        removeHandler={this.props.removeRoute.bind(this, index)}
                        updateHandler={this.props.updateRoute.bind(this, index)}
                        editHandler={this.props.editRoute.bind(this, index)}
                    />
                ))}
            </div>
        );
    }

    componentDidMount() {
        this.props.getTemplate();
        this.props.listRoutes(this.props.app.index, this.props.app.size);
    }

}

export default connect(
    state => ({ app: state.app, routes: state.routes }),
    dispatcher
)(RouteList);
