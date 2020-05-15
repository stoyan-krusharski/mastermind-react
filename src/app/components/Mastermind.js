import React from 'react';
import { functionalFor } from '../utils/utils'
import Rules from './Rules'
import DecodingBoard from './DecodingBoard'
import CodePegs from './CodePegs'
import EndGame from './EndGame'

// const Mastermind = React.createClass({
	class Mastermind extends React.Component {

	// getInitialState: function() {
	constructor(props) {
		
		super(props);

		const colors = this.getColors();
		const selectedPeg = colors.get(0);

		this.state =  {
			// code: this.getCode(), //the main code to be decoded,
			colors: colors,
			selectedPeg: selectedPeg,
			currentRow: 0,
			currentGuess: new Map(),
			exactMatches: 0,
			colorMatches: 0,
			pegsInRow: 4,
			attempts: 10,
			rules: false,
			endGame: false,
			success: false
		};

		this.state.code = this.getCode();
		
	}

	reloadGame = () => {
		
		this.setState({ code: this.getCode() });
		this.setState({ selectedPeg: this.state.colors.get(0) });
		this.setState({ currentRow: 0 });
		this.setState({ currentGuess: new Map() });
		this.setState({ exactMatches: 0 });
		this.setState({ colorMatches: 0 });
		this.setState({ endGame: false });
		this.setState({ success: false });
	}

	getColors = () => {

		const possibleColors = new Map([[0, 'zero'], [1, 'one'], [2, 'two'], [3, 'three'], [4, 'four'], [5, 'five']])
		let useColors = new Map();

		for (let [key, value] of possibleColors) {
			if (key < this.props.colorsNumber)
				useColors.set(key, value);
		}
		
		return useColors;
		
	}

	getCode = () => {
		const code = new Map();

		let generateCode = (i) => {
			code.set(i, this.state.colors.get(this.getRandomIntInRange()));
		};
		
		functionalFor(this.props.codeLength)(generateCode);

		return code;
	}

	getRandomIntInRange (min = 0, max = this.props.colorsNumber) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	toggleRules = () => {
		// this.setState({ rules: !this.state.rules });
		this.setState((state) => ({ rules: !state.rules}));
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
		let colorMatches = 0;

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
				colorMatches++;
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
		this.setState({colorMatches: colorMatches});
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
					<CodePegs selectedPeg={this.state.selectedPeg} colorsObject={Object.fromEntries(this.state.colors)} activatePeg={this.activatePeg}/>
				</div>

				<EndGame endGame={this.state.endGame} success={this.state.success} reloadGame={this.reloadGame}/>
				<div className="cheat">{this.state.code}</div>
			</div>
		);
	}
}

export default Mastermind;