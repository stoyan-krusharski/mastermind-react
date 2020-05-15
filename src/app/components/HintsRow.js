import React from 'react';
import { functionalFor } from '../utils/utils'
import Hint from '../components/Hint'

// const HintsRow = React.createClass({
    export class HintsRow extends React.Component {    
	render () {
		const hints = [];

		let idVal;
		let hintClass = '';
		let hintTitle = '';
		let exactMatches = this.props.state.exactMatches;
		let valueMatches = this.props.state.valueMatches;

		let generateHint = (i) => {
			hintClass = 'hint';
			idVal = this.props.name + '-' + i + 1;

			//update current row
			if (this.props.state.currentRow - 1 === this.props.rowId) {
				if (exactMatches > 0) {
					hintClass = hintClass + ' exact-matches';
					hintTitle = "A guess correct in both color and position.";
					exactMatches--;
				} else if (valueMatches > 0) {
					hintClass = hintClass + ' value-matches';
					hintTitle = "A correct color code peg placed in the wrong position.";
					valueMatches--;
				} else {
					hintClass = hintClass + ' none-matches';
				    hintTitle = "A guess wrong in both color and position.";
				}
			}

			hints.push(<Hint key={idVal} hintClass={hintClass} rowId={this.props.rowId} state={this.props.state} hintTitle={hintTitle}/>);
		};

		functionalFor(this.props.state.pegsInRow)(generateHint);

		return (
			<div className="hints-row">
				{hints}
			</div>
		);
	}
}

export default HintsRow