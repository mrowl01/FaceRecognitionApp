import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import Particles from 'react-particles-js'
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Register from './components/Register/Register';
import Clarifai from 'clarifai';
import SignIn from './components/SignIn/SignIn';

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
      imageURL:'',
      box:{},
      route:'signin',
      isSignedIn:false,
      user:{
        id:'',
        name:'',
        email:'',
        entries:0,
        joined:''
      }
    }
  }


  calculateFaceLocation = (response)=>{

    const face= response.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('usersImage');
    const width = Number(image.width);
    const height = Number(image.height); 
    console.log(height);
    return {
      leftCol:face.left_col* width,
      topRow:face.top_row*height,
      rightCol:width-(face.right_col*width),
      bottomRow:height-(face.bottom_row*height)
    }
  }

  loadUser=(data)=>{
    this.setState({user:{
        id:data.id,
        name:data.name,
        email:data.email,
        entries:data.entries,
        joined:data.joined
    }})
  }


  displayFaceBox=(box)=>{
    this.setState({box})

  }
  onInputChange = (event) =>{
    this.setState({input:event.target.value});
  }
  onSubmit = () =>{
    this.setState({imageURL:this.state.input});
    app.models.predict(
    Clarifai.FACE_DETECT_MODEL, 
    this.state.input)
    .then(response=> {
      if(response){
        fetch('http://localhost:3001/image', {
          method:'put', 
          headers: {'Content-Type':'application/json'},
          body:JSON.stringify({
            id:this.state.user.id,
          })
        })
        .then(response=>response.json())
        .then(count=>{
          this.setState(Object.assign(this.state.user,{entries:count}))
        })
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err=>console.log(err));
    }

//todo add authentication
  onRouteChange=(route)=>{
    if(route ==='signout'){
      this.setState({isSignedIn:false})
    } else if(route === 'home'){
      this.setState({isSignedIn:true})
    }
    this.setState({route:route});
  }
  
  render() {
    const {isSignedIn,route,imageURL,box} = this.state;
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions}/>
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {
          route==='home'?
          <div>
            <Logo/>
            <Rank name = {this.state.user.name} entries = {this.state.user.entries}/>
            <ImageLinkForm onSubmit={this.onSubmit} onInputChange= {this.onInputChange}/>
            <FaceRecognition box={this.state.box} imageURL= {imageURL}/>
          </div>
          :(
            //if
            route==='signin'?
            <SignIn loadUser = {this.loadUser} onSignIn={this.onRouteChange}/>
            : 
            <Register loadUser= {this.loadUser} onRegister={this.onRouteChange}/>
            ) 
        }
      </div>
    );
  }
}

export default App;
