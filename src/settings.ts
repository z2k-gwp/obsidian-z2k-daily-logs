
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
import { App, PluginSettingTab, Setting, Notice } from "obsidian";

// Obsidian Third Party Plugins
import { DEFAULT_DAILY_NOTE_FORMAT, IPeriodicNoteSettings } from "obsidian-daily-notes-interface";

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
	createLogOnStartup: boolean;
	dailyNotesSettings: IPeriodicNoteSettings;
}

export const DEFAULT_DAILY_FOLDER = "~Logs/YYYY";
export const DEFAULT_DAILY_TEMPLATE = "~Templates/~Logs - Daily.md";

export const DEFAULT_NOTES_SETTINGS: IPeriodicNoteSettings = Object.freeze({
	folder: DEFAULT_DAILY_FOLDER,
	format: DEFAULT_DAILY_NOTE_FORMAT,
	template: DEFAULT_DAILY_TEMPLATE
})

export const DEFAULT_SETTINGS: IZ2KDailyLogsSettings = Object.freeze({
	mySetting: 'default',
	debugLevel: 100,
	useRibbonButton: true,
	createLogOnStartup: false,
	dailyNotesSettings: DEFAULT_NOTES_SETTINGS
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
		containerEl.createEl('h2', {text: 'Z2K Daily Log - Settings'});

		// Main Settings
		// ----------------------------------------------------------------------------------------------
		containerEl.createEl('h3', {text: 'Main Settings'});
		new Setting(containerEl)
			.setName('Install Ribbon Button')
			.setDesc('Installs a ribbon button')
			.setDisabled(this.plugin.settings.useRibbonButton)
			.addToggle(cb => cb.onChange(value => {
                this.plugin.settings.useRibbonButton = value;
                this.plugin.saveSettings();				
			}).setValue(this.plugin.settings.useRibbonButton))

		new Setting(containerEl)
			.setName('Create Daily Log on startup')
			.setDesc('Creates the Daily Log (if not already done) upon application startup')
			.setDisabled(this.plugin.settings.createLogOnStartup)
			.addToggle(cb => cb.onChange(value => {
                this.plugin.settings.createLogOnStartup = value;
                this.plugin.saveSettings();				
			}).setValue(this.plugin.settings.createLogOnStartup))


		// Log Settings
		// ----------------------------------------------------------------------------------------------
		containerEl.createEl('h3', {text: 'Log Settings'});


        const formatDescription = document.createDocumentFragment();
        formatDescription.append(
            'For more syntax, refer to ',
            //formatDescription.createEl("br"),
            formatDescription.createEl("a", {
                href: "https://momentjs.com/docs/#/displaying/format/",
                text: "format reference"
            }),
		);

		new Setting(containerEl)
			.setName('Log Filename Date Format')
			.setDesc(formatDescription)
			.addText(text => text
				.setPlaceholder(this.plugin.settings.dailyNotesSettings.format)
				.setValue(this.plugin.settings.dailyNotesSettings.format)
				.onChange(async (value) => {
					this.plugin.settings.dailyNotesSettings.format = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('New Log File Location')
			.setDesc('Your new daily logs will be placed in this location')
			.addText(text => text
				.setPlaceholder(this.plugin.settings.dailyNotesSettings.folder)
				.setValue(this.plugin.settings.dailyNotesSettings.folder)
				.onChange(async (value) => {
					this.plugin.settings.dailyNotesSettings.folder = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Log Template File Location')
			.setDesc('Your the template file to use as a template for new daily logs')
			.addText(text => text
				.setPlaceholder(this.plugin.settings.dailyNotesSettings.template)
				.setValue(this.plugin.settings.dailyNotesSettings.template)
				.onChange(async (value) => {
					this.plugin.settings.dailyNotesSettings.template = value;
					await this.plugin.saveSettings();
				}));
		

		// Advanced Settings
		// ----------------------------------------------------------------------------------------------
		containerEl.createEl('h3', {text: 'Advanced Options'});

        new Setting(containerEl)
			.setName('Copy Daily Notes Settings')
			.setDesc('Copies configuration settings from the Daily Notes core plugin')
			.addButton((button) =>
                button.setButtonText("Copy").onClick(async () => {
                    await this.plugin.cmdCopySettingsFromDailyNotesPlugin();
					this.display(); 
                })
            );


        new Setting(containerEl)
			.setName('Validate Settings and Z2K Consistency')
			.setDesc('Saves and validates these settings are Z2K consistent')
			.addButton((button) =>
                button.setButtonText("Validate").onClick(async () => {
					this.plugin.saveSettings();				
                    await this.plugin.cmdValidateSettingsAndZ2KConsistency();
                })
            );


		new Setting(containerEl)
			.setName("Debug Level (integer)")
			.addText(cb => cb.onChange(async (value) => {
				this.plugin.settings.debugLevel = +value;
				await this.plugin.saveSettings();
			}).setValue(this.plugin.settings.debugLevel.toString()));

	}
}
