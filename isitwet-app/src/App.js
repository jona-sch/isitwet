import React from 'react';
// import './App.css';
import { Route, Switch, Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

import Home from './components/Home';
import LocationList from './components/location/LocationList';
import LocationEdit from './components/location/LocationEdit';
import WeatherDetail from './components/weather/WeatherDetail';
import { AppNavbar } from './components/utils/AppNavbar';
import { CallbackPage } from './components/utils/Callback';
import { PageLoader } from './components/utils/PageLoader';
import { ProtectedRoute } from "./auth/ProtectedRoute";


export const App = () => {
  const { isLoading } = useAuth0();

  console.log(isLoading);

  // if (isLoading) {
  //   return (
  //     <div className="page-layout">
  //       <PageLoader />
  //     </div>
  //   );
  // }

  return (
    <Switch>
      <Route as={Link} path='/' exact component={Home}/>
      <ProtectedRoute as={Link} path='/locations' exact component={LocationList}/>
      <ProtectedRoute as={Link} path='/locations/:id' component={LocationEdit}/>
      <ProtectedRoute as={Link} path='/weather/:id' component={WeatherDetail}/>
      <Route as={Link} path='/callback' component={CallbackPage}/>
    </Switch>
  )
}
