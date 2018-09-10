import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import withStyles from '@material-ui/core/styles/withStyles';
import { exportRoutes } from './store/http';
import { FORMATS, EXTENSIONS } from './store/consts';

const styles = {
    menu: {
        witdh: 200
    },
    field: {
        display: 'block'
    }
};

export class ExportRoutes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            format: FORMATS.json
        };
    }

    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.closeHandler}
                aria-labelledby="export-dialog-title"
            >
                <DialogTitle id="export-dialog-title">
                    Export Routes
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>Export Routes</DialogContentText>
                    <TextField
                        select
                        label="Method"
                        margin="normal"
                        required
                        className={this.props.classes.field}
                        SelectProps={{
                            MenuProps: {
                                className: this.props.classes.menu
                            }
                        }}
                        value={this.state.format}
                        onChange={this.handleChange.bind(this)}
                    >
                        {Object.entries(FORMATS).map(([k, v]) => (
                            <MenuItem key={k} value={v}>
                                {k}
                            </MenuItem>
                        ))}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.closeHandler} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={this.handleExport.bind(this)}
                        color="secondary"
                    >
                        Export
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    handleChange(e) {
        this.setState({ format: e.target.value });
    }

    async handleExport() {
        const res = await exportRoutes(this.state.format);
        const a = window.document.createElement('a');
        let data = res.data;
        if (typeof data !== 'string') {
            data = JSON.stringify(data);
        }
        a.href = window.URL.createObjectURL(new Blob([data]), {
            type: this.state.format
        });
        a.download = `routes.${EXTENSIONS[this.state.format]}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        this.props.closeHandler();
    }

}

export default withStyles(styles)(ExportRoutes);
