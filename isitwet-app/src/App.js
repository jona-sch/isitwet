import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Home from './components/Home';
import LocationList from './components/location/LocationList';
import LocationEdit from './components/location/LocationEdit';
import WeatherDetail from './components/weather/WeatherDetail';
import AppNavbar from './components/utils/AppNavbar';

class App extends Component {
  render() {
    return (
      <div>
      <BrowserRouter>
        <AppNavbar />
        <div>
          <Switch>
            <Route as={Link} path='/' exact component={Home}/>
            <Route as={Link} path='/locations' exact component={LocationList}/>
            <Route as={Link} path='/locations/:id' component={LocationEdit}/>
            <Route as={Link} path='/weather/:id' component={WeatherDetail}/>
          </Switch>
        </div>
      </BrowserRouter>
      </div>
    )
  }
}

export default App;