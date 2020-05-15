import React from 'react';
import classNames from 'classnames';

// const Rules = React.createClass({
	class Rules extends React.Component {	
	render () {
		const className = classNames({
				'info': true,
				'hidden': !this.props.rules
			});
		const infoText = !this.props.rules ? 'Show rules ' + String.fromCharCode(8595) : 'Hide rules ' + String.fromCharCode(8593);

		return (
			<div className="rules">
				<span className="rules-toggle" onClick={this.props.toggleRules}>{infoText}</span>
				<p className={className}>
				Try to guess the pattern, in both order and color, within within eight to twelve turns (ten in our version). Each guess is made by placing a row of code pegs on the decoding board and clicking on the check next to the pegs. After submitting a row, a small black peg is placed for each code peg from the guess which is correct in both color and position. A white peg indicates the existence of a correct color code peg placed in the wrong position. More info on <a href="https://en.wikipedia.org/wiki/Mastermind_(board_game)" target="_blank">Wikipedia</a>.
				</p>
			</div>
		);
	}
}

export default Rules;