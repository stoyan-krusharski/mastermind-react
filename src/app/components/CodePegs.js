import React from 'react';
import Peg from './Peg';

// const CodePegs = React.createClass({
	class CodePegs extends React.Component {
	render () {
		const pegs = [];

		let idVal;
		let pegClass;

		for (let [key, value] of this.props.colors) {
			idVal = 'peg-' + key;
			pegClass = 'peg ' + value;
			if (value === this.props.selectedPeg) {
				pegClass = pegClass + ' selected';
			}
			pegs.push(<Peg idVal={idVal} name='peg' value={value} key={idVal} pegClass={pegClass} isCurrentRow={true} activatePeg={this.props.activatePeg}/>);
		}

		return (
			<div className='codepegs right'>
				{pegs}
			</div>
		);
	}
}

export default CodePegs