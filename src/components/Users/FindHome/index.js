import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';
import { withFirebase } from '../../Firebase';
import { AuthUserContext, withAuthorization } from '../../Session';
import { getDateTime } from '../../../utils/timeFunctions'
import UserSignUp from '../UserSignUp';
import UserSignIn from '../UserSignIn';

const FindHome = () => (
  <div>
    <AuthUserContext.Consumer>
      { authUser => <FindHomePage authUser={authUser} /> }
    </AuthUserContext.Consumer>
  </div>
);

class FindHomePageBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stage: '0',
      firstTime: false,
    }

    this.childState = this.childState.bind(this);
    this.findHome = this.findHome.bind(this);
  }

  findHome() {
    var userID = this.props.authUser.uid;

    navigator.geolocation.getCurrentPosition(position => {
      this.props.firebase.matches().add({
        host: null,
        isActive: true,
        user: userID,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        isApproved: false,
      })

      this.setState({
        stage: '4'
      })
    });
  }

  childState(stage) {
    this.setState({stage: stage});
  }

  render() {
    console.log(this.props);
    return(
      <main id="content" role="main">


        <div className="bg-light">
          <div className="container u-space-2-top pb-3">
            <div className="mb-5">
              <div className="bg-white p-4">

              { this.state.stage === '0' && (
                <div>
                  <div className="mb-4 text-center">
                    <h1 className="h3 text-primary text-underline font-weight-normal mb-4">StopOver Services.</h1>

                    <a href="javascript:void(0)" className="btn btn-primary transition-3d-hover" onClick={() => this.setState({stage: '1'})}>I'm new to StopOver.</a>
                    <a href="javascript:void(0)" className="mt-3 btn btn-primary transition-3d-hover" onClick={() => this.setState({stage: '2'})}>I've already signed up. </a>
                  </div>
                </div>
              )}

              { this.state.stage === '1' && (
                <div>
                  <UserSignUp childState={this.childState}/>
                </div>
              )}

              { this.state.stage === '2' && (
                <div>
                  <UserSignIn childState={this.childState}/>
                </div>
              )}

              { this.state.stage === '3' && (
                <div>
                  <div className="mb-4 text-center">
                    <h1 className="h3 text-primary text-underline font-weight-normal mb-4">StopOver Services.</h1>
                  </div>

                  <div className="mb-4 text-center">
                    <a href="javascript:void(0)" className="btn btn-primary transition-3d-hover" onClick={() => this.findHome()}>I need somewhere to stay.</a>
                    <a href="javascript:void(0)" className="mt-2 btn btn-primary transition-3d-hover" onClick={() => this.setState({stage: '5'})}>I need someone to talk to.</a>
                  </div>
                </div>
              )}

              { this.state.stage === '5' && (
                <div>
                  <div className="mb-4 text-center">
                    <p>If you need any other help or services please call Depaul at or phone us at 0808 808 4994 or visit our <a href="https://uk.depaulcharity.org/get-help" target="_blank">website</a></p>
                  </div>
                </div>
              )}

              { this.state.stage === '4' && (
                <div>
                  <div className="mb-4 pb-2 text-center">
                    <h1 className="h3 text-primary text-underline font-weight-normal mb-4">StopOver Services.</h1>
                    <p>We are finding you a place to stay tonight. Depaul will text or call you within the next 2 hours.</p>
                  </div>
                  <div className="mb-4 pb-2 text-center">
                    <i class="fas fa-ellipsis-h"></i>
                  </div>

                  <div class="row">
                    <div class="col-xs-12 col-sm-6 mt-1">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">Kristina's story.</h5>
                          <p className="card-text">Kristina's life changed when she was helped by Depaul UK.</p>
                          <img className="card-img-top" src="../../assets/img/kristina.png" alt="Card image cap"/>
                          <a href="#" className="mt-2 btn btn-primary">Read more</a>
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-12 col-sm-6 mt-1">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">Celani's story.</h5>
                          <p className="card-text">Celani had nowhere to go when she was discharged from hospital.</p>
                          <img className="card-img-top" src="../../assets/img/celani.png" alt="Card image cap"/>
                          <a href="#" className="mt-2 btn btn-primary">Read more</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              )}

              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

const FindHomePage = compose(withRouter, withFirebase)(FindHomePageBase);

export default compose(
  withFirebase,
  withRouter,
)(FindHome);
