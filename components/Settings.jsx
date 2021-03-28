const { RadioGroup, SwitchItem } = require('powercord/components/settings');
const { React } = require('powercord/webpack');

module.exports = class Settings extends React.Component {

	render() {
		const { getSetting, updateSetting, toggleSetting } = this.props;
		return (
			<div>
				<RadioGroup
					onChange={e => {
						updateSetting('timeFormat', e.value);
						if (e.value === 1) updateSetting('indicator', false);
					}}
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
				<SwitchItem
					value={getSetting('indicator', false)}
					onChange={() => toggleSetting('indicator')}
					disabled={getSetting('timeFormat', 0) !== 0}
				>
					AM/PM indicator
				</SwitchItem>
				<SwitchItem
					value={getSetting('twoDigit', false)}
					onChange={() => toggleSetting('twoDigit')}
					note='Will add a 0 to the beginning of the hours if less than 10'
				>
					Always show two digits
				</SwitchItem>
			</div>
		);
	}

};