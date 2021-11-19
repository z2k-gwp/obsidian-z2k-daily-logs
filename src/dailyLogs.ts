// +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=
// obsidian-z2k-daily-logs Obsidian Plugin
// +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=
//
// File: dailyLogs.ts
//    - This source file contains code for working with daily logs
//    - Please see https://github.com/z2k-gwp/obsidian-z2k-daily-logs for more information
//
//

// ======================================================================================================
// Imports
// ======================================================================================================
// 

// 3rd Party Imports
import type { Moment } from "moment";

// Obsidian Imports
import { App, normalizePath, Notice, TFile, TFolder, Vault } from "obsidian";

// Obsidian Third Party Plugins
import { getDateFromFile, getDateUID, getTemplateInfo, IPeriodicNoteSettings } from "obsidian-daily-notes-interface";

// Internal Plugin Imports
import { expandFieldsInFile, expandFieldsInText, expandDateFormatField } from "./fields";
import { IZ2KDailyLogsSettings } from "./settings";
import { getCardPath } from "./cards";



// ======================================================================================================
// Interfaces and Constants
// ======================================================================================================

// Constants
export const Z2K_PLUGIN_DAILY_LOGS = "obsidian-z2k-daily-logs";

// Errors
export class Z2KDailyLogsPluginMissingError extends Error {}
export class Z2KDailyLogsFolderMissingError extends Error {}



// ======================================================================================================
// Daily Log Routines
// ======================================================================================================
// 


/* ------------------------------------------------------------------------------------------------------ */
// getDailyLogSettings
/* ------------------------------------------------------------------------------------------------------ */
/**
 * Fetches the current plugin settings from the Z2K Daily Logs plugin
 * Note: Using a separate function here under the assumption that one day we will separate out this 
 * code into a Z2K Daily Logs library
 * 
 * @returns An IZ2KDailyLogsSettings interface
 * 
 */
export function getDailyLogSettings(): IZ2KDailyLogsSettings {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { internalPlugins, plugins } = <any>window.app;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const theDailyLogsPlugin = (<any>window.app).plugins.getPlugin(Z2K_PLUGIN_DAILY_LOGS);
      if (!(theDailyLogsPlugin && theDailyLogsPlugin.settings)) { throw new Z2KDailyLogsPluginMissingError("Z2K Logs: Failed to find Daily Logs Plugin and its settings"); }
      return theDailyLogsPlugin.settings;
    } catch (err) {
      console.info("Z2K Logs: Could not find the daily log settings interface (is the Daily Logs plugin installed and enabled?)", err);
      return null;
    }
}

/* ------------------------------------------------------------------------------------------------------ */
// getDailyLogPeriodicSettings
/* ------------------------------------------------------------------------------------------------------ */
/**
 * Fetches the current plugin settings from the Z2K Daily Logs plugin - just the "daily notes" interface.
 * Note: this will also perform the field expansion for dates in each of the settings
 * 
 * @returns An IPeriodicNoteSettings interface
 * 
 */
export function getDailyLogPeriodicSettings(date: Moment): IPeriodicNoteSettings {

    // Get the Daily Log Settings
    const theDailyLogSettings = getDailyLogSettings();
    if (!(theDailyLogSettings && theDailyLogSettings.dailyNotesSettings)) { 
      // error logging is done already - just pass the error up
      return null; 
    }

    // Expand the daily log folder for {{date:}} fields
    let expandedPeriodicNotesSettings = theDailyLogSettings.dailyNotesSettings;
    expandedPeriodicNotesSettings.format = expandDateFormatField(date, expandedPeriodicNotesSettings.format);
    expandedPeriodicNotesSettings.template = expandDateFormatField(date, expandedPeriodicNotesSettings.template);
    expandedPeriodicNotesSettings.folder = expandDateFormatField(date, expandedPeriodicNotesSettings.folder);

    // Construct and return a new IPeriodicNoteSettings
    return expandedPeriodicNotesSettings;
}


