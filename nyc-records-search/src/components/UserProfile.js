import React, { Component } from "react";
import { Link } from "react-router-dom";
 

class UserProfile extends Component {
  
  render() {
    console.log({"User Profile loaded": this.props})

    return <div className="jumbotron">
        <h1> {this.props.userName}'s Favorites</h1>
        {this.props.favsLoaded ? (this.props.favs.map(fav => {
            return <div key={fav.id}>
                <p>
                  {" "}
                  {fav.userFav} {" | "}
                  <Link to="/single"> {fav.shortTitle} </Link>
                  <button type="button" onClick={() => this.props.deleteFav(fav.id, fav.index)} className="btn btn-secondary btn-sm">
                    Delete
                  </button>
                </p>
              </div>;
        })
          ) : (<p>... Loading</p>) }
        
        <Link to="/">Home</Link>
      </div>;
  }
}

export default UserProfile;
