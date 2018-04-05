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
        {this.props.record[0].agency_name   ?  <div> <span className="font-weight-light"> {"Agency: "}</span><span> {this.props.record[0].agency_name} </span>     </div>  : ("") } 
        {this.props.record[0].section_name  ?  <div> <span className="font-weight-light">{"Section: "}</span><span> {this.props.record[0].section_name} </span>     </div>  : ("") } 
        {this.props.record[0].request_id    ?  <div><span className="font-weight-light">{"Id: "}</span><span> {this.props.record[0].request_id} </span>  </div>: ("") }
        {this.props.record[0].pin    ?  <div> <span className="font-weight-light">{"Pin: "}</span><span> {this.props.record[0].pin} </span>     </div>  : ("") } 
        {this.props.record[0].type_of_notice_description ?  <div> <span className="font-weight-light"> {"Type of Notice Desc: "}</span><span> {this.props.record[0].type_of_notice_description} </span>     </div>  : ("") } 
        {this.props.record[0].event_date ? <div> <span className="font-weight-light"> {"Event Date: "}</span><span>{this.props.record[0].event_date} </span> </div>: (" ")}
        {this.props.record[0].start_date || this.props.record[0].end_date ?  <div> <span className="font-weight-light">{"Start Date: "}</span><span>{this.props.record[0].start_date} { this.props.record[0].end_date !== this.props.record[0].start_date ? <span><span className="font-weight-light">{" End Date: "} </span><span> {this.props.record[0].end_date} </span> </span>:("") }     </span></div> : ("") }
      
      
      {this.props.record[0].category_description    ?  <div> <br /><span className="font-weight-light">{"Categort Desc: "}</span><span> {this.props.record[0].category_description} </span>     </div>  : ("") } 
      {this.props.record[0].selection_method_description    ?  <div> <span className="font-weight-light">{"Selection Method: "}</span><span> {this.props.record[0].selection_method_description} </span>     </div>  : ("") } 
     

      {this.props.record[0].special_case_reason_description    ?  <div> <span className="font-weight-light">{"Special Case Reason Description: "}</span><span> {this.props.record[0].special_case_reason_description} </span>     </div>  : ("") } 
      
      {this.props.record[0].due_date    ?  <div> <span className="font-weight-light">{"Due Date: "}</span><span> {this.props.record[0].due_date} </span>     </div>  : ("") } 
      {this.props.record[0].address_to_request    ?  <div> <span className="font-weight-light">{"Send to: "}</span><span> {this.props.record[0].address_to_request} </span>     </div>  : ("") } 
      
      <div>
        {this.props.record[0].contact_name || this.props.record[0].contact_phone || this.props.record[0].email ?    
        <div><br /> <h6> Contact Info</h6>  
          <div> <span className="font-weight-light">{"Name: "}</span><span> {this.props.record[0].contact_name} </span>  </div> 
          <div> <span className="font-weight-light">{"Phone: "}</span><span> {this.props.record[0].contact_phone} </span>  </div>  
          <div> <span className="font-weight-light">{"Email: "}</span><span> {this.props.record[0].email} </span>     </div> 
        </div> : ("") } 
      </div>

      
      {this.props.record[0].contact_fax    ?  <div>  <span className="font-weight-light"> {"Fax: "} {this.props.record[0].contact_fax} </span>     </div>  : ("") } 
      {this.props.record[0].contract_amount  ?  <div> <span className="font-weight-light"> {"Contract Amount: $"}</span><span> {this.props.record[0].contract_amount} </span>  </div>  : ("") } 

      
      <div>
        {this.props.record[0].street_address_1 || this.props.record[0].city || this.props.record[0].state || this.props.record[0].zip_code  ? <span className="font-weight-light"> {"Address: "}</span> : ("") } 
        {this.props.record[0].street_address_1    ?  ( <span> {this.props.record[0].street_address_1}{", "} </span>     ) : ("") } 
        {this.props.record[0].street_address_2    ? (<span> {this.props.record[0].street_address_2}{", "} </span>  )  : ("") } 
        {this.props.record[0].city || this.props.record[0].state || this.props.record[0].zip_code  ?  ( <span> {this.props.record[0].city}{", "}{this.props.record[0].state}{" "}{this.props.record[0].zip_code}<br />  </span> )   : ("") } 
      </div> 


      <div>
        {this.props.record[0].vendor_name || this.props.record[0].vendor_address ? <div><span className="font-weight-light"> {"Vendor: "}</span><span> {this.props.record[0].vendor_name} {","}</span><span> {this.props.record[0].vendor_address}  {<br />}</span> </div>: ("")}
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

     

    
    
    


<br />
        <button className="btn btn-primary" type="submit" onClick={this.handleClick}>
          Save
        </button>
      </div>;
  }
}

export default SingleComponent;




