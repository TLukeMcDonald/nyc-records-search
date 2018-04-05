import React, { Component } from 'react';
import Multiselect from 'react-bootstrap-multiselect' ;
import "../App.css";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      public: false,
      procurement: false,
      award: false,
      rules: false,
      property: false,
      court: false,
      materials: false,
      personnel: false,
      selectedItems: false,
      keyword: null
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    //this.handleSubmit =  this.handleSubmit.bind(this);
  }

  handleInputChange(change) {
    const target = change.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
   
  }


  render() {
    console.log({ "Search props": this.props });
    console.log({"Search state": this.state})
    return (
      <form className="jumbotron" onSubmit={change => this.props.addFilters("put", change, this.state)}>
        <div className="row">
          <div className=" col-auto">
            <label>
              <h4 data-toggle="tooltip" data-placement="right" title="Each word is searched seperately"> Keywords: </h4>
              <input
                name="keyword"
                type="text"
                value={this.state.keywords}
                onChange={this.handleInputChange}
                data-toggle="tooltip" 
                data-placement="right" 
                title="Each word is searched seperately"
              />
            </label>
            <br />

            <h4> Include Sections </h4>
            <label>
              {" "}
              Public Hearings and Meetings:{" "}
              <input
                name="public"
                type="checkbox"
                checked={this.state.public}
                onChange={this.handleInputChange}
              />{" "}
            </label>
            <br />
            <label>
              {" "}
              Procurement:{" "}
              <input
                name="procurement"
                type="checkbox"
                checked={this.state.procurement}
                onChange={this.handleInputChange}
              />{" "}
            </label>
            <br />
            <label>
              {" "}
              Contract Award Hearings:{" "}
              <input
                name="award"
                type="checkbox"
                checked={this.state.award}
                onChange={this.handleInputChange}
              />{" "}
            </label>
            <br />
            <label>
              {" "}
              Agency Rules:{" "}
              <input
                name="rules"
                type="checkbox"
                checked={this.state.rules}
                onChange={this.handleInputChange}
              />{" "}
            </label>
            <br />
            <label>
              {" "}
              Property Disposition:{" "}
              <input
                name="property"
                type="checkbox"
                checked={this.state.property}
                onChange={this.handleInputChange}
              />{" "}
            </label>
            <br />
            <label>
              {" "}
              Court Notices:{" "}
              <input
                name="court"
                type="checkbox"
                checked={this.state.court}
                onChange={this.handleInputChange}
              />{" "}
            </label>
            <br />
            <label>
              {" "}
              Special Materials:{" "}
              <input
                name="materials"
                type="checkbox"
                checked={this.state.materials}
                onChange={this.handleInputChange}
              />{" "}
            </label>
            <br />
            <label>
              {" "}
              Changes in Personnel:{" "}
              <input
                name="personnel"
                type="checkbox"
                checked={this.state.personnel}
                onChange={this.handleInputChange}
              />{" "}
            </label>
            <br />
          </div>
          {/* <div className="col-auto">
                <h4> Search by Agenies  </h4>

                {this.props.agencies ? (
                <Multiselect
                    data={this.props.agencies.map( name => { return { label: name.agency_name, value: name.agency_name }; })}
                    multiple
                    ref="myRef"
                    className="dropdown-menu"
                    //onChange={this.handleChange}
                    />
                ):(
                <p>...Loading</p>
                )}
            </div> */}
        </div>
        <div className="row justify-content-md-center">
          <input type="submit" value="Search" />
        </div>
      </form>
    );
  }
}
 
export default Search;
