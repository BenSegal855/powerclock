const { React } = require('powercord/webpack');

module.exports = class Clock extends React.PureComponent {

	constructor(props) {
		super(props);

		this.state = this.getNewState();
	}

	render() {
		return (
			<div className={`powerclock${this.state.sticky ? ' sticky' : ''}`}>
				{this.state.hours}:{this.state.mins} {this.state.indicator}
			</div>
		);
	}

	componentDidMount() {
		if (this.props.getSetting('timeFormat') > 1) {
			this.props.updateSetting('timeFormat', 0);
		}

		this.interval = setInterval(async () => {
			this.setState(this.getNewState());
		}, 1e3);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	getNewState() {
		const format = this.props.getSetting('timeFormat') > 1
			? 0
			: this.props.getSetting('timeFormat');

		const now = new Date();
		let dispHours = format === 1
			? now.getHours()
			: now.getHours() % 12 === 0
				? 12
				: now.getHours() % 12;

		if (this.props.getSetting('twoDigit')) {
			dispHours = dispHours.toString().padStart(2, '0');
		}

		return {
			hours: dispHours,
			mins: now.getMinutes().toString().padStart(2, '0'),
			sticky: this.props.getSetting('sticky'),
			indicator: this.props.getSetting('indicator')
				? now.getHours() < 12 ? 'AM' : 'PM'
				: ''
		};
	}

};
