# Overview
For daily logs to be useful, they need to be created as automatically as possible. That way the log file is ready to received automated data, even before you start the day. The plugin therefore can trigger the creation of the day's daily log file through a number of ways:

- Set the plugin to automatically create the log file at a [given time](https://github.com/z2k-gwp/obsidian-z2k-daily-logs/wiki/Time-Trigger)
- Use the plugin's URI interface to trigger the log creation through an external application (e.g. cron job, Task Scheduler, iOS Shortcuts)
- Automatically upon [Obsidian startup](https://github.com/z2k-gwp/obsidian-z2k-daily-logs/wiki/Startup-Trigger)
- Use the Obsidian [command interface](https://github.com/z2k-gwp/obsidian-z2k-daily-logs/wiki/Command-Trigger) (e.g. assigned command to a hotkey)
- Use the plugin's [ribbon](https://github.com/z2k-gwp/obsidian-z2k-daily-logs/wiki/Ribbon-Trigger) button
- Automatically trigger the log file creation upon the first attempt to write logging data to the daily log
- (Future:) Use the plugin's published library to create log files and log events from other plugins
- (Future:) Create tomorrow's daily login ahead of time with many of the above methods


# Sample Log Creation Triggers
Sample triggers include:
   - Triggering automatic log creation from MS Windows each night - [[Windows Trigger]]
   - Triggering automatic log creation from a Mac/Linux cron task - [[Cron Trigger]]
   - Triggering automatic log creation from iOS Shortcuts - [[Shortcuts Trigger]]
   - Triggering automatic log creation when Obsidian is Loaded - [[Startup Trigger]]
   - Triggering automatic log creation in Obsidian at a specific time - [[Time Trigger]]
   - Triggering log creation through a command or hotkey - [[Command Trigger]]
   - Triggering log creation through the ribbon bar - [[Ribbon Trigger]]

# Pro Tip
- emphasize in a pro tip that you can double up on these - by default it will not overwrite

