import React, {Component} from 'react';
import './ImageLinkForm.css';


class ImageLinkForm extends Component{
	render(){
		const {onInputChange, onSubmit} = this.props; 
		return(
			<div>
				<p className = 'f3'>
					{'Submit image and it will detect the face in it.'}
				</p>
				<div className = 'center'>
					<div className = 'center form pa4 br3 shadow-5'>
						<input onChange = {onInputChange} className = 'f4 pa2 w-70 center'type ='tex'/>
						<button onClick={onSubmit} className= 'w-30 grow f4 link ph3 pv2 dib white detectButton'>Detect </button>
					</div>
				</div>
			</div>
		)
	}
}

export default ImageLinkForm; 