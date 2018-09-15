import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import Particles from 'react-particles-js'
import Clarifai from 'clarifai';

const API_KEY= process.env.REACT_APP_CLARAFAI;

const app = new Clarifai.App({
  apiKey: API_KEY
});

const particlesOptions={
  particles:{
    number:{
      value:80,
      density:{
        enable:true,
        value_area:800
      }
    },
    color:{
      value:"#ffffff"
    },
    interactivity:{
      onhover:{
        enable:true,
        mode:"repulse"
      }
    },
    line_linked:{
      color:"#a1cffc",
      shadow:{
        enable:true,
        color:"#000000",
        blur:5
      }
    }
  }
}

class App extends Component {
  constructor () {
    super();
    this.state={
      input:'',
    }
  }
  onInputChange = (event) =>{
    console.log(event.target.value);
    this.setState({input:event.target.value});
  }
  onSubmit = () =>{
    console.log("click");
    app.models.predict('a403429f2ddf4b49b307e318f00e528b', "https://samples.clarifai.com/face-det.jpg").then(
    function(response) {
      console.log(response);
    },
    function(err) {
      console.log(err);
    }
  );
  }
  render() {
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions}/>
      <Navigation/>
      <Logo/>
      <Rank/>
      <ImageLinkForm onSubmit={this.onSubmit} onInputChange= {this.onInputChange}/>
        {
        
        //<FaceRecognition/>
        }
      </div>
    );
  }
}

export default App;
