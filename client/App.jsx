import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';

export default class App extends React.Component {

    render() {
        return (
            <div>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <Typography variant="title" color="inherit">
                            Mockit!
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }

}
