import React, {Component} from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import UserProfile from './components/UserProfile'
import List from './components/ListComponent'
import SingleComp from './components/SingleComponent'
import SearchComp from './components/Search';
import Home from './components/Home'
import LogIn from './components/LogIn'
import MyNavbar from './components/Navbar'
import './App.css';
import axios from "axios";
import './custom.css'


class App extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: {
        userName: "LukeMcD",
        memberSince: 1990
      },
      favs: [],
      favsLoaded: false,

      section_name: null,
      agency_name: null,
      $q: null,
      request_id: null,
      start_date: null,
      end_date: null,

      singleInfo: [],
      singleLoaded: false
    };
    this.getSingleInfo = this.getSingleInfo.bind(this);
    this.saveId = this.saveId.bind(this);
    this.getFavs = this.getFavs.bind(this);
    this.getAgencies = this.getAgencies.bind(this);
  }

  // populates the single page view
  getSingleInfo(id) {
    // console.log({ "Get Single" : this.state });
    axios
      .get("https://data.cityofnewyork.us/resource/buex-bi6w.json", {
        params: {
          $limit: 5,
          $$app_token: "GyKJwKngaf2zjKKrmrz8egnG9",
          request_id: id
        }
      })
      .then(response => {
        this.setState({ singleInfo: response.data, singleLoaded: true });
        //  console.log({ resp: response.data });
        //  console.log({ "after getSingle": this.state });
      });
  }

  // populates User Saved notices from DB
  getFavs() {
    //console.log({"get Favs":this.state.favs});
    axios.get(process.env.REACT_APP_HOST + "/favs").then(response => {
      this.setState({ favs: response.data, favsLoaded: true });
      // console.log({ resp: response.data });
      // console.log({ "after getFavs": this.state });
    });
  }

  // get agiencies list for populating the filter in the search section
  getAgencies() {
    axios
      .get(
        "https://data.cityofnewyork.us/resource/buex-bi6w.json?$select=agency_name&$Group=agency_name"
      )
      .then(response => {
        this.setState({ agencies: response.data });
      });
  }




  //adds filters from search screen
  addFilters = (method, event, data) => {
    event.preventDefault();
    let selected = [];
    console.log(data.length)
    // data.map( d=> {
      if (data.public === true) selected.push('(section_name="Public Hearings and Meetings")');
      if (data.procurement === true) selected = selected + 'or(section_name="Procurement")';
      if (data.award=== true) selected.push('section_name="Contract Award Hearings"');
      if (data.rules === true) selected.push('section_name="Agency Rules"');
      if (data.property === true) selected.push('section_name="Property Disposition"');
      if (data.court === true) selected.push('section_name="Court Notices"');
      if (data.materials === true) selected.push('section_name="Special Materials"');
      if (data.personnel === true) selected.push('section_name="Changes in Personnel"');
    //return 'e'})
    console.log(selected)
    if (data.keyword !==null ) this.setState({$q:data.keyword })
    console.log(data.keyword)
    debugger;
    console.log({ "filter saved": { data } });

 axios
   .get("https://data.cityofnewyork.us/resource/buex-bi6w.json", {
     params: {
       $limit: 5,
       $$app_token: "GyKJwKngaf2zjKKrmrz8egnG9",
       $Where: selected
     }
   })
   .then(response => {
     console.log({"log":response.data  });
     //  console.log({ resp: response.data });
     //  console.log({ "after getSingle": this.state });
   });

    //https://data.cityofnewyork.us/resource/buex-bi6w.json?$select=request_id,agency_name,section_name,start_date&$Where=(section_name=%22Public%20Hearings%20and%20Meetings%22)or(section_name=%20%22Contract%20Award%20Hearings%22)&$limit=10&$order=start_date%20desc
  //  SELECT section_name, request_id, start_date, agency_name, type_of_notice_description, short_title  WHERE  (section_name="Public Hearings and Meetings") or (section_name="Contract Award Hearings")
  
  };

 








  // clear filters
  clearFilters = () => {
    console.log("clear filters");
    this.setState({
      section_name: null,
      request_id: null,
      start_date: null,
      end_date: null,
      agency_name: null,
      $q: null
    });
  };

  //save id and title to database
  saveId = async newFav => {
    // debugger
    console.log(newFav);
    let axiosConfig = { headers: { "Content-Type": "application/json" } };
    //console.log("save id " + id + ", title is " + title );
    try {
      await axios.post(
        process.env.REACT_APP_HOST + `/favs`,
        newFav,
        axiosConfig
      );
    } catch (error) {
      console.log("Error saving favorite " + newFav.userFav);
      console.log(error);
      console.log(error.response.data);
      console.log(error.request);
    }
  };

  // delete favorite article from list
  deleteFav = async (id, index) => {
    try {
      await axios.delete(process.env.REACT_APP_HOST + `/favs/${id}`);

      // const updatedFavList = [...this.state.favs]
      // updatedFavList.splice(index, 1)
      // this.setState({favs: updatedFavList})
      await this.getFavs();
    } catch (error) {
      console.log(`Error deleting Favorite with ID of ${id}`);
      console.log(error);
    }
  };

  //set section name filter .. not working till after api call for some reason
  setFilterSection = myValue => {
    console.log(this.state.section_name);

    this.setState({
      section_name: myValue
    });
    setTimeout(() => {
      if (this.state.section_name === myValue) {
        console.log(this.state, "after");
      }
    }, 50);

    // this.getApiInfo()
  };

  mockLogIn = logInInfo => {
    const newUser = { ...this.state.currentUser };
    newUser.userName = logInInfo.userName;
    this.setState({ currentUser: newUser });
  };

  componentDidMount() {
    // this.clearFilters()
    //this.setFilterSection("Agency Rules");
    this.getSingleInfo(20141120107);
    this.getFavs();
    this.getAgencies();
  }

  render() {
    const HomeComponent = () => (
      <Home
        filters={this.state}
        setSection={this.setFilterSection}
        {...this.props}
      />
    );
    const LogInComponent = () => (
      <LogIn
        user={this.state.currentUser}
        mockLogIn={this.mockLogIn}
        {...this.props}
      />
    );
    const UserProfileComponent = () => (
      <UserProfile
        userName={this.state.currentUser.userName}
        memberSince={this.state.currentUser.memberSince}
        getSingleInfo={this.getSingleInfo}
        getFavList={this.getFavList}
        favs={this.state.favs}
        deleteFav={this.deleteFav}
        favsLoaded={this.state.favsLoaded}
        {...this.props}
      />
    );
    const Public = () => (
      <List
        filters={this.state}
        data-key={"Public Hearings and Meetings"}
        getSingleInfo={this.getSingleInfo}
        saveId={this.saveId}
        record={this.state.records}
        {...this.props}
      />
    );
    const Procurement = () => (
      <List
        filters={this.state}
        data-key={"Procurement"}
        getSingleInfo={this.getSingleInfo}
        saveId={this.saveId}
        record={this.state.records}
        {...this.props}
      />
    );
    const Award = () => (
      <List
        filters={this.state}
        data-key={"Contract Award Hearings"}
        getSingleInfo={this.getSingleInfo}
        saveId={this.saveId}
        record={this.state.records}
        {...this.props}
      />
    );
    const Rules = () => (
      <List
        filters={this.state}
        data-key={"Agency Rules"}
        getSingleInfo={this.getSingleInfo}
        saveId={this.saveId}
        record={this.state.records}
        {...this.props}
      />
    );
    const Property = () => (
      <List
        filters={this.state}
        data-key={"Property Disposition"}
        getSingleInfo={this.getSingleInfo}
        saveId={this.saveId}
        record={this.state.records}
        {...this.props}
      />
    );
    const Court = () => (
      <List
        filters={this.state}
        data-key={"Property Disposition"}
        getSingleInfo={this.getSingleInfo}
        saveId={this.saveId}
        record={this.state.records}
        {...this.props}
      />
    );
    const Materials = () => (
      <List
        filters={this.state}
        data-key={"Special Materials"}
        getSingleInfo={this.getSingleInfo}
        saveId={this.saveId}
        record={this.state.records}
        {...this.props}
      />
    );
    const Personnel = () => (
      <List
        filters={this.state}
        data-key={"CHANGES IN PERSONNEL"}
        getSingleInfo={this.getSingleInfo}
        saveId={this.saveId}
        record={this.state.records}
        {...this.props}
      />
    );

    const Single = () => (
      <SingleComp
        filters={this.state}
        data-key={"temp"}
        record={this.state.singleInfo}
        saveId={this.saveId}
        back={this.state.section_name}
        {...this.props}
      />
    );

    const Search = () => (
      <SearchComp
        filters={this.state}
        data-key={"temp"}
        agencies={this.state.agencies}
        record={this.state.singleInfo}
        saveId={this.saveId}
        addFilters={this.addFilters}
        back={this.state.section_name}
        {...this.props}
      />
    );

    return (
      <Router>
        <div>
          <div>
            <MyNavbar setSection={this.setFilterSection} />
          </div>
          <Switch>
            <Route exact path="/" component={HomeComponent} />
            <Route exact path="/login" component={LogInComponent} />
            <Route exact path="/public" component={Public} />
            <Route exact path="/procurement" component={Procurement} />
            <Route exact path="/award" component={Award} />
            <Route exact path="/rules" component={Rules} />
            <Route exact path="/property" component={Property} />
            <Route exact path="/court" component={Court} />
            <Route exact path="/materials" component={Materials} />
            <Route exact path="/personnel" component={Personnel} />
            <Route exact path="/userProfile" component={UserProfileComponent} />
            <Route exact path="/search" component={Search} />
            {this.state.singleLoaded ? (
              <Route path="/single" component={Single} />
            ) : (
              <p>... Loading</p>
            )}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
