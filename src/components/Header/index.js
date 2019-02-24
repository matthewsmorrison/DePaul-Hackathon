import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { AuthUserContext } from '../Session';

const Header = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <HeaderAuth authUser={authUser} /> : <HeaderNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);

class HeaderAuth extends Component {
  render() {
    return(
      <div>
        <header id="header" className="u-header u-header--abs-top-md u-header--show-hide-md">
          <div className="u-header__section">
            <div className="container u-header__hide-content pt-2">
              <div className="d-flex align-items-center mb-0">

              </div>
            </div>

            <div id="logoAndNav" className="container">
              <nav className="js-mega-menu navbar navbar-expand-md u-header__navbar">
                <Link to="/" className="navbar-brand u-header__navbar-brand u-header__navbar-brand-top-space" aria-label="Front"><img src="../../assets/svg/logos/stopover_logo.png" style={{width:"90%"}} alt="Logo"></img></Link>
                <button type="button" className="navbar-toggler btn u-hamburger"
                        aria-label="Toggle navigation"
                        aria-expanded="false"
                        aria-controls="navBar"
                        data-toggle="collapse"
                        data-target="#navBar">
                  <span id="hamburgerTrigger" className="u-hamburger__box">
                    <span className="u-hamburger__inner"></span>
                  </span>
                </button>

                <div id="navBar" className="collapse navbar-collapse py-0">
                  <ul className="navbar-nav u-header__navbar-nav ml-lg-auto">

                {this.props.authUser.isDepaul && (
                  <li className="nav-item u-header__nav-item"
                    data-event="hover"
                    data-animation-in="slideInUp"
                    data-animation-out="fadeOut">
                  <a href="/" id="blogMegaMenu" className="nav-link u-header__nav-link">
                    Review Users
                    <span className="fa u-header__nav-link-icon"></span>
                  </a>
                 </li>
               )}

                {this.props.authUser.isDepaul && (
                  <li className="nav-item u-header__nav-item"
                    data-event="hover"
                    data-animation-in="slideInUp"
                    data-animation-out="fadeOut">
                  <a href="/reviewhosts" id="blogMegaMenu" className="nav-link u-header__nav-link">
                    Review Hosts
                    <span className="fa u-header__nav-link-icon"></span>
                  </a>
                 </li>
               )}

               {this.props.authUser.isDepaul && (
                 <li className="nav-item u-header__nav-item"
                   data-event="hover"
                   data-animation-in="slideInUp"
                   data-animation-out="fadeOut">
                 <a href="/reviewmatches" id="blogMegaMenu" className="nav-link u-header__nav-link">
                   Review Matches
                   <span className="fa u-header__nav-link-icon"></span>
                 </a>
                </li>
              )}

              {this.props.authUser.isApprovedHost && (
                <li className="nav-item u-header__nav-item"
                  data-event="hover"
                  data-animation-in="slideInUp"
                  data-animation-out="fadeOut">
                <a href="/myguests" id="blogMegaMenu" className="nav-link u-header__nav-link">
                  My Guests
                  <span className="fa u-header__nav-link-icon"></span>
                </a>
               </li>
             )}

             {this.props.authUser.isUser && (
               <li className="nav-item u-header__nav-item"
                 data-event="hover"
                 data-animation-in="slideInUp"
                 data-animation-out="fadeOut">
               <a href="/findhome" id="blogMegaMenu" className="nav-link u-header__nav-link">
                 Find Home
                 <span className="fa u-header__nav-link-icon"></span>
               </a>
              </li>
            )}


               <li className="nav-item u-header__nav-item"
                 data-event="hover"
                 data-animation-in="slideInUp"
                 data-animation-out="fadeOut">
               <a href="/signout" id="blogMegaMenu" className="nav-link u-header__nav-link">
                 Sign-Out
                 <span className="fa u-header__nav-link-icon"></span>
               </a>
              </li>



                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </header>
      </div>
    )
  }
}

class HeaderNonAuth extends Component {
  render() {
    return (
      <div>
        <header id="header" className="u-header u-header--abs-top-md u-header--show-hide-md">
          <div className="u-header__section">
            <div className="container u-header__hide-content pt-2">
              <div className="d-flex align-items-center mb-0">

              </div>
            </div>

            <div id="logoAndNav" className="container">
              <nav className="js-mega-menu navbar navbar-expand-md u-header__navbar">
                <Link to="/" className="navbar-brand u-header__navbar-brand u-header__navbar-brand-top-space" aria-label="Front"><img src="../../assets/img/stopover_logo.png" style={{width:"90%"}} alt="Logo"></img></Link>
                <button type="button" className="navbar-toggler btn u-hamburger"
                        aria-label="Toggle navigation"
                        aria-expanded="false"
                        aria-controls="navBar"
                        data-toggle="collapse"
                        data-target="#navBar">
                  <span id="hamburgerTrigger" className="u-hamburger__box">
                    <span className="u-hamburger__inner"></span>
                  </span>
                </button>

                <div id="navBar" className="collapse navbar-collapse py-0">
                  <ul className="navbar-nav u-header__navbar-nav ml-lg-auto">

                  <li className="nav-item u-header__nav-item"
                    data-event="hover"
                    data-animation-in="slideInUp"
                    data-animation-out="fadeOut">
                  <a href="/findhome" id="blogMegaMenu" className="nav-link u-header__nav-link">
                    Find Home
                    <span className="fa u-header__nav-link-icon"></span>
                  </a>
                 </li>

                  <li className="nav-item u-header__nav-item"
                    data-event="hover"
                    data-animation-in="slideInUp"
                    data-animation-out="fadeOut">
                  <a href="/hostsignin" id="blogMegaMenu" className="nav-link u-header__nav-link">
                    Host/Depaul Sign-In
                    <span className="fa u-header__nav-link-icon"></span>
                  </a>
                 </li>

                 <li className="nav-item u-header__nav-item"
                   data-event="hover"
                   data-animation-in="slideInUp"
                   data-animation-out="fadeOut">
                 <a href="/hostsignup" id="blogMegaMenu" className="nav-link u-header__nav-link">
                   Become A Host
                   <span className="fa u-header__nav-link-icon"></span>
                 </a>
                </li>

                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </header>
      </div>
    )
  }
}

export default Header;
export { HeaderAuth, HeaderNonAuth }
