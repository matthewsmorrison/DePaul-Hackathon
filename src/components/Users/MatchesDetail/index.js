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


        <div className="bg-light">
          <div className="container u-space-2-top pb-3" text-align= "center">
            <div className="mb-5" >
              <div className="bg-white p-4" margin= "20px 0">
                   <h1 className="h3 text-primary text-underline font-weight-normal mb-4">Congratulations, you have a match.</h1>

                <h4>
                  Your host
                </h4>

                <div>  
                <img style={{maxWidth: "80px", borderRadius: '50%' }}className="card-img-top pull-right" src="../../assets/img/anna-host.png" alt="Card image cap"/>
                </div>

                <h3 clasName="d-flex  justify-content-center">
                  {this.state.name}
                </h3>
       
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </p>

                <p>
                  Lorem ipsum dolor sit amet
                </p>              

                <h4 className="mt-6">
                  Your room
                </h4>



                <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
                  <div class="carousel-inner">
                    <div class="carousel-item active">
                      <img class="d-block w-100" src="../../assets/img/room1.jpg" alt="First slide"/>
                    </div>
                    <div class="carousel-item">
                      <img class="d-block w-100" src="../../assets/img/room2.jpg" alt="Second slide"/>
                    </div>
                    <div class="carousel-item">
                      <img class="d-block w-100" src="../../assets/img/room3.jpg" alt="Second slide"/>
                    </div>
                  </div>
                </div>


                <h4 className="mt-6">
                  Get to  {this.state.name}s house
                </h4>

                <div>
                <a href={"https://www.google.com/maps/dir/?api=1&origin="+ this.state.userLatitude +"," + this.state.userLongitude + "&destination=" + this.state.hostLatitude + "," + this.state.hostLongitude + "&travelmode=walking"} target="_blank">
                  <img style={{maxWidth: "297px" }} src="../../assets/img/map-matching.png" alt="Card image cap"/>
                </a>
                </div>
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
                <a href={"https://www.google.com/maps/dir/?api=1&origin="+ this.state.userLatitude +"," + this.state.userLongitude + "&destination=" + this.state.hostLatitude + "," + this.state.hostLongitude + "&travelmode=walking"} target="_blank">Walking</a>
                <a href={"https://www.google.com/maps/dir/?api=1&origin="+ this.state.userLatitude +"," + this.state.userLongitude + "&destination=" + this.state.hostLatitude + "," + this.state.hostLongitude + "&travelmode=bicycling"} target="_blank">Bicycling</a>
                <a href={"https://www.google.com/maps/dir/?api=1&origin="+ this.state.userLatitude +"," + this.state.userLongitude + "&destination=" + this.state.hostLatitude + "," + this.state.hostLongitude + "&travelmode=driving"} target="_blank">Driving</a>

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
