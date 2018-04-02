import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import ReactTable from "react-table";
import "react-table/react-table.css";
import checkboxHOC from "react-table/lib/hoc/selectTable";




class ListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: "makeData",
      recordInfo: [],
      recordLoaded: false,
      selection: [],
      selectAll: false,
      columns:[
        {
          Header: "Short Title",
          accessor: "short_title",
          minWidth: 200
        },
        { Header: "From", accessor: "agency_name" },
        { Header: "Section Name", accessor: "section_name" },
        { Header: "Type", accessor: "type_of_notice_description" },
        { Header: "Start Date", accessor: "start_date", maxWidth: 120 },
        { Header: "Request Id", accessor: "request_id" }
      ],
    };
    this.renderEditable = this.renderEditable.bind(this);
  }

  getApiInfo2() {
    console.log({ "before API2": this.state });
    axios
      .get("https://data.cityofnewyork.us/resource/buex-bi6w.json", {
        params: {
          $limit: 500,
          $$app_token: "GyKJwKngaf2zjKKrmrz8egnG9",
          section_name: this.props.filters.section_name,
          request_id: this.props.filters.request_id,
          start_date: this.props.filters.start_date,
          end_date: this.props.filters.end_date,
          agency_name: this.props.filters.agency_name,
          type_of_notice_description: this.props.filters
            .type_of_notice_description,
          category_description: this.props.filters.category_description,
          short_title: this.props.filters.short_title,
          selection_method_description: this.props.filters
            .selection_method_description,
          spectial_case_reason_description: this.props.filters
            .spectial_case_reason_description,
          pin: this.props.filters.pin,
          due_date: this.props.filters.due_date
        }
      })
      .then(response => {
        this.setState({ recordInfo: response.data, recordLoaded: true });
        console.log({ resp: response.data });
        console.log({ "after getRecords2": this.state });
      });
  }

  renderEditable(cellInfo) {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.recordInfo];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ recordInfo: cellInfo });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.recordInfo[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }

 getData() {
    const data = this.props.map(item => {
      const _id = "hi";
      return {
        _id,
        ...item
      };
    });
    return data;
}

  getColumns(data){
    const columns = [];
    Object.keys(this.state.recordInfo).forEach((key)=>{
      if(key!=='_id') {
        columns.push({
          accessor: key,
          Header: key,
        })
      }
    })
    return columns;
  }

  toggleSelection = (key, shift, row) => {
    /* Implementation of how to manage the selection state is up to the developer. This implementation uses an array stored in the component state. Other implementations could use object keys, a Javascript Set, or Redux... etc. */
    // start off with the existing state
    let selection = [...this.state.selection];
    const keyIndex = selection.indexOf(key);
    // check to see if the key exists
    if (keyIndex >= 0) {
      // it does exist so we will remove it using destructing
      selection = [
        ...selection.slice(0, keyIndex),
        ...selection.slice(keyIndex + 1)
      ];
    } else {
      // it does not exist so add it
      selection.push(key);
    }
    // update the state
    this.setState({ selection });
  };

  toggleAll = () => {
    /* 'toggleAll' is a tricky concept with any filterable table do you just select ALL the records that are in your data? OR do you only select ALL the records that are in the current filtered data? The latter makes more sense because 'selection' is a visual thing for the user. This is especially true if you are going to implement a set of external functions that act on the selected information (you would not want to DELETE the wrong thing!). So, to that end, access to the internals of ReactTable are required to get what is currently visible in the table (either on the current page or any other page). The HOC provides a method call 'getWrappedInstance' to get a ref to the wrapped ReactTable and then get the internal state and the 'sortedData'. That can then be iterrated to get all the currently visible records and set the selection state. */
    const selectAll = this.state.selectAll ? false : true;
    const selection = [];
    if (selectAll) {
      // we need to get at the internals of ReactTable
      const wrappedInstance = this.checkboxTable.getWrappedInstance();
      // the 'sortedData' property contains the currently accessible records based on the filter and sort
      const currentRecords = wrappedInstance.getResolvedState().sortedData;
      // we just push all the IDs onto the selection array
      currentRecords.forEach(item => {
        selection.push(item.request_id);
      });
    }
    this.setState({ selectAll, selection });
  };

  isSelected = key => {
    /* Instead of passing our external selection state we provide an 'isSelected' callback and detect the selection state ourselves. This allows any implementation for selection (either an array, object keys, or even a Javascript Set object). */
    return this.state.selection.includes(key);
  };

  logSelection = () => {
    console.log("selection:", this.state.selection);
  };


  componentDidMount() {
    this.getApiInfo2();
  }


  render() {
    console.log({ "list props": this.props });
    const CheckboxTable = checkboxHOC(ReactTable);
    const data = this.state.recordInfo;
    const { toggleSelection, toggleAll, isSelected } = this;
    const {  columns, selectAll } = this.state;
    const checkboxProps = { selectAll, isSelected, toggleSelection, toggleAll, selectType: "checkbox" };



  return <div>
      <h1>{this.props.filters.section_name} List</h1>
      {this.state.recordLoaded ? <div>
          <button onClick={this.logSelection}>Log Selection</button>

          <CheckboxTable ref={r => (this.checkboxTable = r)} data={data} columns={columns} defaultPageSize={10} className="-striped -highlight" showPaginationTop {...checkboxProps} getTdProps={(state, rowInfo, column, instance) => {
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
