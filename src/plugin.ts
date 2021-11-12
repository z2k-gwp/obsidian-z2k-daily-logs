// +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=
// obsidian-z2k-daily-logs Obsidian Plugin
// +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=
//
// File: plugin.ts
//    - This source file contains the primary plugin class
//    - Please see https://github.com/z2k-gwp/obsidian-z2k-daily-logs for more information
//
//

// ======================================================================================================
// Imports
// ======================================================================================================
// 

// 3rd Party Imports
import type { Moment } from "moment";
import { toUnicode } from "punycode";

// Obsidian Imports
import { App, Plugin, Editor, MarkdownView, Notice, TFile } from "obsidian";

// Obsidian Third Party Plugins
import { appHasDailyNotesPluginLoaded, getDailyNoteSettings } from "obsidian-daily-notes-interface";

// Internal Plugin Imports
import { showContextMenu } from "./ui";
import { DEFAULT_SETTINGS, IZ2KDailyLogsSettings, Z2KDailyLogsSettingTab } from "./settings";
import { getAllDailyLogs, getDailyLog, createDailyLog }  from "./dailyLogs";
import { expandFieldsInFile } from "./fields"
import { logAutomatedEvent } from "./eventLogging"
import { }  from "./utils";




// ======================================================================================================
// globals
// ======================================================================================================
// 
declare global {
    interface Window {
      app: App;
      moment: Moment;
    }
  }


  
// ======================================================================================================
// Z2KDailyLogsPlugin Plugin Class
// ======================================================================================================
// 
export default class Z2KDailyLogsPlugin extends Plugin {

    // My Props and locals
	public settings: IZ2KDailyLogsSettings;
    public isInitiallyLoaded: boolean;
	private ribbonEl: HTMLElement;


