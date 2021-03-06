import React from 'react';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import Route from './Route';
import AddRoute from './AddRoute';
import DeleteRoute from './DeleteRoute';
import ImportRoutes from './ImportRoutes';
import ExportRoutes from './ExportRoutes';
import Message from './Message';
import director from './store/director';
import { MODES } from './store/consts';
import { checkRoute } from './store/http';
import { pluck } from './store/utils';

const styles = theme => ({
    list: {
        padding: theme.spacing(2),
        height: '85vh',
        overflow: 'auto'
    },
    space: theme.mixins.toolbar
});

export class RouteList extends React.Component {

    render() {
        const { classes, app, routes, setMode, setError } = this.props;

        return (
            <div className={classes.list}>
                <div className={classes.space} />
                {routes.map(data => (
                    <Route
                        key={data.id}
                        data={data}
                        template={app.template}
                        updateHandler={this.handleUpdate.bind(this, data.id)}
                        deleteHandler={setMode.bind(
                            null,
                            MODES.DELETE,
                            data.id
                        )}
                    />
                ))}
                <AddRoute
                    open={app.mode === MODES.ADD}
                    template={app.template}
                    closeHandler={setMode.bind(null, null)}
                    validateHandler={this.handleValidate.bind(this)}
                    createHandler={this.handleCreate.bind(this)}
                />
                <DeleteRoute
                    open={app.mode === MODES.DELETE}
                    closeHandler={setMode.bind(null, null)}
                    deleteHandler={this.handleDelete.bind(this)}
                />
                <ImportRoutes
                    open={app.mode === MODES.IMPORT}
                    closeHandler={setMode.bind(null, null)}
                    importHandler={this.handleImport.bind(this)}
                    errorHandler={setError}
                />
                <ExportRoutes
                    open={app.mode === MODES.EXPORT}
                    closeHandler={setMode.bind(null, null)}
                />
                <Message
                    open={app.error != null}
                    title="Error"
                    content={app.error && app.error.message}
                    closeHandler={setError.bind(null, null)}
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
        this.props.deleteRoute(this.props.app.selected).then(() => {
            this.handleRefresh();
            this.props.setMode(null);
        });
    }

    handleUpdate(id, data, dirty) {
        this.props.updateRoute(id, dirty ? pluck(data, ...dirty) : data);
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

    handleImport(format, data) {
        this.props.importRoutes(format, data).then(() => this.handleRefresh());
    }

}

export default withStyles(styles)(
    connect(
        state => ({ app: state.app, routes: state.routes }),
        director
    )(RouteList)
);
