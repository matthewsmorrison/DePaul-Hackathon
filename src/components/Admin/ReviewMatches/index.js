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

    this.approve = this.approve.bind(this);
  }

  approve(uid) {
    this.props.firebase.match(uid).update({
      isApproved: true,
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

        <div className="bg-light">
          <div className="container u-space-2-top pb-3">
            <div className="mb-5">
              <div className="bg-white p-4">
                <h1 className="h3 text-primary font-weight-normal mb-4">Review Matches</h1>
                <div className="row">
                  <div className="col-6 border-right">
                    <img style={{maxWidth: "80px", borderRadius: '50%' }}className="card-img-top" src="../../assets/img/kristina.png" alt="Card image cap"/>
                    <h4 className="ml-4 h4 text-dark font-weight-light border-bottom d-inline">Persons Name</h4>
                  </div>
                  <div className="col-6 ">
                    <img style={{maxWidth: "80px", borderRadius: '50%' }}className="card-img-top pull-right" src="../../assets/img/anna-host.png" alt="Card image cap"/>
                    <h4 className="ml-4 h4 text-dark border-bottom font-weight-light d-inline">Persons Name</h4>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 border-right">
                    <table className="js-datatable table table-borderless u-datatable__striped u-datatable__content dataTable no-footer">
                      <thead>
                      </thead>

                      <tbody>
                        <tr role="row">
                          <td style={{textAlign: "center", verticalAlign: "middle"}}><p><span className="font-weight-bold">Age:</span> 23</p></td>
                          <td style={{textAlign: "center", verticalAlign: "middle"}}><p><span className="font-weight-bold">Sex:</span> Female</p></td>
                        </tr>
                        <tr role="row">
                          <td className="mt-1"style={{textAlign: "center", verticalAlign: "middle"}}><p><span className="font-weight-bold"><i class="fas fa-phone"></i></span> +447768996755</p></td>
                          <td style={{textAlign: "center", verticalAlign: "middle"}}><a href="#"><i class="fas fa-eye mr-1"></i>View Profile</a></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="col-6">
                    <table className="js-datatable table table-borderless u-datatable__striped u-datatable__content dataTable no-footer">
                      <thead>
                      </thead>

                      <tbody>
                        <tr role="row">
                          <td style={{textAlign: "center", verticalAlign: "middle"}}><p><span className="font-weight-bold">Age:</span> 23</p></td>
                          <td style={{textAlign: "center", verticalAlign: "middle"}}><p><span className="font-weight-bold">Sex:</span> Female</p></td>
                        </tr>
                        <tr role="row">
                          <td className="mt-1"style={{textAlign: "center", verticalAlign: "middle"}}><p><span className="font-weight-bold"><i class="fas fa-phone"></i></span> +447768996755</p></td>
                          <td style={{textAlign: "center", verticalAlign: "middle"}}><a href="#"><i class="fas fa-eye mr-1"></i>View Profile</a></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="container u-space-2-top pb-3">
                <div className="mb-5 ml-8 mr-8">
                  <div className="bg-white p-4">
                    <h4 className="ml-4 h3 text-primary font-weight-normal align-items-center d-flex justify-content-center">
                      <span className="mr-2">John </span>
                      <i class="fas fa-exchange-alt"></i>
                      <span className="ml-2"> Elisabeth</span>
                    </h4>
                    <p className="align-items-center d-flex justify-content-center">John was matched with Elisabeth!</p>

                    <table className="js-datatable table table-borderless u-datatable__striped u-datatable__content dataTable no-footer">
                      <thead>
                      </thead>

                      <tbody>
                        <tr role="row">
                          <td colspan="1" style={{textAlign: "center", verticalAlign: "middle"}}><i style={{color: '#11ff3d'}}class="mr-6 fas fa-check-circle"></i></td>
                          <td colspan="2" style={{textAlign: "center", verticalAlign: "middle"}}><strong className="mr-8">Transport: </strong></td>
                          <td colspan="6" style={{textAlign: "center", verticalAlign: "middle"}}><p>Elisabeth's house is 0.5 miles from John it will take him approximately 20 minutes on foot.</p></td>
                        </tr>
                        <tr>
                          <td colspan="3"> </td>
                          <td colspan="6" style={{textAlign: "center", verticalAlign: "middle"}}>
                            <img style={{maxWidth: "400px" }}className="card-img-top" src="../../assets/img/map_admin.png" alt="Card image cap"/>
                          </td>
                        </tr>
                        <tr role="row">
                          <td colspan="1" style={{textAlign: "center", verticalAlign: "middle"}}><i style={{color: '#11ff3d'}}class="mr-6 fas fa-check-circle"></i></td>
                          <td colspan="2" style={{textAlign: "center", verticalAlign: "middle"}}><strong className="mr-8">Safeguarding: </strong></td>
                          <td colspan="6" style={{textAlign: "center", verticalAlign: "middle"}}><p>In his application John recorded that he was homosexual, Elisabeth has an open policy on sexual orientation.</p></td>
                        </tr>
                      </tbody>
                    </table>


                  </div>
                </div>
              </div>
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
