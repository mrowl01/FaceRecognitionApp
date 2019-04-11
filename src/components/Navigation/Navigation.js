import React, {Component} from  'react';
import ProfileIcon from '../Profile/ProfileIcon';

class Navigation extends Component {
	render(){
		const {onRouteChange,isSignedIn, toggleModal} = this.props; 
			if (isSignedIn){
			return (
			<nav style = {{display:'flex', justifyContent:'flex-end'}}>
				<ProfileIcon onRouteChange={onRouteChange} toggleModal= {toggleModal} />
			</nav>
			); 
		} else {
			return(
			<nav style = {{display:'flex', justifyContent:'flex-end'}}>
				<p onClick={()=>onRouteChange('signin')} className = 'f3 link dim black underline pa3 pointer'> sign in </p>
				<p onClick={()=>onRouteChange('register')} className = 'f3 link dim black underline pa3 pointer'> register </p>
			</nav>
		);
		}
	}
}

export default Navigation ; 