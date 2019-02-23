import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';
import { withFirebase } from '../../Firebase';
import { AuthUserContext, withAuthorization } from '../../Session';
import { getDateTime } from '../../../utils/timeFunctions';
import axios from 'axios';

const ReviewMatches = () => (
  <div>
    <AuthUserContext.Consumer>
      { authUser => <ReviewMatchesPage authUser={authUser} /> }
    </AuthUserContext.Consumer>
  </div>
);

class ReviewMatchesPageBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      matches: [],
    }

    this.approve = this.approve.bind(this);
  }

  approve(uid) {

    // this.props.firebase.match(uid).update({
    //   isApproved: true,
    // });

    var body = '{"host": "Elisabeth Campbell", "address": "W1F 8JB", "link": "https://depaul-hackathon.firebaseapp.com/", "receiver": "+447768996754"}';

    axios({
        method: 'post',
        url: 'https://us-central1-depaul-hackathon.cloudfunctions.net/sendText',
        data: body,
        config: {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      })
      .then(function (response) {
        //handle success
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
    }

  componentDidMount() {
    this.props.firebase.matches().onSnapshot(snapshot => {
      if(snapshot.size) {
        let matches = [];
        let user;
        let host;
        let match;

        snapshot.forEach(function(doc) {
          match = {};
          if(doc.data().isActive && !doc.data().isApproved) {
            console.log(doc.data());
            this.props.firebase.user(doc.data().user).get().then(userInfo => {
              user = userInfo.data().name;

              this.props.firebase.user(doc.data().host).get().then(hostInfo => {
                if(hostInfo.data()) host = hostInfo.data().name;
                matches.push({host: host, user: user, uid: doc.id});
                this.setState({matches: matches});
              })
            })
          }

        }.bind(this))
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
                <h3 className="text-white font-weight-medium mb-1">Review All Matches</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-light">
          <div className="container u-space-2-top pb-3">
            <div className="mb-5">
              <div className="bg-white p-4">
                <div className="table-responsive-md u-datatable">
                  <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper no-footer">
                    <table className="js-datatable table table-borderless u-datatable__striped u-datatable__content dataTable no-footer">
                      <thead>
                        <tr role="row">
                          <th scope="col" style={{textAlign: "center", verticalAlign: "middle"}}>User</th>
                          <th scope="col" style={{textAlign: "center", verticalAlign: "middle"}}>Host</th>
                          <th scope="col" style={{textAlign: "center", verticalAlign: "middle"}}>Approve</th>
                          <th scope="col" style={{textAlign: "center", verticalAlign: "middle"}}>Deny</th>
                        </tr>
                      </thead>

                      <tbody>


                      {this.state.matches.map(function(object, index) {
                          return<tr key={index} className={index%2 ? "text-seconary odd" : "text-seconary even"} style={{fontSize: "0.95rem"}}>
                                  <td style={{textAlign: "center", verticalAlign: "middle"}}>{object.user}</td>
                                  <td style={{textAlign: "center", verticalAlign: "middle"}}>{object.host === undefined ? "No Matched Host" : object.host}</td>
                                  <td style={{textAlign: "center", verticalAlign: "middle"}}>
                                    <a href="javascript:void(0)" onClick={() => this.approve(object.uid)}>Approve</a>
                                  </td>

                                  <td style={{textAlign: "center", verticalAlign: "middle"}}>
                                    <a href="javascript:void(0)">Deny</a>
                                  </td>
                                </tr>
                        }.bind(this))
                      }


                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }
}



const condition = authUser => authUser && authUser.isDepaul;

const ReviewMatchesPage = compose(withRouter, withFirebase)(ReviewMatchesPageBase);

export default compose(
  withAuthorization(condition),
  withFirebase,
  withRouter,
)(ReviewMatches);
