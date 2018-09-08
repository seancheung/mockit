import React from 'react';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TablePagination from '@material-ui/core/TablePagination';
import { withStyles } from '@material-ui/core/styles';
import director from './store/director';

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        backgroundColor: theme.palette.primary.main,
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0
    },
    actions: {
        flexShrink: 0,
        marginLeft: theme.spacing.unit * 2.5
    }
});

export class TablePaginationActions extends React.Component {

    render() {
        const { classes, count, page, rowsPerPage } = this.props;

        return (
            <div className={classes.actions}>
                <IconButton
                    onClick={this.handleFirstPageButtonClick.bind(this)}
                    disabled={page === 0}
                    aria-label="First Page"
                >
                    <FirstPageIcon />
                </IconButton>
                <IconButton
                    onClick={this.handleBackButtonClick.bind(this)}
                    disabled={page === 0}
                    aria-label="Previous Page"
                >
                    <KeyboardArrowLeft />
                </IconButton>
                <IconButton
                    onClick={this.handleNextButtonClick.bind(this)}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Next Page"
                >
                    <KeyboardArrowRight />
                </IconButton>
                <IconButton
                    onClick={this.handleLastPageButtonClick.bind(this)}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Last Page"
                >
                    <LastPageIcon />
                </IconButton>
            </div>
        );
    }

    handleFirstPageButtonClick(event) {
        this.props.onChangePage(event, 0);
    }

    handleBackButtonClick(event) {
        this.props.onChangePage(event, this.props.page - 1);
    }

    handleNextButtonClick(event) {
        this.props.onChangePage(event, this.props.page + 1);
    }

    handleLastPageButtonClick(event) {
        this.props.onChangePage(
            event,
            Math.max(
                0,
                Math.ceil(this.props.count / this.props.rowsPerPage) - 1
            )
        );
    }

}

export const Footer = ({ classes, app, getRoutes }) => (
    <div className={classes.root}>
        <TablePagination
            component="div"
            labelRowsPerPage=""
            count={app.count}
            rowsPerPage={app.size}
            page={app.index}
            onChangePage={(e, page) => getRoutes(page, app.size)}
            onChangeRowsPerPage={e => getRoutes(app.index, e.target.value)}
            ActionsComponent={withStyles(styles)(TablePaginationActions)}
        />
    </div>
);

export default withStyles(styles)(
    connect(
        state => ({ app: state.app }),
        director
    )(Footer)
);
