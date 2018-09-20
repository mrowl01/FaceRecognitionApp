import React, {Component} from 'react';


class Rank extends Component{
	render(){
		const {name,entries} = this.props;
		return(
			<div>
				<div className = "f3" >
					{`${name}, your rank is`}
				</div>
				<div className = ' f1' style = {{color:"#7c796b"}}>
					{`${entries}`}
				</div>
			</div>
		)
	}
}

export default Rank; 