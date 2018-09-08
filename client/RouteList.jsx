import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Route from './Route';
import AddRoute from './AddRoute';
import DeleteRoute from './DeleteRoute';
import director from './store/director';
import { MODES } from './store/consts';
import { checkRoute } from './store/http';

const styles = theme => ({
    list: {
        flexGrow: 1,
        padding: theme.spacing.unit * 2,
        height: '85vh',
        overflow: 'auto'
    },
    space: theme.mixins.toolbar
});

export class RouteList extends React.Component {

    render() {
        return (
            <div className={this.props.classes.list}>
                <div className={this.props.classes.space} />
                {this.props.routes.map((data, i) => (
                    <Route
                        key={i}
                        data={data}
                        template={this.props.app.template}
                        updateHandler={this.handleUpdate.bind(this, data.id)}
                        deleteHandler={this.props.setMode.bind(
                            null,
                            MODES.DELETE,
                            data.id
                        )}
                    />
                ))}
                <AddRoute
                    open={this.props.app.mode === MODES.ADD}
                    template={this.props.app.template}
                    closeHandler={this.props.setMode.bind(null, null)}
                    validateHandler={this.handleValidate.bind(this)}
                    createHandler={this.handleCreate.bind(this)}
                />
                <DeleteRoute
                    open={this.props.app.mode === MODES.DELETE}
                    closeHandler={this.props.setMode.bind(null, null)}
                    deleteHandler={this.handleDelete.bind(this)}
                />
            </div>
        );
    }

    componentDidMount() {
        this.props.getTemplate();
        this.handleRefresh();
    }

    handleRefresh() {
        this.props.getRoutes(this.props.app.index, this.props.app.size);
    }

    handleDelete() {
        this.props
            .deleteRoute(this.props.app.selected)
            .then(() => this.handleRefresh());
    }

    handleUpdate(id, data) {
        this.props.updateRoute(id, data);
    }

    async handleValidate(method, path) {
        try {
            await checkRoute(method, path);

            return true;
        } catch (error) {
            return false;
        }
    }

    handleCreate(data) {
        this.props.addRoute(data).then(() => this.handleRefresh());
    }

}

export default withStyles(styles)(
    connect(
        state => ({ app: state.app, routes: state.routes }),
        director
    )(RouteList)
);
