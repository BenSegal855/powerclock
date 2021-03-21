const { RadioGroup, SwitchItem } = require('powercord/components/settings');
const { React } = require('powercord/webpack');

module.exports = class Settings extends React.Component {

	render() {
		const { getSetting, updateSetting, toggleSetting } = this.props;
		return (
			<div>
				<RadioGroup
					onChange={e => updateSetting('timeFormat', e.value)}
					value={getSetting('timeFormat', 0)}
					options={[
						{
							name: '12 hour time',
							value: 0
						},
						{
							name: '24 hour time',
							value: 1
						}
					]}
				>
					Time Format
				</RadioGroup>
				<SwitchItem
					value={getSetting('sticky', false)}
					onChange={() => toggleSetting('sticky')}
					note='If the clock should always be visible at the top of the server list.'
				>
					Sticky
				</SwitchItem>
			</div>
		);
	}

};