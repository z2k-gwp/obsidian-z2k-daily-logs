
// obsidian-z2k-daily-logs Obsidian Plugin
// +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=
//
// File: plugin.ts
//    - This source file contains code related to the settings page of the plugin
//    - Please see https://github.com/z2k-gwp/obsidian-z2k-daily-logs for more information
//
//

// ======================================================================================================
// Imports
// ======================================================================================================
// 

// Obsidian Imports
import { App, PluginSettingTab, Setting } from "obsidian";

// Internal Plugin Imports
import type Z2KDailyLogsPlugin from "./plugin"


// ======================================================================================================
// Interfaces and Constants
// ======================================================================================================
// 
export interface IZ2KDailyLogsSettings {
	mySetting: string;
	debugLevel: number;
	useRibbonButton: boolean;
	doMyMainJobOnStartup: boolean;
}

export const DEFAULT_SETTINGS: IZ2KDailyLogsSettings = Object.freeze({
	mySetting: 'default',
	debugLevel: 100,
	useRibbonButton: true,
	doMyMainJobOnStartup: false,
})



// ======================================================================================================
// Z2KTemplateSmallSettingTab Settings Tab Class
// ======================================================================================================
// 
export class Z2KDailyLogsSettingTab extends PluginSettingTab {
	public plugin: Z2KDailyLogsPlugin;

	constructor(app: App, plugin: Z2KDailyLogsPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		let {containerEl} = this;

		containerEl.empty();

		// Main Settings
		// ----------------------------------------------------------------------------------------------
		containerEl.createEl('h2', {text: 'Main Settings'});
		new Setting(containerEl)
			.setName('Install Ribbon Button')
			.setDesc('Installs a ribbon button')
			.setDisabled(this.plugin.settings.useRibbonButton)
			.addToggle(cb => cb.onChange(value => {
                this.plugin.settings.useRibbonButton = value;
                this.plugin.saveSettings();				
			}).setValue(this.plugin.settings.useRibbonButton))

		new Setting(containerEl)
			.setName('Do My Main Job on startup')
			.setDesc('Performs My Main Job upon application startup')
			.setDisabled(this.plugin.settings.doMyMainJobOnStartup)
			.addToggle(cb => cb.onChange(value => {
                this.plugin.settings.doMyMainJobOnStartup = value;
                this.plugin.saveSettings();				
			}).setValue(this.plugin.settings.doMyMainJobOnStartup))


		// Advanced Settings
		// ----------------------------------------------------------------------------------------------
		containerEl.createEl('h2', {text: 'Advanced Settings'});

		new Setting(containerEl)
			.setName("Debug Level (integer)")
			.addText(cb => cb.onChange(value => {
				this.plugin.settings.debugLevel = +value;
				this.plugin.saveSettings();
			}).setValue(this.plugin.settings.debugLevel.toString()));

	}
}
