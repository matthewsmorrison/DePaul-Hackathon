import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';
import { withFirebase } from '../../Firebase';
import { AuthUserContext, withAuthorization } from '../../Session';
import { getDateTime } from '../../../utils/timeFunctions'

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


        <div className="bg-light">
         <div className="container u-space-2-top pb-3">
           <div className="mb-5">
              <div className="bg-white p-4">
              <h4 className="mb-4 ml-4 h3 text-primary font-weight-normal align-items-center d-flex justify-content-center">
                <span className="mr-2">Review All Matches</span>
              </h4>
                <div className="table-responsive-md u-datatable">
                  <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper no-footer">
                    <table className="js-datatable table table-borderless u-datatable__striped u-datatable__content dataTable no-footer">
                      <thead>
                        <tr role="row">
                          <th scope="col" style={{textAlign: "center", verticalAlign: "middle"}}>User</th>
                          <th scope="col" style={{textAlign: "center", verticalAlign: "middle"}}>Host</th>
                          <th scope="col" style={{textAlign: "center", verticalAlign: "middle"}}>Date</th>
                          <th scope="col" style={{textAlign: "center", verticalAlign: "middle"}}>City</th>
                          <th scope="col" style={{textAlign: "center", verticalAlign: "middle"}}>Review</th>
                        </tr>
                    </thead>

                    <tbody>
                    {this.state.matches.map(function(object, index) {
                        return<tr key={index} className={index%2 ? "text-seconary odd" : "text-seconary even"} style={{fontSize: "0.95rem", paddingBottom: "20px"}}>
                                <td style={{textAlign: "center", verticalAlign: "middle"}}>{object.user}</td>
                                <td style={{textAlign: "center", verticalAlign: "middle"}}>{object.host === undefined ? "No Matched Host" : object.host}</td>
                                <td style={{textAlign: "center", verticalAlign: "middle"}}>23/02/2019</td>
                                <td style={{textAlign: "center", verticalAlign: "middle"}}>London</td>
                                <td style={{textAlign: "center", verticalAlign: "middle"}}>
                                  <a href={"/review/"+object.uid}>Review</a>
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
