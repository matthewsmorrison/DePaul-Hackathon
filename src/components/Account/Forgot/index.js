import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../../Firebase';

const Forgot = () => (
  <div>
    <ForgotPage/>
  </div>
);

class ForgotPageBase extends React.Component {
  constructor(props) {

    super(props);

    this.state = {
      email: '',
      error: null
    }

    this.updateState = this.updateState.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
  }

  forgotPassword(evt) {
    this.props.firebase
    .doPasswordReset(this.state.email)
    .then(() => {
      this.setState({
        email: '',
        error: null
      });

      this.props.history.push('/');
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
            <h1 className="h3 text-primary font-weight-normal mb-0">Forgot your <span className="font-weight-semi-bold">password?</span></h1>
            <p>Enter your email address below and we'll get you back on track.</p>
          </div>

          <div className="js-form-message form-group">
            <label className="form-label">Email address</label>
            <input type="email" className="form-control" name="email" id="signinSrEmail" placeholder="Email address" onChange={evt => this.updateState(evt)}></input>
          </div>


          <div className="row align-items-center mb-5">
            <div className="col-4 col-sm-6">
              <a className="small link-muted" href="/signin">Back to sign in</a>
            </div>

            <div className="col-8 col-sm-6 text-right">
              <a href="javascript:void(0)" className="btn btn-primary transition-3d-hover" onClick={ evt => this.forgotPassword(evt)}>Request Reset Link</a>
            </div>

          </div>
        </div>
      </div>
    </main>
    )
  }
}

const ForgotPage = compose(withRouter, withFirebase,)(ForgotPageBase);
export default Forgot;
export { ForgotPage }
