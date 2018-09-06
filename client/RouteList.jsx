import React from 'react';
import { connect } from 'react-redux';
import Route from './Route';
import dispatcher from './store/dispatcher';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 2,
        height: '90vh',
        overflow: 'auto'
    },
    space: theme.mixins.toolbar
});

class RouteList extends React.Component {

    render() {
        return (
            <div className={this.props.classes.content}>
                <div className={this.props.classes.space} />
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

export default withStyles(styles)(
    connect(
        state => ({ app: state.app, routes: state.routes }),
        dispatcher
    )(RouteList)
);
