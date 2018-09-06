import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = {
    text: {
        display: 'block'
    }
};

class RouteView extends React.Component {

    render() {
        return (
            <React.Fragment>
                <TextField
                    className={this.props.classes.text}
                    label="Status Code"
                    defaultValue={this.props.code}
                    margin="normal"
                    InputProps={{
                        readOnly: true
                    }}
                />
                <TextField
                    className={this.props.classes.text}
                    label="Body"
                    defaultValue={this.props.body}
                    margin="normal"
                    multiline
                    InputProps={{
                        readOnly: true
                    }}
                />
            </React.Fragment>
        );
    }

}

export default withStyles(styles)(RouteView);
