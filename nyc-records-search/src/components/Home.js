import React, { Component } from "react";
import "../App.css"
//import Single from './SingleComponent'
import HomeSingle from './HomeSingle'

class Home extends Component {

  render() {
    console.log(this.props)
    return <div>
        <div className="jumbotron pt-xl-5 pt-l-5 pt-md-4 pt-sm-3">
          <div className="container-fluid">
            <h1 className="display-4 font-weight-bold">
              NYC: The City Record Online
            </h1>
            <p className="lead">
              The City Record Online (CROL) is now a fully searchable
              database of notices published in the City Record newspaper
              which includes but is not limited to: public hearings and
              meetings, public auctions and sales, solicitations and awards
              and official rules proposed and adopted by city agencies.
            </p>
            <div className="row">
              <HomeSingle section="Public Hearings and Meetings" setSection={this.props.setSection} newPath="/public" text="Includes Notices of Public Hearings and Meetings open to the Public." />
              <HomeSingle section="Procurement" setSection={this.props.setSection} newPath="/procurement" text="Solicitation notices afford vendors the opportunity to compete for New York City's contracts on various goods and services for over 100 agencies and other governmental organizations." />
              <HomeSingle section="Contract Award Hearings" setSection={this.props.setSection} newPath="/award" text="Pursuant to Section 326 of the New York City Charter and Section 2-11 of the Procurement Prolicy Borad rules, a public hearing must be held to recieve testimony before an Agency may award any contract over $100,000, unless exempted by the New York City Charter or the Procurement Pilicy Board Rules." />
              <HomeSingle section="Agency Rules" setSection={this.props.setSection} newPath="/rules" text=" Includes Proposed Rules, Adopted Rules and Regulatory Agendas." />
              <HomeSingle section="Property Disposition" setSection={this.props.setSection} newPath="/property" text="Includes public auctions and sales." />
              <HomeSingle section="Court Notices" setSection={this.props.setSection} newPath="/court" text="Includes acquisition and motion notices for the State Supreme Court" />
              <HomeSingle section="Special Materials" setSection={this.props.setSection} newPath="/materials" text="Includes Public Notices, Fuel Oil Prices, Concept Papers and Personnel Changes" />
              <HomeSingle section="Changes in Personnel" setSection={this.props.setSection} newPath="/personnel" text="Personnel Changes" />
            </div>
          </div>
        </div>
      </div>;
     
  }
}

export default Home;
