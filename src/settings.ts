
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
import { DEFAULT_Z2K_DATEFORMAT } from "./fields"

// ======================================================================================================
// Interfaces and Constants
// ======================================================================================================
// 
export interface IZ2KDailyLogsSettings {

	// Main Settings
	mySetting: string;
	useRibbonButton: boolean;
	createLogOnStartup: boolean;

	// Daily Log Settings
	generalDateFormatString: string;
	dailyNotesSettings: IPeriodicNoteSettings;

	// Automated Log Settings
	automatedEventLogsEnabled: boolean;
	automatedEventLogsFormatString: string;
	logLogCreation: boolean;

	// Event Log Settings
	taggedEventLogsEnabled: boolean;
	taggedEventLogsDefaultHeader: string;

	// Advanced Settings
	debugLevel: number;
}

export const DEFAULT_DAILY_LOG_FOLDER = "~Logs/{{date:YYYY}}";
export const DEFAULT_DAILY_LOG_TEMPLATE = "~Templates/~Logs - Daily";
export const DEFAULT_DAILY_LOG_FILENAME = "{{date:" + DEFAULT_Z2K_DATEFORMAT + "}}";

export const DEFAULT_DAILY_LOG_AUTOMATED_FORMAT_STRING = "- {{date:YYYY-MM-DD}}, {{date:HH:mm}}, {{deviceName}}, {{toolName}}, {{eventDescription}}";

export const DEFAULT_DAILY_LOG_DEFAULT_TAGGED_HEADER = "# Tagged Events";

export const DEFAULT_NOTES_SETTINGS_FOR_LOGS: IPeriodicNoteSettings = Object.freeze({
	folder: DEFAULT_DAILY_LOG_FOLDER,
	format: DEFAULT_DAILY_LOG_FILENAME,
	template: DEFAULT_DAILY_LOG_TEMPLATE
})

export const DEFAULT_SETTINGS: IZ2KDailyLogsSettings = Object.freeze({
	mySetting: 'default',
	useRibbonButton: true,
	createLogOnStartup: false,

	generalDateFormatString: DEFAULT_Z2K_DATEFORMAT,
	dailyNotesSettings: DEFAULT_NOTES_SETTINGS_FOR_LOGS,

	automatedEventLogsEnabled: true,
	automatedEventLogsFormatString: DEFAULT_DAILY_LOG_AUTOMATED_FORMAT_STRING,
	logLogCreation: true,

	taggedEventLogsEnabled: true,
	taggedEventLogsDefaultHeader: DEFAULT_DAILY_LOG_DEFAULT_TAGGED_HEADER,

	debugLevel: 100
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
			.setName('Display Ribbon Button')
			.setDesc('Displays a ribbon button')
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
		containerEl.createEl('h3', {text: 'Daily Log Settings'});

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
			.setName('General System Date Format')
			.setDesc(formatDescription)
			.addText(text => text
				.setPlaceholder(this.plugin.settings.generalDateFormatString)
				.setValue(this.plugin.settings.generalDateFormatString)
				.onChange(async (value) => {
					this.plugin.settings.generalDateFormatString = value;
					await this.plugin.saveSettings();
				}));


		new Setting(containerEl)
			.setName('Daily Log Filename Format')
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
			.setDesc('All new daily logs will be placed in this location')
			.addText(text => text
				.setPlaceholder(this.plugin.settings.dailyNotesSettings.folder)
				.setValue(this.plugin.settings.dailyNotesSettings.folder)
				.onChange(async (value) => {
					this.plugin.settings.dailyNotesSettings.folder = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Log Template File Location')
			.setDesc('The template file to use as a template for new daily logs')
			.addText(text => text
				.setPlaceholder(this.plugin.settings.dailyNotesSettings.template)
				.setValue(this.plugin.settings.dailyNotesSettings.template)
				.onChange(async (value) => {
					this.plugin.settings.dailyNotesSettings.template = value;
					await this.plugin.saveSettings();
				}));
		

		// Automated Event Logging Settings
		// ----------------------------------------------------------------------------------------------
		containerEl.createEl('h3', {text: 'Automated Event Logging Settings'});

		new Setting(containerEl)
			.setName('Enable Automated Event Logging')
			.setDesc('Turns on the ability to add automated logging events by appending to the end of the daily log file')
			.setDisabled(this.plugin.settings.automatedEventLogsEnabled)
			.addToggle(cb => cb.onChange(value => {
                this.plugin.settings.automatedEventLogsEnabled = value;
                this.plugin.saveSettings();				
			}).setValue(this.plugin.settings.automatedEventLogsEnabled))


		new Setting(containerEl)
			.setName('Automated Logging Format String')
			.setDesc('This string controls how automated log events are formatted when they are appended to the daily log')
			.addText(text => text
				.setPlaceholder(this.plugin.settings.automatedEventLogsFormatString)
				.setValue(this.plugin.settings.automatedEventLogsFormatString)
				.onChange(async (value) => {
					this.plugin.settings.automatedEventLogsFormatString = value;
					await this.plugin.saveSettings();
				}));


		new Setting(containerEl)
			.setName('Log when a Log is Created')
			.setDesc('Whenever a daily log is created, do you want to log its creation in today\'s log (yeah, a bit meta) ')
			.setDisabled(this.plugin.settings.logLogCreation)
			.addToggle(cb => cb.onChange(value => {
                this.plugin.settings.logLogCreation = value;
                this.plugin.saveSettings();				
			}).setValue(this.plugin.settings.logLogCreation))



		// Tagged Event Logging Settings
		// ----------------------------------------------------------------------------------------------
		containerEl.createEl('h3', {text: 'Tagged Event Logging Settings'});

		new Setting(containerEl)
			.setName('Enable Tagged Event Logging')
			.setDesc('Turns on the ability to add tagged logging of events into specific headers inside the daily log file')
			.setDisabled(this.plugin.settings.taggedEventLogsEnabled)
			.addToggle(cb => cb.onChange(value => {
                this.plugin.settings.taggedEventLogsEnabled = value;
                this.plugin.saveSettings();				
			}).setValue(this.plugin.settings.taggedEventLogsEnabled))


		new Setting(containerEl)
			.setName('Default Tagged Event Header')
			.setDesc('If an incoming tagged event is not sent to a specific header location, use this header by default')
			.addText(text => text
				.setPlaceholder(this.plugin.settings.taggedEventLogsDefaultHeader)
				.setValue(this.plugin.settings.taggedEventLogsDefaultHeader)
				.onChange(async (value) => {
					this.plugin.settings.taggedEventLogsDefaultHeader = value;
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
