import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // SET HERE API GATEWAY URL!!!
      apiURL: 'http://18.195.217.38:8080/',
      // apiURL: 'http://localhost:8080/',
      url: '',
      persistent: false,
      shortened: '',
    };

    this.getShortenedURL = this.getShortenedURL.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleToggleChange = this.handleToggleChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      url: event.target.value
    })
  }

  handleToggleChange() {
    this.setState({persistent: !this.state.persistent})    
  }

  getShortenedURL() {
    let query=this.state.apiURL+"?isPersistent="+this.state.persistent

    let result = fetch(query, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'},
      body: this.state.url
      }) 
      .then(response=> {
      	console.log(response);
        return response.json()
      }).then((data) => {
      	console.log(data.shortcut)
      	this.setState({
      		shortened: this.state.apiURL + data.shortcut
      	})
      	return data
      });

    // TODO DEBUG
    if(this.state.shortened === '') {
      this.setState({
        shortened: "SERVER ERROR"
      })
    }

    console.log("pls")
    console.log(result.shortcut)
  }

  render() {
    return (
      <div className="App">


        <header className="App-header">
          <h1 className="App-title">IOSR-SHORTENER</h1>
        </header>


        <p className="App-intro">
          Enter URL to be shortened:
        </p>

        <input 
          type="text" 
          className="input" 
          value={this.state.url}
          onChange={this.handleInputChange}>
        </input>

        <div>
          <p>Do you want your link to last longer than 10 minutes?</p>
          <label className="switch">
            <input 
              type="checkbox" 
              onClick={this.handleToggleChange}>
            </input>
            <span className="slider round"></span>
          </label>
        </div>

        <div>
          <button 
            className="button"
            onClick={this.getShortenedURL}>
              Get your shortened URL
          </button>
        </div>

        {this.state.shortened &&
          <div className ="result">
            <p>Your shortened URL:   {this.state.shortened}</p>
          </div>
        }


      </div>
    );
  }
}

export default App;
