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

    return <div className="jumbotron">
        <h1> {this.props.record[0].short_title} </h1>
        {this.props.record[0].agency_name   ?  <div> <span>{"Agency: "} {this.props.record[0].agency_name} </span>     </div>  : ("") } 
        {this.props.record[0].section_name  ?  <div> <span>{"Section: "} {this.props.record[0].section_name} </span>     </div>  : ("") } 
        {this.props.record[0].request_id    ?  <div><span>{"Id: "} {this.props.record[0].request_id} </span>  </div>: ("") }
        {this.props.record[0].pin    ?  <div> <span>{"Pin: "} {this.props.record[0].pin} </span>     </div>  : ("") } 
        {this.props.record[0].type_of_notice_description ?  <div> <span> {"Type of Notice Desc: "} {this.props.record[0].type_of_notice_description} </span>     </div>  : ("") } 
        {this.props.record[0].event_date ? <div> <span> {"Event Date: "}{this.props.record[0].event_date} </span> </div>: (" ")}
        {this.props.record[0].start_date || this.props.record[0].end_date ?  <div> <span> {"Start Date: "}{this.props.record[0].start_date} { this.props.record[0].end_date != this.props.record[0].start_date ? <span> {" End Date: "} {this.props.record[0].end_date} </span> :("") }     </span></div> : ("") }
      
      
      {this.props.record[0].category_description    ?  <div> <br /><span>{"Categort Desc: "} {this.props.record[0].category_description} </span>     </div>  : ("") } 
      {this.props.record[0].selection_method_description    ?  <div> <span>{"Selection Method: "} {this.props.record[0].selection_method_description} </span>     </div>  : ("") } 
     

      {this.props.record[0].special_case_reason_description    ?  <div> <span> {this.props.record[0].special_case_reason_description} </span>     </div>  : ("") } 
      
      {this.props.record[0].due_date    ?  <div> <span>{"Due Date: "} {this.props.record[0].due_date} </span>     </div>  : ("") } 
      {this.props.record[0].address_to_request    ?  <div> <span>{"Send to: "} {this.props.record[0].address_to_request} </span>     </div>  : ("") } 
      
      <div>
        {this.props.record[0].contact_name || this.props.record[0].contact_phone || this.props.record[0].email ?    
        <div><br /> <h6> Contact Info</h6>  
          <div> <span>{"Name: "} {this.props.record[0].contact_name} </span>  </div> 
          <div> <span>{"Phone: "} {this.props.record[0].contact_phone} </span>  </div>  
          <div> <span>{"Email: "} {this.props.record[0].email} </span>     </div> 
        </div> : ("") } 
      </div>
      
      {this.props.record[0].contact_fax    ?  <div> <span> {this.props.record[0].contact_fax} </span>     </div>  : ("") } 
      {this.props.record[0].contract_amount    ?  <div> <span> {"Contract Amount: $"}{this.props.record[0].contract_amount} </span>     </div>  : ("") } 

      
      <div>
        {this.props.record[0].street_address_1 || this.props.record[0].city || this.props.record[0].state || this.props.record[0].zip_code  ? "Address: " : ("")}
        {this.props.record[0].street_address_1    ?  ( <span> {this.props.record[0].street_address_1}{", "} </span>     ) : ("") } 
        {this.props.record[0].street_address_2    ? (<span> {this.props.record[0].street_address_2}{", "} </span>  )  : ("") } 
        {this.props.record[0].city || this.props.record[0].state || this.props.record[0].zip_code  ?  ( <span> {this.props.record[0].city}{", "}{this.props.record[0].state}{" "}{this.props.record[0].zip_code}<br />  </span> )   : ("") } 
      </div>


      <div>
        {this.props.record[0].vendor_name || this.props.record[0].vendor_address ? <span> {"Vendor: "} {this.props.record[0].vendor_name} {", "} {this.props.record[0].vendor_address}  {<br />}</span> : ("")}
      </div>



    {<br />}
      {this.props.record[0].additional_description_1    ?  <div> <span>{"Additional Desc: "}<br/> {this.props.record[0].additional_description_1} </span>     </div>  : ("") } 
      {this.props.record[0].additional_description_2    ?  <div> <span> {this.props.record[0].additional_description_2} </span>     </div>  : ("") } 
      {this.props.record[0].additional_description_3    ?  <div> <span> {this.props.record[0].additional_description_3} </span>     </div>  : ("") } 
      {this.props.record[0].other_info_1    ?  <div> <span>{"Other Info: "} <br/> {this.props.record[0].other_info_1} </span>     </div>  : ("") } 
      {this.props.record[0].other_info_2    ?  <div> <span> {this.props.record[0].other_info_2} </span>     </div>  : ("") } 
      {this.props.record[0].other_info_3    ?  <div> <span> {this.props.record[0].other_info_3} </span>     </div>  : ("") } 

      {this.props.record[0].printout_1    ?  <div> <span>{"Print Out: "} <br/> {this.props.record[0].printout_1} </span>     </div>  : ("") } 
      {this.props.record[0].printout_2    ?  <div> <span> {this.props.record[0].printout_2} </span>     </div>  : ("") } 
      {this.props.record[0].printout_3    ?  <div> <span> {this.props.record[0].printout_3} </span>     </div>  : ("") } 
   {<br />}
      {this.props.record[0].document_links    ?  <div>  <a href={this.props.record[0].document_links} >Download PDF</a>      </div>  : ("") } 

     

    
    
    



        <button className="btn btn-primary" type="submit" onClick={this.handleClick}>
          Save
        </button>
      </div>;
  }
}

export default SingleComponent;




