import React, {Component} from 'react';
import Tilt from 'react-tilt';
import './Logo.css';

class Logo extends Component{
	render(){
		return(
			<div className = "ma4 mt0 ">
				<Tilt className="Tilt br2 shadow-2" option = {{max:25}} style = {{height:150, width:150}}>
					<div className = "Tilt-inner pa3">  </div>
				</Tilt>
			</div>
		)
	}
}

export default Logo; 