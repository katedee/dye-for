import React from 'react';
import { Switch, Route, Link } from 'react-router-dom'

import './../App.css';

import Home from './Home';
import Plant from './Plant';
import Post from './Post';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <header>
            <nav>
              <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/post'>Post</Link></li>
                <li><Link to='/plant'>Plant</Link></li>
              </ul>
            </nav>
        </header>
        </div>

        {/* header goes here*/}

        <div className='ph3 pv1 background-gray'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/plant' component={Plant} />
            <Route path='/post/:postId' component={Post} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
