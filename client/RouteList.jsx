import React from 'react';
import { connect } from 'react-redux';
import Route from './Route';
import dispatcher from './store/dispatcher';
import { withStyles } from '@material-ui/core/styles';
import RouteDelete from './RouteDelete';

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

    constructor(props) {
        super(props);
        this.state = { selected: null };
    }

    render() {
        return (
            <div className={this.props.classes.content}>
                <div className={this.props.classes.space} />
                {this.props.routes.map((data, index) => (
                    <Route
                        key={index}
                        data={data}
                        template={this.props.app.template}
                        removeHandler={() =>
                            this.setState({ selected: data.id })
                        }
                        updateHandler={this.props.updateRoute.bind(
                            this,
                            data.id
                        )}
                        editHandler={this.props.editRoute.bind(this, data.id)}
                    />
                ))}
                <RouteDelete
                    open={this.state.selected != null}
                    closeHandler={() => this.setState({ selected: null })}
                    deleteHandler={this.handleDelete.bind(this)}
                />
            </div>
        );
    }

    componentDidMount() {
        this.props.getTemplate();
        this.props.listRoutes(this.props.app.index, this.props.app.size);
    }

    async handleDelete() {
        await this.props.removeRoute(this.state.selected);
        this.setState({ selected: null });
        await this.props.listRoutes(this.props.app.index, this.props.app.size);
    }

}

export default withStyles(styles)(
    connect(
        state => ({ app: state.app, routes: state.routes }),
        dispatcher
    )(RouteList)
);
