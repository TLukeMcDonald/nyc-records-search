import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import ReactTable from "react-table";
import "react-table/react-table.css";
//import checkboxHOC from "react-table/lib/hoc/selectTable";


class ListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: "makeData",
      recordInfo: [],
      recordLoaded: false,
      selection: [],
      selectAll: false,
      
    };
    //this.renderEditable = this.renderEditable.bind(this);
  }

  getList() {
    console.log({ "before API2": this.state });
    console.log({"API Filters":this.props.filters})
    axios
      .get("https://data.cityofnewyork.us/resource/buex-bi6w.json", {
        params: {
          $limit: 5000,
          $$app_token: "GyKJwKngaf2zjKKrmrz8egnG9",
          $Select: "section_name,request_id,start_date,agency_name,type_of_notice_description,short_title",
          $Order: "start_date desc",
          section_name: this.props.filters.section_name,
          agency_name: this.props.filters.agency_name,
          $q: this.props.filters.q,
          request_id: this.props.filters.request_id,
          start_date: this.props.filters.start_date,
          end_date: this.props.filters.end_date,
          // type_of_notice_description: this.props.filters
          //   .type_of_notice_description,
          // category_description: this.props.filters.category_description,
          // short_title: this.props.filters.short_title,
          // selection_method_description: this.props.filters
          //   .selection_method_description,
          // spectial_case_reason_description: this.props.filters
          //   .spectial_case_reason_description,
          // pin: this.props.filters.pin,
          // due_date: this.props.filters.due_date
        }
      })
      .then(response => {
        this.setState({ recordInfo: response.data, recordLoaded: true });
        console.log({ resp: response.data });
        console.log({ "after getRecords2": this.state });
      });
  }


  componentDidMount() {
    this.getList();
  }


  render() {
    console.log({ "list props": this.props });
   // const CheckboxTable = checkboxHOC(ReactTable);
    const data = this.state.recordInfo;
    const { toggleSelection, toggleAll, isSelected } = this;
    const { selectAll } = this.state;
    const checkboxProps = { selectAll, isSelected, toggleSelection, toggleAll, selectType: "checkbox" };
    const columns = [
        { Header: "Short Title", accessor: "short_title", minWidth: 200 },
        { Header: "From", accessor: "agency_name" },
        { Header: "Type", accessor: "type_of_notice_description" },
        { Header: "Start Date", accessor: "start_date", maxWidth: 120 },
        { Header: "Request Id", accessor: "request_id" },
        { Header: "Section Name", accessor: "section_name" }
      ];


  return <div>
      <h1>{this.props.filters.section_name} List</h1>
      {this.state.recordLoaded ? <div>

          <ReactTable ref={r => (this.checkboxTable = r)} data={data} columns={columns} defaultPageSize={20} className="-striped -highlight" showPaginationTop {...checkboxProps} getTdProps={(state, rowInfo, column, instance) => {
              return { onClick: (e, handleOriginal) => {
                  console.log("It was in this row:", rowInfo);
                  console.log(rowInfo.row.request_id, " was clicked.");
                  this.props.getSingleInfo(rowInfo.row.request_id);
                  console.log(this.props);
                  // works with 'withRoute on export of page to change page
                  this.props.history.push("/Single");
                  if (handleOriginal) {
                    handleOriginal();
                  }
                } };
            }} />
        </div> : <p> Loading... </p>}
    </div>;
  }
}

export default  withRouter(ListComponent);
