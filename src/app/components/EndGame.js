import React from 'react';
import classNames from 'classnames';

// const EndGame = React.createClass({
	class EndGame extends React.Component {	
	render () {
		const endGameInfoClass = classNames({
				'endgame': true,
				'hidden': !this.props.endGame
			});
		const endGameStatusClass = classNames({
				'endgame-relative': true,
				'success': this.props.success,
				'failure': !this.props.success
			});
		const infoText = this.props.success ? 'Congratulations! You win!' : 'GAME OVER! Try again :(';

		return (
			<div className={endGameInfoClass}>
				<div className={endGameStatusClass}>
					<h2 className="endgame-header">{infoText}</h2>
					<button className="endgame-btn" onClick={this.props.reloadGame}>PLAY AGAIN</button>
				</div>
				<div className="endgame-relative endgame-overlay"></div>
			</div>
		);
	}
}

export default EndGame