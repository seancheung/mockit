import React from 'react';
import Header from './Header';
import Footer from './Footer';
import RouteList from './RouteList';
import 'typeface-roboto';

export default class App extends React.Component {

    render() {
        return (
            <div>
                <Header />
                <RouteList />
                <Footer />
            </div>
        );
    }

}
