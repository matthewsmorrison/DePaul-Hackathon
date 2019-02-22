import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../../Firebase';

const SignOut = () => (
  <div>
    <SignOutPage/>
  </div>
);

class SignOutPageBase extends Component {
  constructor(props) {

    super(props);
    this.signOut = this.signOut.bind(this);
  }

  signOut(evt) {
    this.props.firebase
    .doSignOut()
    .then(() => {
      this.props.history.push('/');
      })
      .catch(error => {
      alert(error.message);
    });
    evt.preventDefault();
  }

  render() {
    console.log(this.props);
    return (
      <main id="content" role="main">
      <div className="container u-space-2">
        <div className=" w-md-75 w-lg-50 mx-md-auto">
          <div className="mb-7">
            <h2 className="h3 text-primary font-weight-normal mb-0">Goodbye</h2>
            <p>Are you sure you want to sign out?</p>
          </div>

              <a href="javascript:void(0)" className="btn btn-primary transition-3d-hover" onClick={ evt => this.signOut(evt) }>Sign Out</a>

        </div>
      </div>
    </main>
    )
  }
}

const SignOutPage = compose(withRouter, withFirebase,)(SignOutPageBase);
export default SignOut;
export { SignOutPage }
