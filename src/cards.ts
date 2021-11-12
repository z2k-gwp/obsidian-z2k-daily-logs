// +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=
// obsidian-z2k-daily-logs Obsidian Plugin
// +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=
//
// File: cards.ts
//    - This source file contains code for working with Z2K Cards
//    - Please see https://github.com/z2k-gwp/obsidian-z2k-daily-logs for more information
//
//

// ======================================================================================================
// Imports
// ======================================================================================================
// 

// 3rd Party Imports

// Obsidian Imports
import { App, normalizePath, Notice, TFile, TFolder, Vault } from "obsidian";


/* ------------------------------------------------------------------------------------------------------ */
// join
/* ------------------------------------------------------------------------------------------------------ */
/**
 * This function joins path segments into a consolidated path
 * 
 * Credit: @creationix/path.js
 * 
 * @param  {string} segments[] - parts of the path
 * @returns A string containing the full path
 */
export function join(...partSegments: string[]): string {
    // Split the inputs into a list of path commands.
    let parts = [];
    for (let i = 0, l = partSegments.length; i < l; i++) {
      parts = parts.concat(partSegments[i].split("/"));
    }
    // Interpret the path commands to get the new resolved path.
    const newParts = [];
    for (let i = 0, l = parts.length; i < l; i++) {
      const part = parts[i];
      // Remove leading and trailing slashes
      // Also remove "." segments
      if (!part || part === ".") continue;
      // Push new path segments.
      else newParts.push(part);
    }
    // Preserve the initial slash if there was one.
    if (parts[0] === "") newParts.unshift("");
    // Turn back into a single string path.
    return newParts.join("/");
  }
  
/* ------------------------------------------------------------------------------------------------------ */
// basename
/* ------------------------------------------------------------------------------------------------------ */
/**
 * This function returns the basename of a file/path+file
 * 
 * @example  basename("foo\bar.md") === "bar"
 * 
 * @param  {string} segments[] - parts of the path
 * @returns A string containing the full path
 */  
export function basename(fullPath: string): string {
    let base = fullPath.substring(fullPath.lastIndexOf("/") + 1);
    if (base.lastIndexOf(".") != -1)
      base = base.substring(0, base.lastIndexOf("."));
    return base;
}
  
/* ------------------------------------------------------------------------------------------------------ */
// ensureObsidianFolderExists
/* ------------------------------------------------------------------------------------------------------ */
/**
 * This function ensures that a folder actually exists in an Obsidian Vault. If it doesnt then it will 
 * create the folder.
 * 
 * @param  {string} path - path to a folder
 * @returns A string containing the full path
 */  
 export async function ensureObsidianFolderExists(path: string): Promise<void> {
    const dirs = path.replace(/\\/g, "/").split("/");
    dirs.pop(); // remove basename
  
    if (dirs.length) {
      const dir = join(...dirs);
      if (!window.app.vault.getAbstractFileByPath(dir)) {
        await window.app.vault.createFolder(dir);
      }
    }
  }
  
  


/* ------------------------------------------------------------------------------------------------------ */
// getCardPath
/* ------------------------------------------------------------------------------------------------------ */
/**
 * This function creates a Daily Log for the passed day. It also will handle {{field}} replacement work.
 * 
 * Credit: https://github.com/liamcain/obsidian-daily-notes-interface ( https://github.com/liamcain )
 * 
 * @param  {string} directory - the directory that contains the card
 * @param  {string} filename - the filename of the card 
 * @returns A Promise to a string contained the full path to a card
 */
 export async function getCardPath(directory: string, filename: string): Promise<string> {
    if (!filename.endsWith(".md")) {
      filename += ".md";
    }
    const path = normalizePath(join(directory, filename));
    await ensureObsidianFolderExists(path);
    return path;
}



