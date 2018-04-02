import React, { Component } from "react";
// import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import crest from "./crest.svg";

// import 'react-bootstrap';
// import { Button, Modal } from 'react-bootstrap';

class Navbar extends Component {

  render() {
    return <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="http://tlukemcdonald.com" rel="noopener noreferrer" target="_blank">
            <img src={crest} alt="Luke's Portfolio" title="Luke's Portfolio" height="60" width="60" />
          </a>

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-item nav-link" href="/">
                Home <span className="sr-only">(current)</span>
              </a>

              <a className="nav-item nav-link" href="/userProfile">
                User Favorites
              </a>
              <a className="nav-item nav-link" onClick={e => this.props.setSection("Public Hearings and Meetings", e)} href="/public">
                Public Hearings and Meetings
              </a>
              <a className="nav-item nav-link" href="/procurement">
                Procurement
              </a>
              <a className="nav-item nav-link" href="/award">
                Contract Award Hearings
              </a>
              <a className="nav-item nav-link" href="/rules">
                Agency Rules
              </a>
              <a className="nav-item nav-link" href="/property">
                Property Disposition
              </a>
              <a className="nav-item nav-link" href="/court">
                Court Notices
              </a>
              <a className="nav-item nav-link" href="/materials">
                Special Materials
              </a>
              <a className="nav-item nav-link" href="/personnel">
                Changes in Personnel
              </a>
            </div>
          </div>
        </nav>
      </div>;
  }
}

export default Navbar;
