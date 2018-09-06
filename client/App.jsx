import React from 'react';
import RouteList from './RouteList';
import Top from './Top';
import 'typeface-roboto';

export default class App extends React.Component {

    render() {
        return (
            <div>
                <Top />
                <RouteList />
            </div>
        );
    }

}
