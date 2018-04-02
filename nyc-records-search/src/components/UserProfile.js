import React, { Component } from "react";
import { Link } from "react-router-dom";
 

class UserProfile extends Component {
  
  render() {
    console.log({"User Profile loaded": this.props})

    return <div className="jumbotron">

        <h1> {this.props.userName}'s Favorites</h1>
        {this.props.favs.map(fav => { return  <div>
          <p>  {fav.userFav}  {" | "}
          {fav.shortTitle} <button type="button"  class="btn btn-secondary btn-sm">
            Delete
          </button></p>
          </div>
        })

      } 

      <Link to="/">Home</Link>
    </div>;
  }
}

export default UserProfile;
