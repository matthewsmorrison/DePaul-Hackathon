import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';
import { withFirebase } from '../../Firebase';
import { AuthUserContext, withAuthorization } from '../../Session';
import { getDateTime } from '../../../utils/timeFunctions'

const FindHome = () => (
  <div>
    <AuthUserContext.Consumer>
      { authUser => <FindHomePage authUser={authUser} /> }
    </AuthUserContext.Consumer>
  </div>
);

class FindHomePageBase extends Component {
  render() {
    return(
      <main id="content" role="main">
        <div className="bg-primary">
          <div className="container u-space-1-top pb-3">
            <div className="d-sm-flex justify-content-sm-between align-items-sm-center">
              <div className="mb-3 mb-sm-0">
                <h3 className="text-white font-weight-medium mb-1">Find Home</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-light">
          <div className="container u-space-2-top pb-3">
            <div className="mb-5">
              <div className="bg-white p-4">


              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }
}



const condition = authUser => authUser && authUser.isUser;

const FindHomePage = compose(withRouter, withFirebase)(FindHomePageBase);

export default compose(
  withAuthorization(condition),
  withFirebase,
  withRouter,
)(FindHome);
