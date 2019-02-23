import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { withAuthentication } from '../Session';

// generic components
import Header from '../Header';
import SignOut from '../Account/SignOut';
import Forgot from '../Account/Forgot';

// user pages
import FindHome from '../Users/FindHome';
import MatchesDetail from '../Users/MatchesDetail';

// host pages
import HostSignIn from '../Hosts/HostSignIn';
import HostSignUp from '../Hosts/HostSignUp';
import MyGuests from '../Hosts/MyGuests';

// admin pages
import HostReview from '../Admin/HostReview';
import ReviewMatches from '../Admin/ReviewMatches';

// import templates
import { Home } from '../../templates/Home';
import { Footer } from '../../templates/Footer';
import { _404 } from '../../templates/Errors';

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			testing: true,
			loading: false,
			error: false,
		}
	}

	componentDidUpdate() {
		window.scrollTo(0,0);
	}

	render() {
		return (
			<Router>
			<div>
				<Header/>
				<Switch>
					<Route exact path="/" component={Home} />

					<Route path="/signout" component = {SignOut}/>

					<Route path="/forgot" component = {Forgot}/>

					{/* admin pages */}
					<Route path="/reviewhosts" component = {HostReview}/>
					<Route path="/reviewmatches" component = {ReviewMatches}/>

					{/* host pages */}
					<Route path="/hostsignin" component = {HostSignIn}/>
					<Route path="/hostsignup" component = {HostSignUp}/>
					<Route path="/myguests" component = {MyGuests}/>

					{/* user pages */}
					<Route path="/findhome" component = {FindHome}/>
					<Route exact path="/matches/:id" render={(props) => <MatchesDetail {...props}/> } />

					{/* default route: page not found */}
					<Route component={_404} />
				</Switch>

				<Footer/>

			</div>
			</Router>
		);
	}
}

export default withAuthentication(App);
