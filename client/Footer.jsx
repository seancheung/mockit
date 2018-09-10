import React from 'react';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TablePagination from '@material-ui/core/TablePagination';
import withStyles from '@material-ui/core/styles/withStyles';
import director from './store/director';

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'nowrap',
        backgroundColor: theme.palette.primary.main,
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: theme.zIndex.appBar
    }
});

const StyledTablePagination = withStyles(
    theme => ({
        caption: { color: theme.palette.primary.contrastText },
        select: { color: theme.palette.primary.contrastText },
        selectIcon: { color: theme.palette.primary.contrastText }
    }),
    TablePagination
)(TablePagination);

class TablePaginationActions extends React.Component {

    render() {
        const { classes, count, page, rowsPerPage } = this.props;

        return (
            <div className={classes.root}>
                <IconButton
                    onClick={this.handleFirstPageButtonClick.bind(this)}
                    disabled={page === 0}
                    aria-label="First Page"
                    color="inherit"
                >
                    <FirstPageIcon />
                </IconButton>
                <IconButton
                    onClick={this.handleBackButtonClick.bind(this)}
                    disabled={page === 0}
                    aria-label="Previous Page"
                    color="inherit"
                >
                    <KeyboardArrowLeft />
                </IconButton>
                <IconButton
                    onClick={this.handleNextButtonClick.bind(this)}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Next Page"
                    color="inherit"
                >
                    <KeyboardArrowRight />
                </IconButton>
                <IconButton
                    onClick={this.handleLastPageButtonClick.bind(this)}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Last Page"
                    color="inherit"
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

const StyledTablePaginationActions = withStyles(theme => ({
    root: { flexShrink: 0, color: theme.palette.primary.contrastText }
}))(TablePaginationActions);

export const Footer = ({ classes, app, getRoutes }) => (
    <div className={classes.root}>
        <StyledTablePagination
            component="div"
            labelRowsPerPage=""
            count={app.count}
            rowsPerPage={app.size}
            page={app.index}
            onChangePage={(e, page) => getRoutes(page, app.size)}
            onChangeRowsPerPage={e => getRoutes(app.index, e.target.value)}
            ActionsComponent={StyledTablePaginationActions}
        />
    </div>
);

export default withStyles(styles)(
    connect(
        state => ({ app: state.app }),
        director
    )(Footer)
);
