// +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=
// obsidian-z2k-daily-logs Obsidian Plugin
// +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=
//
// File: fields.ts
//    - This source file contains support routines for performing {{field}} replacement work 
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
import { App, TFile, Notice, TFolder, Vault } from "obsidian";
import { toUnicode } from "punycode";




// ======================================================================================================
// Interfaces and Constants
// ======================================================================================================

// Constants
export const DEFAULT_Z2K_DATEFORMAT = "YYYY-MM-DD"

// Errors
export class Z2KFieldsExpansionError extends Error {}



// ======================================================================================================
// {{Field}} Replacement Routines
// ======================================================================================================
// 


/* ------------------------------------------------------------------------------------------------------ */
// expandFieldsInFile
/* ------------------------------------------------------------------------------------------------------ */
/**
 * This function takes a TFile and expands all of the {{fields}} that require no additional data. It saves 
 * the file when done.
 *
 * @param  {Moment} dateToUse - a Moment variable representing the day being used for time based fields
 * @param  {TFile} cardFile - a TFile that holds the card file to flesh out
 * @returns Promise - true if it succeeded, false if it failed
 */  
export async function expandFieldsInFile(dateToUse: Moment, cardFile: TFile, preferredDateFormat: string = DEFAULT_Z2K_DATEFORMAT): Promise<Boolean> {

    // Sanity checking
    // if (this.settings.debugLevel >= 100) { console.log(this.manifest.name + ": fleshOutDailyNoteAutomatedFields() - Entered"); }
    if ((cardFile == null) || (!(cardFile instanceof TFile))) { 
        throw new Z2KFieldsExpansionError("Z2K Logs: Attempted to flesh out the fields in a card file, but failed to find the file."); 
        // new Notice("Attempted to flesh out the fields in a card file, but failed to find the file.")
    }
        
    try {
        const { app } = window;

        // Replace Z2K's Automated Fields
        let cardFileData = await (<any>app).vault.read(cardFile);
        if (typeof cardFileData == 'undefined') {
            // Let's consider this as a safe fail - it may be empty, in which case we simply fail quietly with no exception
            return false;
        }

        // Now pass the card's data to sister function that does the actual {{field}} expansion
        cardFileData = expandFieldsInText(dateToUse, cardFileData, preferredDateFormat, cardFile.basename);
        
        // Now write the file to disk and exit
        await (<any>app).vault.adapter.write(cardFile.path, cardFileData);
        return true;

    }
    catch (err) {
        console.error("Failed to expand fields in a card file: " + cardFile.path + "/" + cardFile.name + cardFile.extension, err);
        new Notice("Z2K Log Plugin: Internal error fleshing out automated fields in a card file. Check console output.");
        return false;
    }
}


