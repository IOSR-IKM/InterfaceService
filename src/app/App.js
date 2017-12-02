import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // SET HERE API GATEWAY URL!!!
      apiURL: 'http://localhost:8080/shortener',
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
    let query=this.state.apiURL+"?url="+this.state.url+"&persistent="+this.state.persistent

    fetch(query, {method: "POST"}) 
      .then(result=> {
        this.setState({
          shortened: result
        })
      }, function(error) {
          console.log(error.message)
    });

    // TODO DEBUG
    if(this.state.shortened === '') {
      this.setState({
        shortened: "cos nie tak"
      })
    }
    console.log(this.state.persistent)
    console.log(this.state.url)
    console.log(query)
    console.log(this.state.shortened)
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
