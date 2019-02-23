import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import * as aws from 'aws-sdk';
import { SES } from 'aws-sdk';
import { withFirebase } from '../../Firebase';

const UserSignUp = (props) => (
  <div>
    <UserSignUpPage props={props}/>
  </div>
);

class UserSignUpPageBase extends Component {
  constructor(props) {

    super(props);

    this.state = {
      email: '',
      emailError: true,
      name: '',
      nameError: true,
      password1: '',
      password1Error: true,
      password2: '',
      password2Error: true,
      error: '',
      stage: 0,
      triedPress: false,
    }

    this.updateState = this.updateState.bind(this);
    this.signUp = this.signUp.bind(this);
    this.clearForm = this.clearForm.bind(this);
  }

  clearForm(evt) {
   evt.preventDefault();
   let newState = this.state;
   newState = ({
     email: '',
     emailError: true,
     name: '',
     nameError: true,
     password1: '',
     password1Error: true,
     password2: '',
     password2Error: true,
     error: '',
     stage: 1,
     triedPress: false,
   });

   this.setState(newState);
 }

  signUp(evt) {
    var name = this.state.name;
    var email = this.state.email;
    var newAccount;

    if(!this.state.emailError && !this.state.nameError && !this.state.password1Error && !this.state.password2Error) {
      var authUserCredentials;

      this.props.firebase.doCreateUserWithEmailAndPassword(email, this.state.password1)
      .then(authUser => {
        authUserCredentials = authUser;

        return this.props.firebase.user(authUser.user.uid).set({
          name: name,
          email: email,
          isUser: true,
          isApprovedHost: false,
          isDepaul: false,
          isHost: false,
          lastOnline: Date.now(),
        }, {merge: true},);
      })
      .then(() => {
        this.props.props.childState('3');
      })
      .catch(error => {
        console.log(error);
        this.setState({
          email: '',
          emailError: true,
          name: '',
          nameError: true,
          password1: '',
          password1Error: true,
          password2: '',
          password2Error: true,
          error: '',
          stage: 2,
          triedPress: false,
          signature: null,
        });
      });
      evt.preventDefault();
    }

    else {
      alert("Some things are wrong on the sign-up form");
      this.setState({triedPress: true})
    }
  }

  componentDidMount() {
    console.log(this.props.firebase);
    // window.recaptchaVerifier = new this.props.firebase.auth().RecaptchaVerifier('sign-in-button', {
    //   'size': 'invisible',
    //   'callback': function(response) {
    //     // reCAPTCHA solved, allow signInWithPhoneNumber.
    //     this.props.firebase.onSignInSubmit();
    //   }
    // });
  }

  updateState(evt) {
    let target = evt.target;
    let id = target.id;
    let newState = this.state;
    // var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    function validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }

    switch (id) {

      case 'signinSrEmail':
        newState.email = target.value;
        if(!validateEmail(newState.email)) newState.emailError = true;
        else newState.emailError = false;
        break;

      case 'signinSrName':
        newState.name = target.value;
        if(newState.name === '') newState.nameError = true;
        else newState.nameError = false;
        break;

      case 'signinSrPassword':
        newState.password1 = target.value;
        if(newState.password1 === '') newState.password1Error = true;
        // else if(!strongRegex.test(newState.password1)) newState.password1Error = true
        else newState.password1Error = false;

        if(newState.password1 !== newState.password2) newState.password2Error = true;
        else newState.password2Error = false;
        break;

      case 'signinSrConfirmPassword':
        newState.password2 = target.value;
        if(newState.password2 === '') newState.password2Error = true;
        else newState.password2Error = false;

        if(newState.password1 !== newState.password2) newState.password2Error = true;
        else newState.password2Error = false;
        break;

      default:
       console.log("Not updating any state.");
    }

    this.setState(newState);
  }

  render() {
    console.log(this.props);
    if(this.state.stage === 0) {
      return (
        <div className="w-md-75 w-lg-50 mx-md-auto">
            <div className="mb-7">
              <h1 className="h3 text-primary font-weight-normal mb-4">Sign up to the Nightstop Network</h1>
              <p>Fill out the form below to start using Nightstop services.</p>
            </div>

            <div className="js-form-message form-group">
              <label className="form-label" htmlFor="signinSrEmail">Email address</label>
              <input type="email" className="form-control" name="email" id="signinSrEmail" onChange={evt => this.updateState(evt)} placeholder="Email address"></input>
              {this.state.emailError && this.state.triedPress && <div style={{display: "block"}} className="invalid-feedback">That is not a valid email address</div>}
            </div>

            <div className="js-form-message form-group">
              <label className="form-label">Name</label>
              <input type="name" className="form-control" name="name" id="signinSrName" onChange={evt => this.updateState(evt)} placeholder="Name"></input>
              {this.state.nameError && this.state.triedPress && <div style={{display: "block"}} className="invalid-feedback">That is not a valid name</div>}
            </div>

            <div className="js-form-message form-group">
              <label className="form-label" htmlFor="signinSrPassword">Password</label>
              <input type="password" className="form-control" name="password" id="signinSrPassword" onChange={evt => this.updateState(evt)} placeholder="********"></input>
              {this.state.password1Error && this.state.triedPress && <div style={{display: "block"}} className="invalid-feedback">Your password is empty</div>}
            </div>

            <div className="js-form-message form-group">
              <label className="form-label" htmlFor="signinSrConfirmPassword">Confirm password</label>
              <input type="password" className="form-control" name="confirmPassword" id="signinSrConfirmPassword" onChange={evt => this.updateState(evt)} placeholder="********"></input>
              {this.state.password2Error && this.state.triedPress && <div style={{display: "block"}} className="invalid-feedback">Your passwords do not match</div>}
            </div>

            <div className="row align-items-center mb-5">
              <div className="col-5 col-sm-6">
                <span className="small text-muted">Already have an account?</span>
                <a className="small" href="/signin"> Login</a>
              </div>

              <div className="col-7 col-sm-6 text-right">
                <button className="btn btn-primary transition-3d-hover" onClick={evt => this.signUp(evt)}>Get Started</button>
              </div>
            </div>
          </div>
      )
    }

    else {
      return (
          <div className="w-md-75 w-lg-50 mx-md-auto">
            <div className="mb-7">
              <h1 className="h3 text-primary font-weight-normal mb-0">Uh Oh!</h1>
              <p>Something went wrong, see the error message below.</p>
              <p>{this.state.error}</p>
            </div>

              <a href="/" className="btn btn-primary transition-3d-hover" onClick={ evt => this.clearForm(evt)}>Go Home</a>
          </div>
      )
    }
  }
}

const UserSignUpPage = compose(withRouter, withFirebase,)(UserSignUpPageBase);
export default UserSignUp;
export { UserSignUpPage }
