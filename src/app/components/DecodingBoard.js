import React from 'react';
import { times } from '../utils/utils'
import Row from './Row';

// const DecodingBoard = React.createClass({
	class DecodingBoard extends React.Component {	
	render () {
		let rows = [];
		let rowName;

		let generateRow = (i) => {
			rowName = 'decodeRow-' + i + 1;
			rows.push(<Row name={rowName} key={i + 1} rowId={i} state={this.props.state} activatePeg={this.props.activatePeg} submitPegs={this.props.submitPegs}/>);
		};

		times(this.props.state.attempts)(generateRow);

		return (
			<div className="decoding-board left">
				{rows}
			</div>
		);
	}
}

export default DecodingBoard