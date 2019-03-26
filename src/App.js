import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import Particles from 'react-particles-js'
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Register from './components/Register/Register';
import SignIn from './components/SignIn/SignIn';




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
const iState = 
  {
      input:'',
      imageURL:'',
      boxes:[],
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


class App extends Component {
  constructor () {
    super();
    this.state={
      input:'',
      imageURL:'',
      boxes:[],
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


  calculateFaceLocation = (data)=>{
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
     return data.outputs[0].data.regions.map(face => {
      const clarifaiFace = face.region_info.bounding_box;
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }
    });
    
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


  displayFaceBox=(boxes)=>{
    this.setState({boxes:boxes})

  }
  onInputChange = (event) =>{
    this.setState({input:event.target.value});
  }
  onSubmit = () =>{
    this.setState({imageURL:this.state.input});
    fetch('https://young-everglades-13596.herokuapp.com/imageurl', {
          method:'post', 
          headers: {'Content-Type':'application/json'},
          body:JSON.stringify({
            input:this.state.input,
          })
        })
    .then(response=>response.json())
    .then(response=> {
      if(response){
        fetch('https://young-everglades-13596.herokuapp.com/image', {
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
        .catch(console.log)
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err=>console.log(err));
    }

//todo add authentication
  onRouteChange=(route)=>{
    if(route ==='signout'){
      this.setState(iState)
    } else if(route === 'home'){
      this.setState({isSignedIn:true})
    }
    this.setState({route:route});
  }
  
  render() {
    
    const {isSignedIn,route,imageURL,boxes} = this.state;
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
            <FaceRecognition boxes={this.state.boxes} imageURL= {imageURL}/>
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
