import React from 'react'
import { withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants'

class SignUp extends React.Component {
    state = {
        login: true, // switch between Login and SignUp
        email: '',
        password: '',
        name: ''
    }

    render () {
        return(
            <div className='container-fluid'>
                <div className='col-xs-12 col-md-4 col-md-offset-4'>
                    <form>
                        <div className='form-group'>
                            <label for='userEmail'>Email address</label>
                            <input
                                id='userEmail'
                                class='form-control'
                                value={this.state.email}
                                onChange={(e) => this.setState({ email: e.target.value })}
                                type='email'
                                placeholder='Your email address'
                            />
                        </div>
                        {!this.state.login &&
                            <div className='form-group'>
                                <label for='userName'>Username</label>
                                <input 
                                    id='userName' 
                                    class='form-control' 
                                    value={this.state.name}
                                    onChange={(e) => this.setState({ name: e.target.value })}
                                    type='text'
                                    placeholder='Your name'
                                />
                            </div>
                        }
                        <div className='form-group'>
                            <label for='userPassword'>Password</label>
                            <input 
                                id='userPassword'
                                class='form-control'
                                type='password'
                                value={this.state.password}
                                onChange={(e) => this.setState({ password: e.target.value })}
                                type='password'
                                placeholder='Choose a safe password' 
                            />
                        </div>
                        <button type='submit' class='btn btn-default'>Submit</button>
                    </form>
                </div>
                <div className="col-xs-12 col-md-4 col-md-offset-4">
                    <div
                        className='pointer mr2 button'
                        onClick={() => this._confirm()}
                    >
                        {this.state.login ? 'login' : 'create account'}
                    </div>
                    <div
                        className='pointer button'
                        onClick={() => this.setState({ login: !this.state.login })}
                    >
                        {this.state.login ? 'need to create an account?' : 'already have an account?'}
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUp;

// email
    // make sure email not taken
    // make sure proper email
    // can we send email confirmation?
// username
    // make sure username isn't already taken
// password
    // show password toggle
    // no spaces

 // add graphcool email + pw auth
// add graphcool facebook auth
