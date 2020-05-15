import React from 'react';

// const Hint = React.createClass({
	class Hint extends React.Component {	
	shouldComponentUpdate (nextProps) {
		return nextProps.state.currentRow - 1 <= nextProps.rowId;
	}

	render () {
		return (
			<span className={this.props.hintClass} title={this.props.hintTitle}>
			</span>
		);
	}
}

export default Hint