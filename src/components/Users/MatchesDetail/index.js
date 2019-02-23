import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';
import { withFirebase } from '../../Firebase';
import { AuthUserContext, withAuthorization } from '../../Session';
import { getDateTime } from '../../../utils/timeFunctions'

const MatchesDetail = (props) => (
  <div>
    <AuthUserContext.Consumer>
      { authUser => <MatchesDetailPage authUser={authUser} props={props} /> }
    </AuthUserContext.Consumer>
  </div>
);

class MatchesDetailPageBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      hostLatitude: null,
      hostLongitude: null,
      userLatitude: null,
      userLongitude: null,
    }

  }

  componentDidMount() {
    this.props.firebase.match(this.props.match.params.id).onSnapshot(doc => {
      if(doc.data().host) {
        this.setState({userLatitude: doc.data().latitude, userLongitude: doc.data().longitude})
        this.props.firebase.user(doc.data().host).get().then(details => {
          this.setState({ name: details.data().name, hostLatitude: details.data().latitude,  hostLongitude: details.data().longitude})
        })
      }
    })
  }

  render() {
    console.log(this.state);
    return(
      <main id="content" role="main">
        <div className="bg-primary">
          <div className="container u-space-1-top pb-3">
            <div className="d-sm-flex justify-content-sm-between align-items-sm-center">
              <div className="mb-3 mb-sm-0">
                <h3 className="text-white font-weight-medium mb-1">Congratulations, you have a match!</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-light">
          <div className="container u-space-2-top pb-3">
            <div className="mb-5">
              <div className="bg-white p-4">
                <p>Host Name: {this.state.name}</p>
                <p>Host Longitude: {this.state.hostLongitude}</p>
                <p>Host Latitude: {this.state.hostLatitude}</p>
                <p>User Longitude: {this.state.userLongitude}</p>
                <p>User Latitude: {this.state.userLatitude}</p>


              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

const MatchesDetailPage = compose(withRouter, withFirebase)(MatchesDetailPageBase);

export default compose(
  withFirebase,
  withRouter,
)(MatchesDetail);
