import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { withAuthentication } from '../Session';

// import components
import Header from '../Header';
import SignIn from '../Account/SignIn';
import SignOut from '../Account/SignOut';
import SignUp from '../Account/SignUp';
import Forgot from '../Account/Forgot';

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
					<Route path="/signin" component = {SignIn}/>
					<Route path="/signout" component = {SignOut}/>
					<Route path="/signup" component = {SignUp}/>
					<Route path="/forgot" component = {Forgot}/>

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
