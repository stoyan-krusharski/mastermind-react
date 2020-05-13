import React from 'react';
import classNames from 'classnames';
import DecodeRow from './DecodeRow';
import SubmitButton from './SubmitButton';
import HintsRow from './HintsRow';

// const Row = React.createClass({
	class Row extends React.Component {	
	render () {
		const isCurrentRow = this.props.state.currentRow === this.props.rowId;
		const rowClassName = classNames({
				'row': true,
				'clearfix': true,
				'current': isCurrentRow
			});
		const hintsRowName = 'hintsRow-' + this.props.rowId;
		const rowName ='decodeRow-' + this.props.rowId;

		return (
			<div className={rowClassName}>
				<div className='left'>
					<DecodeRow name={rowName} key={this.props.rowId} rowId={this.props.rowId} state={this.props.state} isCurrentRow={isCurrentRow} activatePeg={this.props.activatePeg}/>
				</div>
				<div className='left'>
					<SubmitButton rowId={this.props.rowId} state={this.props.state} submitPegs={this.props.submitPegs}/>
				</div>
				<div className='right'>
					<HintsRow name={hintsRowName} key={this.props.rowId} rowId={this.props.rowId} state={this.props.state}/>
				</div>
			</div>
		);
	}
}

export default Row