/* ------------------------------------------------------------------------------------------------------ */
// createDailyLog
/* ------------------------------------------------------------------------------------------------------ */
/**
 * This function creates a Daily Log for the passed day. It also will handle {{field}} replacement work.
 * 
 * Credit: https://github.com/liamcain/obsidian-daily-notes-interface ( https://github.com/liamcain )
 * 
 * @returns A TFile of the log file.
 */
export async function createDailyLog(date: Moment): Promise<TFile> {
    const app = window.app as App;
    const { vault } = app; 
    const moment = window.moment;
  
    // Get the daily log settings 
    const theDailyLogSettings = getDailyLogSettings();
    const theDailyLogPeriodicSettings = getDailyLogPeriodicSettings(date);
    if (!(theDailyLogPeriodicSettings)) { 
      console.error("Z2K Error: Failed to create daily log file - could not find the Daily Log Plugin and its settings.");
      new Notice("Z2K Logs: Unable to create new log file. Is the Z2K Daily Log plugin installed?");
      return null;
    }      

    let normalizedPath = "";

    try {

      // Load up the template file
      const [templateContents, IFoldInfo] = await getTemplateInfo(theDailyLogPeriodicSettings.template);

      // Figure out where to save it 
      const filename = theDailyLogPeriodicSettings.format; // date is already expanded 
      normalizedPath = await getCardPath(theDailyLogPeriodicSettings.folder, filename);
    
      // Replace out the {{fields}} in the source template
      let updatedTemplateContents = expandFieldsInText(date, templateContents, theDailyLogSettings.generalDateFormatString, filename);

      // Now create the new log
      const createdFile = await vault.create(
        normalizedPath,
        updatedTemplateContents);
  
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (app as any).foldManager.save(createdFile, IFoldInfo);
  
      return createdFile;

    } catch (err) {
      console.error(`Failed to create file: '${normalizedPath}'`, err);
      new Notice("Unable to create new file.");
    }
  }
  

/* ------------------------------------------------------------------------------------------------------ */
// getDailyLog
/* ------------------------------------------------------------------------------------------------------ */
/**
 * This function returns a single log file for a give date. It uses a pre-fetched cache for quick access
 * (i.e. caller will need to first populate the dailyLogs cache with the getAllDailyLogs() function)
 * 
 * Credit: https://github.com/liamcain/obsidian-daily-notes-interface ( https://github.com/liamcain )
 * 
 * @returns A TFile of the log file.
 */
export function getDailyLog(date: Moment, dailyNotes: Record<string, TFile>): TFile {

    return dailyNotes[getDateUID(date, "day")] ?? null;

}



/* ------------------------------------------------------------------------------------------------------ */
// getAllDailyLogs
/* ------------------------------------------------------------------------------------------------------ */
/**
 * This function gathers and caches a list of all daily logs in the current daily log folder
 * 
 * Credit: https://github.com/liamcain/obsidian-daily-notes-interface ( https://github.com/liamcain )
 * 
 * @returns A list of the obsidian.TFile's for all of the log folder's log files
 */
export function getAllDailyLogs(date: Moment) {
    const { vault } = window.app;
    const { folder } = getDailyLogPeriodicSettings(date); 
    const dailyLogsFolder = vault.getAbstractFileByPath(normalizePath(folder)) as TFolder;

    if (!dailyLogsFolder) {
        throw new Z2KDailyLogsFolderMissingError("Z2K Logs: Failed to find the daily logs folder: '" + folder + "'");
    }
    
    const dailyLogs: Record<string, TFile> = {};
    Vault.recurseChildren(dailyLogsFolder, (log) => {
        if (log instanceof TFile) {
            const date = getDateFromFile(log, "day");
            if (date) {
                const dateString = getDateUID(date, "day");
                dailyLogs[dateString] = log;
            }
        }
    });
    return dailyLogs;
}

