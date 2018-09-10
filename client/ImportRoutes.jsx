import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { withStyles } from '@material-ui/core/styles';

const styles = {};

export class ImportRoutes extends React.Component {

    constructor(props) {
        super(props);
        this.state = { file: null };
    }

    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.closeHandler}
                aria-labelledby="import-dialog-title"
            >
                <DialogTitle id="import-dialog-title">
                    Import Routes
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <input
                            accept="json,yml,yaml"
                            id="upload-routes-file"
                            type="file"
                            onChange={this.handleChange.bind(this)}
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.closeHandler} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={this.handleImport.bind(this)}
                        color="secondary"
                        disabled={this.state.file == null}
                    >
                        Import
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    handleChange(e) {
        this.setState({ file: e.target.files[0] });
    }

    handleImport() {
        const reader = new FileReader();
        reader.readAsText(this.state.file, 'utf8');
        reader.onload = e => {
            this.props.importHandler(this.state.file.name, e.target.result);
            this.props.closeHandler();
        };
    }

}

export default withStyles(styles)(ImportRoutes);
