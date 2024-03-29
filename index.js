const { Plugin } = require('powercord/entities');
const { React, getModule } = require('powercord/webpack');
const { inject, uninject } = require('powercord/injector');
const { forceUpdateElement } = require('powercord/util');

const Clock = require('./components/Clock');
const Settings = require('./components/Settings');

module.exports = class PowerClock extends Plugin {

	async startPlugin() {
		this.loadStylesheet('./style.css');

		powercord.api.settings.registerSettings('powerclock-settings', {
			category: this.entityID,
			label: 'Powerclock',
			render: Settings
		});

		const homeButton = await getModule([ 'HomeButton' ]);

		inject('powerclock', homeButton, 'HomeButton', (_, res) => {
			if (!Array.isArray(res)) res = [ res ];
			res.unshift(React.createElement(Clock, {
				className: 'powerclock sticky',
				getSetting: this.settings.get,
				updateSetting: this.settings.update
			}));
			return res;
		});
	}

	pluginWillUnload() {
		uninject('powerclock');
		powercord.api.settings.unregisterSettings('powerclock-settings');
		forceUpdateElement(`.${getModule([ 'homeIcon', 'downloadProgress' ], false).tutorialContainer}`);
	}

};

