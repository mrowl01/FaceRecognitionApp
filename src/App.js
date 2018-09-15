import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import Particles from 'react-particles-js'


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
  render() {
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions}/>
      <Navigation/>
      <Logo/>
      <Rank/>
      <ImageLinkForm/>
        {
        
        //<FaceRecognition/>
        }
      </div>
    );
  }
}

export default App;
