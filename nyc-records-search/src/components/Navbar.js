import React, { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import crest from "./crest.svg";
import nyc from "./CROL-logo-md3.png"

// import 'react-bootstrap';
// import { Button, Modal } from 'react-bootstrap';

class Navbar extends Component {

  render() {
   // console.log({nav : this.props})
    return <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <a className="navbar-brand" href="http://tlukemcdonald.com" rel="noopener noreferrer" target="_blank">
            <img src={crest} alt="Luke's Portfolio" title="Luke's Portfolio" height="60" width="60" />
          </a>
          <img src={nyc} alt="Citywide Administrative Service" title="Citywide Administrative Service" height="60" width="200" />

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-item nav-link" href="/">
                Home <span className="sr-only">(current)</span>
              </a>

              <a className="nav-item nav-link" href="/userProfile">
                Favorites
              </a>

              <a className="nav-item nav-link" href="/search">
                Search
              </a>

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Select Section
                </a>
                <div className="dropdown-menu bg-dark" aria-labelledby="navbarDropdownMenuLink">
                  <Link className="nav-item nav-link" onClick={e => this.props.setSection("Public Hearings and Meetings", e)} to="/public">
                    Public Hearings and Meetings
                  </Link>

                  <Link className="nav-item nav-link" onClick={e => this.props.setSection("Procurement", e)} to="/procurement">
                    Procurement
                  </Link>
                  <Link className="nav-item nav-link" onClick={e => this.props.setSection("Contract Award Hearings", e)} to="/award">
                    Contract Award Hearings
                  </Link>
                  <Link className="nav-item nav-link" onClick={e => this.props.setSection("Agency Rules", e)} to="/rules">
                    Agency Rules
                  </Link>
                  <Link className="nav-item nav-link" onClick={e => this.props.setSection("Property Disposition", e)} to="/property">
                    Property Disposition
                  </Link>
                  <Link className="nav-item nav-link" onClick={e => this.props.setSection("Court Notices", e)} to="/court">
                    Court Notices
                  </Link>
                  <Link className="nav-item nav-link" onClick={e => this.props.setSection("Special Materials", e)} to="/materials">
                    Special Materials
                  </Link>
                  <Link className="nav-item nav-link" onClick={e => this.props.setSection("Changes in Personnel", e)} to="/personnel">
                    Changes in Personnel
                  </Link>
                </div>
              </li>
            </div>
          </div>
        </nav>
      </div>; 
  }
}

export default Navbar;
