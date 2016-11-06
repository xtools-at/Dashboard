import React from 'react';
import * as Redux from 'react-redux';
//import firebase from 'app/firebase/';
import sideNav from 'materialize-css/dist/js/materialize.min';

import * as actions from 'actions';

export var Header = React.createClass({
	componentDidMount() {
      //init sideNav
    	$(".button-collapse").sideNav();
	},

  	hideNav(){
  		$(".button-collapse").sideNav('hide');
  	},


    render() {

      return (
        <header className="navbar-fixed">
         	<nav>
			    <div className="nav-wrapper">
		      	<a href="#/" className="brand-logo"><i className="material-icons">subway</i>Ride Vienna</a>
		      	<a data-activates="nav" className="button-collapse"><i className="material-icons">menu</i><span className="sr-only">Toggle Menu</span></a>
            <a className="nav-back left hide hide-on-large-only" onClick={()=>{window.history.go(-1)}}><i className="material-icons">keyboard_arrow_left</i><span className="sr-only">Go Back</span></a>
			  		<ul className="right">
			        	<li><a className="waves-effect" title="Fork on Github" href="https://github.com/xtools-at/Ride-Vienna" target="_blank">
			        		<i className="material-icons left">code</i>
			        		<span className="hide-on-med-and-down">Fork on Github</span>
			        	</a></li>
                <li><a className="waves-effect" href="/#">
                  <i className="material-icons left">access_time</i>
                  <span className="hide-on-med-and-down">Sample Link</span>
                </a></li>
			      	</ul>
			  			<ul id="nav" className="side-nav">
				  			<li className="hide-on-large-only">
                  <div className="userView center">
							      <img className="background" src="/images/bg_nav.png" alt="" />
							      <i className="material-icons">restaurant_menu</i>
							      <span className="white-text name">Menu</span>
							     </div>
                </li>
                <li><a className="waves-effect" href="#/login"><i className="material-icons">account_circle</i>Sample Link</a></li>
                <li><div className="divider"></div></li>
                <li><a className="waves-effect" href="https://github.com/xtools-at/Ride-Vienna" target="_blank"><i className="material-icons">code</i>Fork on Github</a></li>
              </ul>
			    </div>
		  	</nav>
      </header>
    );
  }
});

export default Redux.connect(
    (state) => {
    return state;
  }
)(Header);