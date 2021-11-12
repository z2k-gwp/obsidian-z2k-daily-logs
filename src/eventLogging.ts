// +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=
// obsidian-z2k-daily-logs Obsidian Plugin
// +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=
//
// File: eventLogging.ts
//    - This source file contains code for working with daily logs, specifically the logging of events
//      into the daily log.
//    - Please see https://github.com/z2k-gwp/obsidian-z2k-daily-logs for more information
//
//

// ======================================================================================================
// Imports
// ======================================================================================================
// 

// 3rd Party Imports
import type { Moment } from "moment";

// Internal Plugin Imports
import { IZ2KDailyLogsSettings } from "./settings";
import { getAllDailyLogs, getDailyLog, createDailyLog, getDailyLogSettings }  from "./dailyLogs";


// +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=
// +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=
//
//                                        AUTOMATED EVENT LOGGING
//
// +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=
// +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=

/* ------------------------------------------------------------------------------------------------------ */
// isAutomatedEventLoggingEnabled
/* ------------------------------------------------------------------------------------------------------ */
/**
 * Determines if automated event logging is enabled.
 * 
 * Note: Using a separate function here under the assumption that one day we will separate out this 
 * code into a Z2K Daily Logs library
 * 
 * @returns boolean: 
 * 
 */
export function isAutomatedEventLoggingEnabled(): boolean {

    // Get the Daily Log Settings
    const theDailyLogSettings = getDailyLogSettings();
    if (!(theDailyLogSettings && theDailyLogSettings.dailyNotesSettings)) { 
        // error logging is done already - just pass the error up
        return false; 
    }

    return theDailyLogSettings.automatedEventLogsEnabled;
       
}


/* ------------------------------------------------------------------------------------------------------ */
// logAutomatedEvent
/* ------------------------------------------------------------------------------------------------------ */
/**
 * Logs an automated event to today's log
 * 
 * @returns boolean if it did it 
 * 
 */
 export function logAutomatedEvent(logDescription: string): boolean {

    if (!isAutomatedEventLoggingEnabled()) { return false; }

    // OK, 
    const currentMoment = (window as any).moment(Date.now());

    // Fetch our formatting string

    // Format the log Description

    // Replace the automated remaining fields

    // Find our current log

    // Append the event to the end of the log
    // cardFileData += - currentMoment.Format("YYYY-MM-DD, HH:mm") + ", " + this.manifest.name + ", Fleshed out Automated Fields for [[]]"

    // Save the daily log back to the system

    return true;    
 }




// +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=
// +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=
//
//                                          TAGGED EVENT LOGGING
//
// +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=
// +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=



/* ------------------------------------------------------------------------------------------------------ */
// isTaggedEventLoggingEnabled
/* ------------------------------------------------------------------------------------------------------ */
/**
 * Determines if tagged event logging is enabled.
 * 
 * Note: Using a separate function here under the assumption that one day we will separate out this 
 * code into a Z2K Daily Logs library
 * 
 * @returns boolean: 
 * 
 */
 export function isTaggedEventLoggingEnabled(): boolean {

    // Get the Daily Log Settings
    const theDailyLogSettings = getDailyLogSettings();
    if (!(theDailyLogSettings && theDailyLogSettings.dailyNotesSettings)) { 
        // error logging is done already - just pass the error up
        return false; 
    }

    return theDailyLogSettings.taggedEventLogsEnabled;
       
}

