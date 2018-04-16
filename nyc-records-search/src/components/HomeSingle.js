import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../App.css"

class HomeSingle extends Component {
   
    render() { 
       // console.log({"HomeSingle":this.props})

        return <div className="card bg-info">
            <div className="card-body">
              <Link to={this.props.newPath} onClick={e => this.props.setSection(this.props.section, e)} style={{ textDecoration: "none" }}>
                <h5 className="card-title text-warning ">
                  {" "}
                  {this.props.section} <br />
                </h5>
                <p className="card-text text-white">
                  {this.props.text}
                </p>
              </Link>
            </div>
          </div>;
    }
}
 
export default HomeSingle;