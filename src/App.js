import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import Welcome from './Container/welcome';
import Chosen from './Container/chosen';
import About from './Container/about'
import Interface from './Container/interface'
import { Route, Switch } from "react-router-dom";
import './Sass/App.scss';
import logo from './Assets/logo/logo_dark.png'



class App extends Component {
  render() {
    return (
      <div className='App'>
        <Helmet> 
            <title>Beats With You</title> 
            <meta name="description" content="Beats With You" />
            <link rel="icon" type="image/svg" href={logo} sizes="16x16" />
        </Helmet>
        <Switch>
          <Route exact  path="/" component={Welcome}/>
          <Route path="/about" component={About}/>
          <Route path="/chosen" component={Chosen}/>
          <Route path="/interface" component={Interface} />
        </Switch>
      </div>
    )
  }
}

export default App;
