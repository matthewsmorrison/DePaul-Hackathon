import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../../Firebase';

const HostSignIn = () => (
  <div>
      <HostSignInPage/>
  </div>
);

class HostSignInPageBase extends Component {
  constructor(props) {

    super(props);

    this.state = {
      email: '',
      password: '',
      error: null
    }

    this.updateState = this.updateState.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  signIn(evt) {
    this.props.firebase
    .doSignInWithEmailAndPassword(this.state.email,this.state.password)
    .then(() => {
      this.props.firebase.auth.currentUser.getIdToken();
    })
    .then(() => {
      this.setState({
        email: '',
        password: '',
        error: null
      });
      return this.props.firebase.user(this.props.firebase.auth.currentUser.uid).get()
    })
    .then(userInfo => {
      if(userInfo.data().isUser) this.props.history.push('/findhome');
      else this.props.history.push('/');
    })
    .then(() => {
      return this.props.firebase.user(this.props.firebase.auth.currentUser.uid).update({
        lastOnline: Date.now()
      });
    })
      .catch(error => {
      alert(error.message);
      this.setState({
        error: error.message
      });
    });
    evt.preventDefault();
  }

  updateState(evt) {
    let target = evt.target;
    let id = target.id;
    let newState = this.state;

    switch (id) {

      case 'signinSrEmail':
        newState.email = target.value;
        break;

      case 'signinSrPassword':
        newState.password = target.value;
        break;

      default:
       console.log("Not updating any state.");
    }

    this.setState(newState);
  }

  render() {
    return (
      <main id="content" role="main">
      <div className="container u-space-2">
        <div className=" w-md-75 w-lg-50 mx-md-auto">
          <div className="mb-7">
            <h2 className="h3 text-primary font-weight-normal mb-0">Welcome <span className="font-weight-semi-bold">back</span></h2>
            <p>Login to manage your account.</p>
          </div>
          <div className="js-form-message form-group">
            <label className="form-label">Email address</label>
            <input type="email" className="form-control" name="email" id="signinSrEmail" placeholder="Email address" onChange={evt => this.updateState(evt)}></input>
          </div>

          <div className="js-form-message form-group">
            <label className="form-label">
              <span className="d-flex justify-content-between align-items-center">
                Password</span>

            </label>
            <input type="password" className="form-control" name="password" id="signinSrPassword" placeholder="********" aria-label="********" onChange={evt => this.updateState(evt)}></input>
            <a className="small" href="/forgot"> Forgot Password?</a>
          </div>

          <div className="row align-items-center mb-5">
            <div className="col-6">
              <span className="small text-muted">Don't have an account?</span>
              <a className="small" href="/signup"> Sign-Up</a>
            </div>
            <div className="col-6 text-right">
              <a href="javascript:void(0)" className="btn btn-primary transition-3d-hover" onClick={ evt => this.signIn(evt) }>Login</a>
            </div>

          </div>
        </div>
      </div>
    </main>
    )
  }
}

const HostSignInPage = compose(withRouter, withFirebase,)(HostSignInPageBase);
export default HostSignIn;
export { HostSignInPage }
