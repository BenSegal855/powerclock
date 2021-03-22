const { React } = require('powercord/webpack');

module.exports = class Clock extends React.PureComponent {

	constructor(props) {
		super(props);

		this.state = {
			hours: new Date().getHours(),
			mins: new Date().getMinutes(),
			format: this.props.getSetting('timeFormat') > 1
				? 0
				: this.props.getSetting('timeFormat'),
			sticky: this.props.getSetting('sticky'),
			indicator: this.props.getSetting('indicator')
				? new Date().getHours < 12 ? 'AM' : 'PM'
				: ''
		};
	}

	render() {
		return (
			<div className={`powerclock${this.state.sticky ? ' sticky' : ''}`}>
				{this.state.format === 1
					? this.state.hours
					: this.state.hours % 12 === 0
						? 12
						: this.state.hours % 12
				}:{this.state.mins.toString().padStart(2, '0')} {this.state.indicator}
			</div>
		);
	}

	componentDidMount() {
		if (this.props.getSetting('timeFormat') > 1) {
			this.props.updateSetting('timeFormat', 0);
		}

		this.interval = setInterval(async () => {
			this.setState({
				hours: new Date().getHours(),
				mins: new Date().getMinutes(),
				format: this.props.getSetting('timeFormat') > 1
					? 0
					: this.props.getSetting('timeFormat'),
				sticky: this.props.getSetting('sticky'),
				indicator: this.props.getSetting('indicator')
					? new Date().getHours < 12 ? 'AM' : 'PM'
					: ''
			});
		}, 1e3);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

};
