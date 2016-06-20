"use strict";
import React from "react";
import LoginAction from "../actions/LoginAction";
import LoginStore from "../stores/LoginStore";

export default class extends React.Component {
	render() {
		let logout = (this.props.isLoggedIn ? <li><a onClick={this._logout.bind(this)}><button className="btn btn-danger">LOGOUT</button></a></li> : " ");
		return (
			<header>
				<div className="navbar navbar-inverse navbar-fixed-top">
					<div className="container-fluid">
						<div className="navbar-header">
							<a href="/" className="navbar-brand">
								Lecture Viewer
							</a>
							<button type="button" className="navbar-toggle" data-toggle="collapse"
											data-target=".navbar-collapse">
								<span className="sr-only">Toggle Navigation</span>
								<span className="icon-bar"/>
								<span className="icon-bar"/>
								<span className="icon-bar"/>
							</button>
						</div>
						<ul className="nav navbar-nav navbar-right collapse navbar-collapse">
							<li><a href="/">
								<button className="btn btn-danger">ABOUT</button>
							</a></li>
							<li><a href="#">
								<button className="btn btn-danger">TEAM</button>
							</a></li>
							<li><a href="#">
								<button className="btn btn-danger">CONTACT</button>
							</a></li>
							{logout}
						</ul>
					</div>
				</div>
			</header>
		);
	}

	_logout(event) {
		event.preventDefault();
		LoginAction.logout();
	}
}