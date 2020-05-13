import React from 'react';
import { times } from '../utils/utils'
import Rules from './Rules'
import DecodingBoard from './DecodingBoard'
import CodePegs from './CodePegs'
import EndGame from './EndGame'

// const Mastermind = React.createClass({
	class Mastermind extends React.Component {
	
	// getInitialState: function() {
	constructor(props) {
		super(props);
		this.state =  {
			code: this.getCode(), //the main code to be decoded
			selectedPeg: this.props.colors.get(0),
			currentRow: 0,
			currentGuess: new Map(),
			exactMatches: 0,
			valueMatches: 0,
			pegsInRow: 4,
			attempts: 10,
			rules: false,
			success: false,
			endGame: false
		};
	}

	reloadGame = () => {
		this.setState({ success: false });
		this.setState({ endGame: false });
		this.setState({ code: this.getCode() });
		this.setState({ selectedPeg: this.props.colors.get(0) });
		this.setState({ currentRow: 0 });
		this.setState({ currentGuess: new Map() });
		this.setState({ exactMatches: 0 });
		this.setState({ valueMatches: 0 });
	}

	toggleRules = () => {
		this.setState({ rules: !this.state.rules });
	}

	getRandomArbitrary (min = 0, max = 5) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	getCode = () => {
		const code = new Map();

		let generateCode = (i) => {
			code.set(i, this.props.colors.get(this.getRandomArbitrary()));
		};

		times(this.props.codeLength)(generateCode);

		console.log(code);

		return code;
	}

	activatePeg = (event) => {
		//if one of the peg on the right was selected
		if (event.target.name.startsWith('peg')) {
			this.setState({ selectedPeg: event.target.value });
		} else {
			//else if one of the pegs on the decoding board was selected
			if (this.state.selectedPeg) { //if peg on the right was selected
				this.setState({ currentGuess: this.state.currentGuess.set(event.target.value - 1, this.state.selectedPeg) });
			}
		}
	}

	keyOf (map, valueToFind) {
		for (let [key, value] of map) {
			if (valueToFind === value) {
				return key;
			}
		}

		return -1;
	}

	submitPegs = () => {
		let code = new Map(this.state.code);
		let pegs = this.state.currentGuess;
		let foundKey;
		let exactMatches = 0;
		let valueMatches = 0;

		// First pass: Look for value & position matches
		// Safely remove items if they match
		for (let [key, value] of pegs) {
			if (value === code.get(key)) {
				exactMatches++;
				pegs.delete(key);
				code.delete(key);
			}
		}

		// Second pass: Look for value matches anywhere in the code
		for (let [key, value] of pegs) {
			// attempt to find the peg in the remaining code
			foundKey = this.keyOf(code, value);
			if (foundKey !== -1) {
				valueMatches++;
				// remove the matched code peg, since it's been matched
				code.delete(foundKey);
			}
		}

		if (exactMatches === this.state.pegsInRow) {
			this.setState({ endGame: true });
			this.setState({ success: true });
		} else if (this.state.attempts === this.state.currentRow + 1) {
			this.setState({ endGame: true });
		}

		this.setState({exactMatches: exactMatches});
		this.setState({valueMatches: valueMatches});
		this.setState({currentRow: this.state.currentRow + 1});
		this.setState({currentGuess: new Map()});
	}

	render () {
		return (
			<div>
				<h1><span className="M">M</span><span className="A">A</span><span className="S">S</span><span className="T">T</span><span className="E">E</span><span className="R">R</span><span className="MIND">MIND</span></h1>
				<Rules rules={this.state.rules} toggleRules={this.toggleRules}/>

				<div className="clearfix">
					<DecodingBoard state={this.state} activatePeg={this.activatePeg} submitPegs={this.submitPegs}/>
					<CodePegs selectedPeg={this.state.selectedPeg} colors={this.props.colors} activatePeg={this.activatePeg}/>
				</div>

				<EndGame endGame={this.state.endGame} success={this.state.success} reloadGame={this.reloadGame}/>
				<div className="cheat">{this.state.code}</div>
			</div>
		);
	}
}

export default Mastermind;

/*
const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<Form />, wrapper) : false;
*/