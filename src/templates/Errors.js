import React from 'react';
import { Link } from 'react-router-dom';

export const _404 = () => (
  <main id="content" role="main">

    <div className="d-flex align-items-center u-bg-img-hero u-space-4 min-height-100vh--lg" style={{backgroundImage: "url(../../assets/svg/flat-icons/error-404-flat-concept-illustration.svg)"}}>
      <div className="container">
        <div className="w-lg-60 w-xl-50">

          <div className="mb-5">
            <h1 className="text-primary font-weight-normal">Page not <span className="font-weight-bold">found</span></h1>
            <p className="mb-0">Oops! Looks like you followed a bad link.</p>
            <p>If you think this is a problem with us, please <Link to="/contact_us" >tell us</Link>.</p>
          </div>
          <Link to="/" className="btn btn-primary u-btn-primary u-btn-wide transition-3d-hover">Go Home</Link>
        </div>
      </div>
    </div>

  </main>
);
