import React from 'react';

export const WhatWeDo = () => (
  <div className="bg-light u-space-2-bottom">
  <div className="container u-space-2-top">
  <br/>
    <div className="w-md-80 w-lg-100 text-center mx-auto mb-9">
        <span className="u-label u-label--sm u-label--primary mb-2">What We Do</span>
      <h3 style={{marginTop: "10px"}}>Providing Homes For Those In Need</h3>
      <p>StopOver provides an immediate place to stay for those in the most need.</p>
    </div>

    <div className="row">
      <div className="col-md-4 mb-7">
        <div className="text-center px-lg-3">
          <span className="u-icon u-icon-danger--air u-icon--xl rounded-circle mb-7">
            <span className="fas fa-user-circle u-icon__inner u-icon__inner-bottom-minus"></span>
          </span>
          <h3 className="h5">Personalised Support</h3>
          <p className="mb-md-0">Tell us any preferences you have and you will be matched with an appropriate host.</p>
        </div>
      </div>

      <div className="col-md-4 mb-7">
        <div className="text-center px-lg-3">
          <span className="u-icon u-icon-primary--air u-icon--xl rounded-circle mb-7">
            <span className="far fa-clock u-icon__inner u-icon__inner-bottom-minus"></span>
          </span>
          <h3 className="h5">Depaul Approved</h3>
          <p className="mb-md-0">All hosts have been vetted and approved by Depaul</p>
        </div>
      </div>

      <div className="col-md-4 mb-7">
        <div className="text-center px-lg-3">
          <span className="u-icon u-icon-success--air u-icon--xl rounded-circle mb-7">
            <span className="fas fa-phone u-icon__inner u-icon__inner-bottom-minus"></span>
          </span>
          <h3 className="h5">Notifications by Text</h3>
          <p className="mb-md-0">All notifications will be sent straight to your mobile phone as quickly as possible.</p>
        </div>
      </div>
    </div>
  </div>
  </div>

);
