import React, { Component } from 'react';

class SingleComponent extends Component {
  constructor() {
    super()
    this.state = {
      fav: {}
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    
    this.setState({
      userFav: this.props.record[0].request_id,
      short_title: this.props.record[0].short_title
    });
    this.props.saveId({
      userFav: this.props.record[0].request_id,
      shortTitle: this.props.record[0].short_title
    });
  };

  render() {
    console.log({ "Single props": this.props });
    // let data = this.props.record[0]

    return (
      <div className="jumbotron">
        <h1> {this.props.record[0].short_title} </h1>
        <p> Agency: {this.props.record[0].agency_name} </p>
        <p> Section: {this.props.record[0].section_name} </p>
        <p> Description: {this.props.record[0].type_of_notice_description} </p>
        <p> Date: {this.props.record[0].start_date} </p>
        <p> Id: {this.props.record[0].request_id} </p>
        <button
          className="btn btn-primary"
          type="submit"
          onClick={this.handleClick}
        >
          Save
        </button>
      </div>
    );
  }
}

export default SingleComponent;