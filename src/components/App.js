/*global FB*/
import React from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import { withRouter } from 'react-router'

import './../App.css';

import Home from './Home';
import Plant from './Plant';
import PostContainer from './PostContainer';
import ListPosts from './ListPosts';
import CreatePost from './CreatePost';
import EditPost from './EditPost';
import CreateNewPostLink from './CreateNewPostLink';
import SignUp from './SignUp';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo'

const FACEBOOK_APP_ID = '563597464000766';
const FACEBOOK_API_VERSION = 'v2.12'; // e.g. v2.10

class App extends React.Component {

  componentDidMount() {
    this._initializeFacebookSDK()
  }

  _initializeFacebookSDK() {
    window.fbAsyncInit = function () {
      FB.init({
        appId: FACEBOOK_APP_ID,
        cookie: true,  // enable cookies to allow the server to access the session
        version: FACEBOOK_API_VERSION // use Facebook API version 2.10
      });
    };

    // Load the SDK asynchronously
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  _handleFBLogin = () => {
    FB.login(response => {
      this._facebookCallback(response)
    }, { scope: 'public_profile,email' })
  }

  _facebookCallback = async facebookResponse => {
    if (facebookResponse.status === 'connected') {
      const facebookToken = facebookResponse.authResponse.accessToken
      const graphcoolResponse = await this.props.authenticateUserMutation({ variables: { facebookToken } })
      const graphcoolToken = graphcoolResponse.data.authenticateUser.token
      localStorage.setItem('graphcoolToken', graphcoolToken)
      window.location.reload()
    } else {
      console.warn(`User did not authorize the Facebook application.`)
    }
  }

  _isLoggedIn = () => {
    return this.props.data.loggedInUser &&
      this.props.data.loggedInUser.id &&
      this.props.data.loggedInUser.id !== ''
  }

  _logout = () => {
    localStorage.removeItem('graphcoolToken')
    window.location.reload()
  }

  renderNav = () => {
    console.log(this._isLoggedIn());
    if (this._isLoggedIn()) {
      return this.renderLoggedIn()
    } else {
      return this.renderLoggedOut()
    }
  }


  render() {
    return(
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
        {this.renderNav()}

        {/* header goes here*/}

        <div className='ph3 pv1 background-gray'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/signup' component={SignUp} />
            <Route exact path='/plant' component={Plant} />
            <Route path='/post/:postId' component={PostContainer} />
            <Route exact path='/create/post' component={CreatePost} />
            <Route exact path='/edit/post/:postId' component={EditPost} />
          </Switch>
        </div>
      </div>
    );
  }

  renderLoggedIn() {
    return (
      <div>
        <span>
          Logged in as ${this.props.data.loggedInUser.id}
        </span>
        <div className='pv3'>
          <span
            className='dib bg-red white pa3 pointer dim'
            onClick={this._logout}
          >
            Logout
          </span>
        </div>
        <ListPosts />
        <CreateNewPostLink />
      </div>
    )
  }

  renderLoggedOut() {
    return (
      <div>
        <div className='pv3'>
          <div>
            <span
              onClick={this._handleFBLogin}
              className='dib pa3 white bg-blue dim pointer'
            >
              Log in with Facebook
            </span>
          </div>
          <span>Log in to create new posts</span>
        </div>
       
      </div>
    )
  }
}

const LOGGED_IN_USER = gql`
  query LoggedInUser {
    loggedInUser {
      id
    }
  }
`

const AUTHENTICATE_FACEBOOK_USER = gql`
  mutation AuthenticateUserMutation($facebookToken: String!) {
    authenticateUser(facebookToken: $facebookToken) {
      token
    }
  }
`

export default compose(
  graphql(AUTHENTICATE_FACEBOOK_USER, { name: 'authenticateUserMutation' }),
  graphql(LOGGED_IN_USER, { options: { fetchPolicy: 'network-only' } })
)(withRouter(App))