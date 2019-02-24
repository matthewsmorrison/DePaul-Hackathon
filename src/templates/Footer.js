import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => (
  <footer className="container">


    <div className="row u-space-2">
      <div className="col-6 col-lg-3 mb-7 mb-lg-0">

        <Link to="/" className="d-inline-block mb-3" aria-label="Front">
          <img src="../../assets/img/stopover_logo.png" alt="Logo" style={{width: "120px"}}></img>
        </Link>

        <p className="small text-muted">&copy; Stopover 2019 <br/> All rights reserved</p>

      </div>

      <div className="col-6 col-lg-3 mb-7 mb-lg-0">


      </div>

      <div className="col-6 col-lg-3 mb-7 mb-lg-0">

        <ul className="list-unstyled u-list u-list--light">

        </ul>

      </div>

    </div>
  </footer>
);
