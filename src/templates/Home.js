import React from 'react';
import { WhatWeDo } from './WhatWeDo'

export const Home = () => (

  <main id="content" role="main">
    <div className="d-flex align-items-center position-relative u-bg-gradient-v1 u-space-4-top u-space-5-top--md u-space-0--lg min-height-100vh--lg">
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <div className="g-mb-32">
              <h1 className="display-4 font-size-48--md-down mb-3">StopOver<br/></h1>
              <p>Intelligent matching of homes for those who need them.</p>
            </div>

            <div className="d-flex align-items-center">



            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-9 col-xl-7 d-none d-lg-block position-absolute-top-right-0 pr-0" style={{marginTop: "0px"}}>
        <figure className="w-100">
          <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
               viewBox="0 0 1374.7 1083.6" style={{enableBackground:"new 0 0 1374.7 1083.6"}} xmlSpace="preserve">
            <path className="u-fill-primary" opacity=".05" d="M285.2,170.1c-94.5,8.6-181.2,57.4-235.9,134.8C-34.7,423.6-54.5,621.5,349,879.8
              c636.5,407.6,600,9.3,591.9-47.4c-0.8-5.5-1.4-11.1-2-16.6l-34.2-374.1C888.4,262,729.2,129.6,549.4,146L285.2,170.1z"/>
            <g>
              <defs>
                <path id="heroBlock1" d="M1374.7,0H687.6l-278,279.7c-150,150.9-148.1,395.3,4.4,543.8l0,0C554.1,960,774.9,968.7,925.4,843.6
                  l449.3-373.4V0z"/>
              </defs>
              <clipPath id="heroBlock2">
                <use xlinkHref="#heroBlock1"  style={{overflow:"visible"}}/>
              </clipPath>
              <g transform="matrix(1 0 0 1 0 0)" style={{clipPath:"url(#heroBlock2)"}}>
                  <image style={{overflow:"visible"}} width="750" height="750" xlinkHref="../../assets/img/chat.jpg"  transform="matrix(1.4462 0 0 1.4448 290.09 0)"></image>
              </g>
            </g>
          </svg>
        </figure>
      </div>
    </div>

    <WhatWeDo/>


  </main>

);