/* ------------------------------------------------------------------------------------------------------ */
// expandFieldsInText
/* ------------------------------------------------------------------------------------------------------ */
/**
 * This function takes a block of text and expands all of the {{fields}} that require no additional 
 * data.
 *
 * @param  {Moment} dateToUse - a Moment variable representing the day being used for time based fields
 * @param  {string} cardData - a string that holds the card data to flesh out
 * @returns {string} Pomise - the resultant string, or empty string "" if experienced an error
 */  
 export function expandFieldsInText(dateToUse: Moment, cardData: string, preferredDateFormat: string = DEFAULT_Z2K_DATEFORMAT, cardBasename: string = ""): string {

    // Integrity Check
    if (typeof cardData == 'undefined') { return ""; }

    // Standard Fields
    cardData = cardData
        .replace(/{{\s*timeOfDay\s*}}/gi, dateToUse.format("HH:mm"))
        .replace(/{{\s*timestamp\s*}}/gi, dateToUse.format("YYYYMMDDHHmm"))
        .replace(/{{\s*timestampLink\s*}}/gi, "[[" + dateToUse.format("YYYYMMDDHHmm") + "]]")
        .replace(/{{\s*timestampSec\s*}}/gi, dateToUse.format("YYYYMMDDHHmmss"))

        .replace(/{{\s*dateLink\s*}}/gi, "[[" + dateToUse.format(preferredDateFormat) + "]]")

        .replace(/{{\s*today\s*}}/gi, dateToUse.format(preferredDateFormat))
        .replace(/{{\s*todayLink\s*}}/gi, "[[" + dateToUse.format(preferredDateFormat) + "]]")
        .replace(/{{\s*yesterday\s*}}/gi, dateToUse.clone().subtract(1, "day").format(preferredDateFormat))
        .replace(/{{\s*yesterdayLink\s*}}/gi, "[[" + dateToUse.clone().subtract(1, "day").format(preferredDateFormat) + "]]")
        .replace(/{{\s*tomorrow\s*}}/gi, dateToUse.clone().add(1, "d").format(preferredDateFormat))
        .replace(/{{\s*tomorrowLink\s*}}/gi, "[[" + dateToUse.clone().add(1, "d").format(preferredDateFormat) + "]]")

        .replace(/{{\s*dayOfWeek\s*}}/gi, dateToUse.format("dddd"))
        .replace(/{{\s*dayOfWeekLink\s*}}/gi, "[[" + dateToUse.format("dddd") + "]]")
        .replace(/{{\s*weekNum\s*}}/gi, dateToUse.format("ww"))
        .replace(/{{\s*weekNumLink\s*}}/gi, "[[" + dateToUse.format("ww") + "]]")
        .replace(/{{\s*yrWeekNum\s*}}/gi, dateToUse.format("YYYY") + "-w" + dateToUse.format("ww"))
        .replace(/{{\s*yrWeekNumLink\s*}}/gi, "[[" + dateToUse.format("YYYY") + "-w" + dateToUse.format("ww") + "]]")

        .replace(/{{\s*title\s*}}/gi, cardBasename)
        .replace(/{{\s*titleLink\s*}}/gi, "[[" + cardBasename + "]]")
        .replace(/{{\s*cardTitle\s*}}/gi, cardBasename)
        .replace(/{{\s*cardTitleLink\s*}}/gi, "[[" + cardBasename + "]]")

        .replace(/{{\s*#Card\/Type\/Template\s*}}/gi, ".:Card/Activated");

    return expandDateFormatField(dateToUse, cardData, preferredDateFormat); // replaces the {{date:}} field
}


/* ------------------------------------------------------------------------------------------------------ */
// expandDateFormatField
/* ------------------------------------------------------------------------------------------------------ */
/**
 * This function takes a string and expands any fields in the format of {{date:xxxxx}} 
 * 
 * 
 * @param  {Moment} dateToUse - a Moment variable representing the day being used for time based fields
 * @param  {string} cardData - a string that holds the card data to flesh out
 * @param  {string} defaultDateFormat - the date format to use if one is not specified
 * @returns {string} Pomise - the resultant string, or empty string "" if experienced an error
 */  
export function expandDateFormatField(dateToUse: Moment, strData: string, defaultDateFormat: string = DEFAULT_Z2K_DATEFORMAT): string {
    const moment = window.moment;

    // Example: {{date+1d:YYYYMMdd}} -->
    //        _ = {{date+1d:YYYYMMdd}}
    //        formatType = "date"
    //        calc = "+1d"
    //        timeDelta = "+1"
    //        unit = "d"
    //        momentFormat = "YYYYMMdd"

    // Example: {{date:YYYY-MM-dd}} -->
    //        _ = {{date:YYYYMMdd}}
    //        formatType = "date"
    //        calc = ""
    //        timeDelta = ""
    //        unit = ""
    //        momentFormat = "YYYY-MM-dd"

    // Example: {{date}} -->
    //        _ = {{date}}
    //        formatType = "date"
    //        calc = ""
    //        timeDelta = ""
    //        unit = ""
    //        momentFormat = ""

    return strData.replace(
        /{{\s*(date|time|dateLink)\s*(([+-]\d+)([yqmwdhs]))?\s*(:.+?)?}}/gi,
        (_, formatType, calc, timeDelta, unit, momentFormat) => {
          const now = moment();
          const currentDate = dateToUse.clone().set({
            hour: now.get("hour"),
            minute: now.get("minute"),
            second: now.get("second"),
          });
          if (calc) {
            currentDate.add(parseInt(timeDelta, 10), unit);
          }
      
          let resultData = "";
          if (momentFormat) {
            resultData = currentDate.format(momentFormat.substring(1).trim());
          } else {
            resultData = currentDate.format(defaultDateFormat);
          }

          if (formatType == "dateLink") {
              resultData = "[[" + resultData + "]]";
          }
          return resultData;
        }
    );
}
   




  