	/* ------------------------------------------------------------------------------------------------------ */
	// onload
	/* ------------------------------------------------------------------------------------------------------ */
	/**
	 * Performed when application first loads the plugin
	 * @remarks
	 * - This is done fairly early and synchronously - so set things up and then get out of the way. 
	 * - Hook the onLayoutReady event to do more complicated and async tasks.
	 */
     async onload(): Promise<void> {

		// Initialization
		this.ribbonEl = null;

		// Bind to updateSettings event 
        this.saveSettings = this.saveSettings.bind(this);

		// Load our settings first, as this controls what we do here.
		await this.loadSettings();

		// Log debug info
		if (this.settings.debugLevel >= 100) { console.log(this.manifest.name + ": Loading"); }

		// Bind to the onLayoutReady event so we can continue our initialization once the system has settled down.
		this.app.workspace.onLayoutReady(this.onLayoutReady.bind(this));

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		if (this.settings.debugLevel >= 10) {
			var loadMoment = (window as any).moment(Date.now())
			let statusBarItemEl = this.addStatusBarItem();
			// This is of course obnoxious so please don't do this in a real plugin:
			statusBarItemEl.setText('Z2K Large Template Plugin Loaded on ' + loadMoment.format('YYYY-MM-DD hh:mm:ss'));
		}

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new Z2KDailyLogsSettingTab(this.app, this));

	}


	/* ------------------------------------------------------------------------------------------------------ */
	// onLayoutReady
	/* ------------------------------------------------------------------------------------------------------ */
	/**
	 * Event handler for when the layout is done and the plugin can perform more intense actions
	 */
	 async onLayoutReady():Promise<void> {

		// Todo: I forced this to be a async declaration, but the source shows it as sync
		// Thus, I don't think this will allow be to create a synch call to createZ2KDailyLog()

		// Debug info - output to the console
		if (this.settings.debugLevel >= 100) { console.log(this.manifest.name + ": Layout is ready...."); }

		// Configure our stuff
		this.configureRibbonIcons();
		this.configureCommands();

		// So some action for your plugin
		if (this.settings.createLogOnStartup) { 
			const moment = (window as any).moment(Date.now());
			var dailyNote = await this.cmdCreateZ2KDailyLog(moment);
		}
	}


    
	/* ------------------------------------------------------------------------------------------------------ */
	// configureRibbonIcons
	/* ------------------------------------------------------------------------------------------------------ */
	/**
	 * Helper routine for configuring any ribbon icons we have
	 */
	private configureRibbonIcons() {
		this.ribbonEl?.detach();

		// Debug info - output to the console
		if (this.settings.debugLevel >= 100) { console.log(this.manifest.name + ": Configuring Ribbon Icons...."); }

		// Create our Ribbon Button (if configured to do so)
		if (this.settings.useRibbonButton) {

			// Default icons: 'logo-crystal', 'create-new', 'trash', 'search', 'right-triangle', 'document', 'folder', 'pencil', 'left-arrow', 'right-arrow', 'three-horizontal-bars', 'dot-network', 'audio-file', 'image-file', 'pdf-file', 'gear', 'documents', 'blocks', 'go-to-file', 'presentation', 'cross-in-box', 'microphone', 'microphone-filled', 'two-columns', 'link', 'popup-open', 'checkmark', 'hashtag', 'left-arrow-with-tail', 'right-arrow-with-tail', 'lines-of-text', 'vertical-three-dots', 'pin', 'magnifying-glass', 'info', 'horizontal-split', 'vertical-split', 'calendar-with-checkmark', 'sheets-in-box', 'up-and-down-arrows', 'broken-link', 'cross', 'any-key', 'reset', 'star', 'crossed-star', 'dice', 'filled-pin', 'enter', 'help', 'vault', 'open-vault', 'paper-plane', 'bullet-list', 'uppercase-lowercase-a', 'star-list', 'expand-vertically', 'languages', 'switch', 'pane-layout', 'install'
			this.ribbonEl = this.addRibbonIcon(
				'bullet-list', 
				"Create Today's Z2K Daily Log", 
				async (evt: MouseEvent) => {
					// Called when the user clicks the icon.
					const moment = (window as any).moment(Date.now());
					var dailyNote = await this.cmdCreateZ2KDailyLog(moment);
				});

			// Provide a class to the ribbon button in case someone wants to modify it with CSS (e.g. to hide)
			this.ribbonEl.addClass('z2k-daily-log-ribbon-class');

			// If we want to add a right-click context menu, here is how periodic notes did it:
			// this.ribbonEl.addEventListener("contextmenu", (ev: MouseEvent) => {
			// 	showFileMenu(this.app, this.settings, {
			// 	  x: ev.pageX,
			// 	  y: ev.pageY,
			// 	});

		}	
    }	


	/* ------------------------------------------------------------------------------------------------------ */
	// configureCommands
	/* ------------------------------------------------------------------------------------------------------ */
	/**
	 * Helper routine for configuring any commands that we want to expose to the user
	 */
	 private configureCommands() {

		// Debug info - output to the console
		if (this.settings.debugLevel >= 100) { console.log(this.manifest.name + ": Configuring Commands"); }

		// Add a command to trigger creating the daily log
		this.addCommand({
			id: 'z2k-logs-create-Z2K-daily-log',
			name: "Create today's daily log",
			callback: async () => {
				const currentMoment = (window as any).moment(Date.now());
				var dailyNote = this.cmdCreateZ2KDailyLog(currentMoment);
			}
		});

		// Add a command to trigger creating the daily log - for a different day based on what text is currently selected
		this.addCommand({
			id: 'z2k-logs-create-Z2K-daily-log-for-selection',
			name: "Create a daily log for the date selected in the editor",
			editorCallback: async (editor: Editor, view: MarkdownView) => {
				let editorMoment = (window as any).moment(editor.getSelection());
				if (editorMoment.IsValid()) { 
					let result = await this.cmdCreateZ2KDailyLog(editorMoment);
					editor.replaceSelection("[[" + result + "]]");	
				} else {
					new Notice("Could not figure out a date from the selected text.")
				}
			}
		});


		// Add a command to validate Z2K compliance in settings
		this.addCommand({
			id: 'z2k-logs-validate-z2k-settings',
			name: "Validate that Settings are Z2K Compliant",
			callback: async () => {
				const currentMoment = (window as any).moment(Date.now());
				this.cmdValidateSettingsAndZ2KConsistency();
			}
		});


	}	



	/* ------------------------------------------------------------------------------------------------------ */
	// onunload
	/* ------------------------------------------------------------------------------------------------------ */
	/**
	 * Event handler for when the plugin is just about to be unloaded
	 */
     onunload() {

		// Debug info - output to the console
		if (this.settings.debugLevel >= 100) { console.log(this.manifest.name + ": Unloading."); }

	}



	// ======================================================================================================
	// Managing Settings
	// ======================================================================================================

    async loadSettings(): Promise<void> {
    	this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

    async saveSettings(): Promise<void> {
		// Assumes caller has already updated the plugins setting values
        await this.saveData(this.settings);    
        this.onSettingsUpdate();
      }

    private onSettingsUpdate(): void {
		this.configureCommands(); // - Not really needed, as nothing has changed
		this.configureRibbonIcons();
	}



    
	// ======================================================================================================
	// Plugin Specific Functions
	// ======================================================================================================


	/* ------------------------------------------------------------------------------------------------------ */
	// cmdCreateZ2KDailyLog
	/* ------------------------------------------------------------------------------------------------------ */
	/**
	 * This function creates a daily note for the day.  
	 * 
	 * @remarks
	 * - If the note already exists, it simply returns quietly, passing the file handle to the existing note.
	 * 
	 * @example // Tip: to call on today's note:
	 *      const moment = (window as any).moment(Date.now());
	 *      let dailyNote = cmdCreateZ2KDailyLog(moment)
	 * 
	 * @param  {Moment} dateToCreate - a Moment variable representing the day to create
	 * @returns Promise - Filehandle to the actual note
	 */
	 async cmdCreateZ2KDailyLog(dateToCreate: Moment): Promise<TFile> { 

		let createdDailyNote = false;

		// Sanity Checks
		if (this.settings.debugLevel >= 100) { console.log(this.manifest.name + ": cmdCreateZ2KDailyLog() - Entered"); }

		// Get the daily note, and if not there, then create it
		if (this.settings.debugLevel >= 100) { console.log(this.manifest.name + ": cmdCreateZ2KDailyLog() - Check for previously created log file for the day."); }
		const allDailyNotes = getAllDailyLogs(dateToCreate);  // Daily Logs routines like to work off of a cache - this fetches the cache
		let dailyNote = getDailyLog(dateToCreate, allDailyNotes);
		if (dailyNote == null) {
			if (this.settings.debugLevel >= 100) { console.log(this.manifest.name + ": cmdCreateZ2KDailyLog() - Creating new log file for the day."); }
			dailyNote = await createDailyLog(dateToCreate);
			if (dailyNote !== undefined) {
				if (this.settings.debugLevel >= 100) { console.log(this.manifest.name + ": cmdCreateZ2KDailyLog() - Succesfully created new log file:" + dailyNote.path); }
				createdDailyNote = true;
			}
		}

		// Now flesh out the fields. This saves the file when done.
		// Scrap this - it is now done in createDailyLog
		// if (dailyNote != null) {
		// 	if (this.settings.debugLevel >= 100) { console.log(this.manifest.name + ": createLogOnStartup() - Fleshing out automated fields."); }
		//	var success = await expandFieldsInFile(dateToCreate,dailyNote, this.settings.generalDateFormatString);
		// }

        // Append the log file creation into today's daily log.
		// Reminder: if the user created a previous day's log, then the automated logging of the event is actually on a different log file.
		// Reminder: just let the function determine whether or not it is enabled, etc.
		if (createdDailyNote) {
			logAutomatedEvent("Created a starter daily log file for [[" + dailyNote.basename + "]]");
		}

		// Reminder:
		// console.log("Basename: " + dailyNote.basename);	// 2021-10-24
		// console.log("Name: " + dailyNote.name);			// 2021-10-24.md
		// console.log("Path: " + dailyNote.path);			// ~Logs/2021/2021-10-24.md

		return dailyNote;
	}



	/* ------------------------------------------------------------------------------------------------------ */
	// cmdValidateZ2KConsistency
	/* ------------------------------------------------------------------------------------------------------ */
	/**
	 * This function validates that the current plugin settings are "Z2K Compliant" - i.e. map into typical 
	 * Z2K configurations
	 * 
	 */
	 async cmdValidateSettingsAndZ2KConsistency(): Promise<void> { 

		if (this.settings.debugLevel >= 100) { console.log(this.manifest.name + ": cmdValidateZ2KConsistency() - Checking for Z2K Consistency in Settings"); }
	
		const { format, folder, template} = this.settings.dailyNotesSettings;

		// TODO: RequiredFolder needs fixing to support YYYY
		const requiredFormat = "{{date:YYYY-MM-DD}}", requiredFolder = "~Logs/{{date:YYYY}}", requiredTemplate = "~Templates/~Logs - Daily";

		// Validate Z2K Consistency
		let errorMessages = "";
		if ((format != requiredFormat) && (format != "")) {
			errorMessages += "The Date Format is not Z2K compliant. It should be '" + requiredFormat + "', but is currently '" + format + "'\n";
		}
		if (folder != requiredFolder) {
			errorMessages += "The New File Location is not Z2K compliant. It should be '"+ requiredFolder +"', but is currently '" + folder + "'\n";
		}
		if (template != requiredTemplate) {
			errorMessages += "The Template file Location is not Z2K compliant. It should be '"+ requiredTemplate +"', but is currently '" + template + "'\n";
		}
		if (errorMessages != "") {
			// Could use alert, but Notice is less obtrusive
			new Notice("The Daily Notes core plugin's settings are not Z2K Compliant:\n\n" + errorMessages);
		} else {
			new Notice("Success! Settings have been Validated as Z2K Compliant.");
		}

		// Validate Folder Exists
		// toDo();

		// Validate Template File Exists
		// toDo();

	 }


	/* ------------------------------------------------------------------------------------------------------ */
	// cmdCopySettingsFromDailyNotesPlugin
	/* ------------------------------------------------------------------------------------------------------ */
	/**
	 * This function copies the settings from the "Daily Notes" plugin
	 * 
	 * @returns Promise to a Boolean - True if the Daily Notes settings were successfully found and copy, False if not
	 */
	 async cmdCopySettingsFromDailyNotesPlugin(): Promise<Boolean> { 

		if (this.settings.debugLevel >= 100) { console.log(this.manifest.name + ": cmdCopySettingsFromDailyNotesPlugin() - Copying Settings from Daily Notes Plugin"); }
	
		if (!appHasDailyNotesPluginLoaded()) {
			new Notice("The Daily Notes core plugin is currently not loaded - and thus the plugin is unable to import the settings.");
			return false;
		}

		this.settings.dailyNotesSettings = getDailyNoteSettings();
		this.settings.dailyNotesSettings.format = "{{date:" + this.settings.dailyNotesSettings.format + "}}";

		new Notice("Success! Settings from the Daily Notes plugin have been imported.");
		
	 }


}
