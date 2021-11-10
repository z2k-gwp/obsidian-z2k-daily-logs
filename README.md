## Z2K Daily Logs - An Obsidian plugin

### Overview
This [Obsidian](https//obsidian.md) plugin creates a "daily notes" file through a variety of means. It behaves similar to the core "Daily notes" plugin (or Liam's excellent "Periodic Notes" plugin), but extends it with several new features:

- Includes a number of methods by which a daily note/log file can be created automatically each day
- Supports the ability to [create daily log files for other days besides today](https://github.com/z2k-gwp/obsidian-z2k-daily-logs/wiki/Creating-Past-Log-Files)
- Supports [additional premade {{fields}} for autoreplacement](https://github.com/z2k-gwp/obsidian-z2k-daily-logs/wiki/Automated-Field-Replacements) (e.g. `timestamp`, `dayOfWeek`, `weekNum`)
- Supports [more advanced log file naming conventions](https://github.com/z2k-gwp/obsidian-z2k-daily-logs/wiki/Advanced-File,-Folder-and-Template-Naming) with the `{{dateFormat:}}` field (e.g. have yearly subfolders, have daily log+notes simultaneously, have templates for each day of the week)
- (Future:) Support for fast access to the daily log file through a variety of means (e.g. URI, shortcuts, hotkeys)
- (Future:) Support for quick insertion of logging information into the current daily log (e.g. URI, shortcuts, hotkeys) (ala Lumberjack)
- (Future:) Supports a cutoff time for those that work late at night
- (Future:) Log Chains, a tool to set up a whole series of automated log events to pull data into your daily log as part of the automated systems. This gets you one step closer to a fully automated Quantified Self.

### More Info
- **Full documentation can be found on the [plugin's wiki pages](https://github.com/z2k-gwp/obsidian-z2k-daily-logs/wiki)**
- Aside: While this plugin is intended for use as part of the larger [Z2K System](https://z2k.dev), it can be [used in ordinary Obsidian vaults](https://github.com/z2k-gwp/obsidian-z2k-daily-logs/wiki/Using-this-plugin-outside-of-Z2K) as well.
- Protecting one's privacy is "Job Number One" in Z2K plugins and tools. Read our [privacy mission statement](https://github.com/z2k-gwp/z2k-gwp/blob/main/Privacy.md)

&nbsp;
### What is the difference between a Daily Note and a Daily Log?
Many people use a daily note to not just hold informational notes, but also data logging for their daily lives. For instance, some Obsidian users use the daily note/log to hold [Quantified Self](https://en.wikipedia.org/wiki/Quantified_self) data from their phones, smart watches, the web, and their custom sensors. This data can come from a variety of external apps at any time. The Z2K System itself incorporates data logging into its process as one of it primary pillars.

In order for data logging to work, it is useful to have each day's log file to be ready for use at the start of the day, perhaps before you have even had the chance to load Obsidian directly. For instance, if you are logging the weather or your sleep time into your log file automatically in the morning, you'll need the daily log file to be already created and ready to receive the data the moment you wake up. 

&nbsp;
### Automated Log Creation
This plugin allows exactly for that usage model by providing several failsafe methods that can be used together to ensure that the log file is ready to received automated data, even before you start the day.

The plugin supports [a number of ways](https://github.com/z2k-gwp/obsidian-z2k-daily-logs/wiki/Sample-Log-Creation-Triggers) to trigger creating the daily log file, including: 
- Set the plugin to automatically create the log file at a [given time](https://github.com/z2k-gwp/obsidian-z2k-daily-logs/wiki/Time-Trigger)
- Use the plugin's URI interface to trigger the log creation through an external application (e.g. cron job, Task Scheduler, iOS Shortcuts)
- Automatically upon [Obsidian startup](https://github.com/z2k-gwp/obsidian-z2k-daily-logs/wiki/Startup-Trigger)
- Use the Obsidian [command interface](https://github.com/z2k-gwp/obsidian-z2k-daily-logs/wiki/Command-Trigger) (e.g. assigned command to a hotkey)
- Use the plugin's [ribbon](https://github.com/z2k-gwp/obsidian-z2k-daily-logs/wiki/Ribbon-Trigger) button
- (Future:) Use the plugin's published library to create log files and log events from other plugins
- (Future:) Create tomorrow's daily login ahead of time with many of the above methods

