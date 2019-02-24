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
      sexuality: '',
      religion: '',
      gender: '',
      mentalHealth: '',
      error: '',
      stage: 0,
      triedPress: false,
      sexualityActive: false,
      religionActive: false,
      genderActive: false,
      mentalHealthActive: false,
    }

    this.updateState = this.updateState.bind(this);
    this.signUp = this.signUp.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.next = this.next.bind(this);
  }

  next() {
    this.setState({stage: 1});
    window.scrollTo(0,0);
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
     sexuality: '',
     religion: '',
     gender: '',
     mentalHealth: '',
     error: '',
     stage: 1,
     triedPress: false,
   });

   this.setState(newState);
 }

  signUp(evt) {
    var name = this.state.name;
    var email = this.state.email;
    var sexuality = this.state.sexuality;
    var religion = this.state.religion;
    var gender = this.state.gender;
    var mentalHealth = this.state.mentalHealth;
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
          sexuality: sexuality,
          religion: religion,
          gender: gender,
          mentalHealth: mentalHealth,
          lastOnline: Date.now(),
        }, {merge: true},);
      })
      .then(() => {
        this.props.props.childState('3');
        this.props.props.findHome();
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
          sexuality: '',
          religion: '',
          gender: '',
          mentalHealth: '',
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

  updateState(evt) {
    let target = evt.target;
    let id = target.id;
    let newState = this.state;

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
          <div className="mb-4 text-center">
            <h1 className="h3 text-primary font-weight-normal mb-4">Accommodation Services</h1>
          </div>

          <div className="mb-3">
            <p>Stopover will help you find somewhere to stay tonight.</p>
            <br/>
            <p>Before we start looking, if there is anything we should consider to make your stay more comfortable, please let us know below.</p>
            <br/>
            <p>If you would rather talk to someone in person, then please call us at 0207 939 1220.</p>
            <hr className="my-3"/>
          </div>


          <div className="mb-3 text-center">
            <div className="row">
              <div className="col-lg-12 mb-1 mb-lg-0">
                <div style={{ borderColor: this.state.sexualityActive ? "#377dff" : "#e7eaf3", borderWidth: "1px"}} className="card p-1 mb-4">
                  <div className="card-body text-center">
                    <a href="javascript:void(0);" className="d-block text-muted" onClick={() => this.setState({sexualityActive: true, religionActive: false, genderActive: false, mentalHealthActive: false})}>Sexuality</a>
                  </div>
                </div>

                {this.state.sexualityActive &&
                  <div className="col-lg-2 mb-7 mb-lg-0 text-center">
                    <div style={{ borderColor: this.state.sexuality === "Heterosexual" ? "#377dff" : "#e7eaf3", borderWidth: "1px"}} className="card p-1 mb-1">
                      <div className="card-body text-center">
                        <a href="javascript:void(0);" onClick={() => this.setState({sexuality: "Heterosexual"})}><small className="d-block text-muted">Heterosexual</small></a>
                      </div>
                    </div>

                    <div style={{ borderColor: this.state.sexuality === "Homosexual" ? "#377dff" : "#e7eaf3", borderWidth: "1px"}} className="card p-1 mb-1">
                      <div className="card-body text-center">
                        <a href="javascript:void(0);" onClick={() => this.setState({sexuality: "Homosexual"})}><small className="d-block text-muted">Homosexual</small></a>
                      </div>
                    </div>
                  </div>
                }

                <div style={{ borderColor: this.state.religionActive ? "#377dff" : "#e7eaf3", borderWidth: "1px"}} className="card p-1 mb-4">
                  <div className="card-body text-center">
                    <a href="javascript:void(0);" className="d-block text-muted" onClick={() => this.setState({sexualityActive: false, religionActive: true, genderActive: false, mentalHealthActive: false})}>Religion</a>
                  </div>
                </div>

                {this.state.religionActive &&
                  <div className="col-lg-2 mb-7 mb-lg-0 text-center">
                    <div style={{ borderColor: this.state.religion === "Christian" ? "#377dff" : "#e7eaf3", borderWidth: "1px"}} className="card p-1 mb-1">
                      <div className="card-body text-center">
                        <a href="javascript:void(0);" onClick={() => this.setState({religion: "Christian"})}><small className="d-block text-muted">Christian</small></a>
                      </div>
                    </div>

                    <div style={{ borderColor: this.state.religion === "Muslim" ? "#377dff" : "#e7eaf3", borderWidth: "1px"}} className="card p-1 mb-1">
                      <div className="card-body text-center">
                        <a href="javascript:void(0);" onClick={() => this.setState({religion: "Muslim"})}><small className="d-block text-muted">Muslim</small></a>
                      </div>
                    </div>
                  </div>
                }

                <div style={{ borderColor: this.state.genderActive ? "#377dff" : "#e7eaf3", borderWidth: "1px"}} className="card p-1 mb-4">
                  <div className="card-body text-center">
                    <a href="javascript:void(0);" className="d-block text-muted" onClick={() => this.setState({sexualityActive: false, religionActive: false, genderActive: true, mentalHealthActive: false})}>Gender</a>
                  </div>
                </div>

                {this.state.genderActive &&
                  <div className="col-lg-2 mb-7 mb-lg-0 text-center">
                    <div style={{ borderColor: this.state.gender === "Male" ? "#377dff" : "#e7eaf3", borderWidth: "1px"}} className="card p-1 mb-1">
                      <div className="card-body text-center">
                        <a href="javascript:void(0);" onClick={() => this.setState({gender: "Male"})}><small className="d-block text-muted">Male</small></a>
                      </div>
                    </div>

                    <div style={{ borderColor: this.state.gender === "Female" ? "#377dff" : "#e7eaf3", borderWidth: "1px"}} className="card p-1 mb-1">
                      <div className="card-body text-center">
                        <a href="javascript:void(0);" onClick={() => this.setState({gender: "Female"})}><small className="d-block text-muted">Female</small></a>
                      </div>
                    </div>
                  </div>
                }

                <div style={{ borderColor: this.state.mentalHealthActive ? "#377dff" : "#e7eaf3", borderWidth: "1px"}} className="card p-1 mb-4">
                  <div className="card-body text-center">
                    <a href="javascript:void(0);" className="d-block text-muted" onClick={() => this.setState({sexualityActive: false, religionActive: false, genderActive: false, mentalHealthActive: true})}>Mental Health</a>
                  </div>
                </div>


              {this.state.mentalHealthActive &&
                <div className="col-lg-2 mb-7 mb-lg-0 text-center">
                  <div style={{ borderColor: this.state.mentalHealth === "Yes" ? "#377dff" : "#e7eaf3", borderWidth: "1px"}} className="card p-1 mb-1">
                    <div className="card-body text-center">
                      <a href="javascript:void(0);" onClick={() => this.setState({mentalHealth: "Yes"})}><small className="d-block text-muted">Yes</small></a>
                    </div>
                  </div>

                  <div style={{ borderColor: this.state.mentalHealth === "No" ? "#377dff" : "#e7eaf3", borderWidth: "1px"}} className="card p-1 mb-1">
                    <div className="card-body text-center">
                      <a href="javascript:void(0);" onClick={() => this.setState({mentalHealth: "No"})}><small className="d-block text-muted">No</small></a>
                    </div>
                  </div>
                </div>
              }

              </div>
            </div>
          </div>




          <div className="mb-3 text-center">
            <hr className="my-3"/>
            <button className="btn btn-primary transition-3d-hover" onClick={evt => this.next()}>Next</button>
          </div>
        </div>
      )
    }

    else if(this.state.stage === 1) {
      return (
        <div className="w-md-75 w-lg-50 mx-md-auto">
            <div className="mb-7">
              <h1 className="h3 text-primary font-weight-normal mb-4">We just need a few more details</h1>
            </div>

            <div className="js-form-message form-group">
              <label className="form-label" htmlFor="signinSrEmail">Phone Number</label>
              <input type="email" className="form-control" name="email" id="signinSrEmail" onChange={evt => this.updateState(evt)} placeholder="Phone Number"></input>
              {this.state.emailError && this.state.triedPress && <div style={{display: "block"}} className="invalid-feedback">That is not a valid email address</div>}
            </div>

            <div className="js-form-message form-group">
              <label className="form-label">Name</label>
              <input type="name" className="form-control" name="name" id="signinSrName" onChange={evt => this.updateState(evt)} placeholder="Name"></input>
              {this.state.nameError && this.state.triedPress && <div style={{display: "block"}} className="invalid-feedback">That is not a valid name</div>}
            </div>

            <div className="row align-items-center mb-5">
              <div className="col-5 col-sm-6">
                <span className="small text-muted">Already have an account?</span>
                <a className="small" href="/signin"> Login</a>
              </div>

              <div className="col-7 col-sm-6 text-right">
                <button className="btn btn-primary transition-3d-hover" onClick={evt => this.props.props.findHome()}>Find Home</button>
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
