import React from 'react';
import Header from './Header';
import Footer from './Footer';
import RouteList from './RouteList';
import 'typeface-roboto';
import 'brace/mode/json';
import 'brace/theme/github';

export default class App extends React.Component {

    render() {
        return (
            <React.Fragment>
                <Header />
                <RouteList />
                <Footer />
            </React.Fragment>
        );
    }

}
