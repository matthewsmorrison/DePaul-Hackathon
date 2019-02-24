import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';
import { withFirebase } from '../../Firebase';
import { AuthUserContext, withAuthorization } from '../../Session';
import { getDateTime } from '../../../utils/timeFunctions'
import axios from 'axios';

const MatchDetail = () => (
  <div>
    <AuthUserContext.Consumer>
      { authUser => <MatchDetailPage authUser={authUser} /> }
    </AuthUserContext.Consumer>
  </div>
);

class MatchDetailPageBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: true,
    }

    this.approve = this.approve.bind(this);
  }

  approve(uid) {

    this.setState({view: false})
    // var body = {
    //   host: 'Elisabeth Campbell',
    //   address: 'W1F 8JB',
    //   link: 'https://depaul-hackathon.firebaseapp.com/',
    //   receiver: '+447746731969'
    // };
    //
    // axios({
    //     method: 'post',
    //     url: 'https://us-central1-depaul-hackathon.cloudfunctions.net/sendText',
    //     data: JSON.stringify(body),
    //     config: {
    //       headers: {
    //         'Content-Type': 'application/json',
    //       }
    //     }
    //   })
    //   .then(function (response) {
    //     //handle success
    //     console.log(response);
    //   })
    //   .catch(function (response) {
    //     //handle error
    //     console.log(response);
    //   });
  }

  render() {
    console.log(this.props);
    return(
      <main id="content" role="main">


        <div className="bg-light">
         <div className="container u-space-2-top pb-3">
           <div className="mb-5">

            <div className="bg-white p-4">
            <h4 className="ml-4 h3 text-primary font-weight-normal align-items-center d-flex justify-content-center">
              <span className="mr-2">John's Stay with Lizzy (24th February 2019) </span>
            </h4>
            <br/>
              <div className="row">
                <div className="col-6 border-right">
                <h4 className="ml-4 h3 text-primary font-weight-normal align-items-center d-flex justify-content-center">
                  <span className="mr-2">User</span>
                  <br/><br/>
                </h4>
                  <img style={{maxWidth: "80px", borderRadius: '50%' }}className="card-img-top" src="../../assets/img/person.png" alt="Card image cap"/>
                  <h4 className="ml-4 h4 text-dark font-weight-light border-bottom d-inline">John</h4>
                </div>
                <div className="col-6">
                <h4 className="ml-4 h3 text-primary font-weight-normal align-items-center d-flex justify-content-center">
                  <span className="mr-2">Host</span>
                  <br/><br/>
                </h4>
                  <img style={{maxWidth: "80px", borderRadius: '50%' }}className="card-img-top pull-right" src="../../assets/img/anna-host.png" alt="Card image cap"/>
                  <h4 className="ml-4 h4 text-dark border-bottom font-weight-light d-inline">Lizzy Penny</h4>
                </div>
              </div>
              <div className="row">
                <div className="col-6 border-right">
                  <table className="js-datatable table table-borderless u-datatable__striped u-datatable__content dataTable no-footer">
                    <thead>
                    </thead>

                    <tbody>
                      <tr role="row">
                        <td className="mt-1" style={{textAlign: "center", verticalAlign: "middle"}}><p><span className="font-weight-bold"><i class="fas fa-phone"></i></span> +447768996755</p></td>
                        <td style={{textAlign: "center", verticalAlign: "middle"}}><a href="#"><i class="far fa-plus-square mr-1"></i>Add Profile</a></td>
                      </tr>
                      <tr role="row">
                      <td className="mt-1"style={{textAlign: "center", verticalAlign: "middle"}}></td>
                      <td style={{textAlign: "center", verticalAlign: "middle"}}></td>
                      </tr>
                    </tbody>
                  </table>
                  <br/>
                  <br/>
                    <p style={{fontWeight: "bold"}}>Safeguarding Considerations:</p>
                    <p>John would rather stay with in a LGBTQ friendly household. <br/>There are no other considerations that John finds important.</p>
                </div>
                <div className="col-6">
                  <table className="mb-4 js-datatable table table-borderless u-datatable__striped u-datatable__content dataTable no-footer">
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

                  <p style={{fontWeight: "bold"}}>Safeguarding Considerations:</p>
                  <p>Lizzy has a completely open household. There are no issues regarding sexual orientation, religion, mental health or gender.</p>

                </div>


              </div>
              <br/>


              <table className="js-datatable table table-borderless u-datatable__striped u-datatable__content dataTable no-footer">
                <thead>
                </thead>

                <tbody>
                  <tr role="row">
                    <td colspan="1" style={{textAlign: "center", verticalAlign: "middle"}}><i style={{color: '#11ff3d'}}class="mr-6 fas fa-check-circle"></i></td>
                    <td colspan="2" style={{textAlign: "center", verticalAlign: "middle"}}><strong className="mr-8">Transport: </strong></td>
                    <td colspan="6" style={{textAlign: "center", verticalAlign: "middle"}}><p>Lizzy's house is 0.5 miles from John it will take him approximately 20 minutes on foot.</p></td>
                  </tr>
                  <tr>
                    <td colspan="1"> </td>
                    <td colspan="6" style={{textAlign: "center", verticalAlign: "middle"}}>
                      <img style={{maxWidth: "300px" }}className="card-img-top" src="../../assets/img/map_admin.png" alt="Card image cap"/>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="col-12 mb-4 text-center">

                {this.state.view && <a href="javascript:void(0)" className="btn btn-primary transition-3d-hover mr-3" onClick={ evt => alert('review match') }>Match Not Appropriate - See Another</a> }
                {this.state.view && <a href="javascript:void(0)" className="btn btn-primary transition-3d-hover mr-3" onClick={ evt => alert('review match') }>User Not Appropriate</a>}
                {this.state.view && <a href="javascript:void(0)" className="btn btn-primary transition-3d-hover" onClick={ () => this.approve() }>Approve</a> }
                {!this.state.view && <a href="javascript:void(0)" className="btn btn-soft-primary transition-3d-hover" onClick={ () => this.approve() }>Approved!</a> }
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

const MatchDetailPage = compose(withRouter, withFirebase)(MatchDetailPageBase);

export default compose(
  withAuthorization(condition),
  withFirebase,
  withRouter,
)(MatchDetail);
