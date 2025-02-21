import React from 'react';
import './App.css';
import axios from 'axios';
import AddUser from './components/AddUser/AddUser';
import ConcertCard from './components/ConcertCard/ConcertCard';
require('dotenv').config();

class App extends React.Component {
  state = {
    input:``,
    data: null,
    users: []
  };

  componentDidMount() {
    this.getAllUsers();
  };

  handleOnChange = e => {
    let input = e.target.value;
    this.setState({ input });
  }; 

  handleSubmit = e => {
    e.preventDefault();
    const URL = `https://rest.bandsintown.com/artists/${this.state.input}/events?app_id=${process.env.BANDSINTOWN_API_KEY}`
    axios.get(URL)
    .then(res => {
      const { data, status } = res;
      if (status == 200 && data !== `↵{warn=Not found}↵`) {
        this.setState({ data });
      }
    })
    .catch(err => {
      alert(`Error, we could not find that artist. Please try again.`)
    })
  };

  displayConcerts = () => {
    if (this.state.data == null || this.state.data == [] || this.state.data == `↵{warn=Not found}↵`) return;
    return this.state.data.map(concert => <ConcertCard concert={concert}/>)
  };

  getAllUsers = async () => {
    // TODO: how do I get the users from the database?
    const backendEndpoint = `http://localhost:8080/api/allUsers`;
    let res = await axios.get(backendEndpoint)
    console.log('*****', res);
  };

  render() {
    return (
      <div className="App">
        <button onClick={this.getAllUsers}>+++</button>
        <h1>Eventonica - MERN</h1>
        <form onSubmit={this.handleSubmit}> 
        <input id="search" onChange={this.handleOnChange} placeholder="Search concerts here"/>
        </form>
        <div className="container">
          <div className="concerts">
            {this.state.data !== null && this.displayConcerts()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;