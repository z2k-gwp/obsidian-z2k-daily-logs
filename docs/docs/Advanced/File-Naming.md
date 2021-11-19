With the `{{date:}}` field being built into the log filename, template and folder settings, it opens up some nice features for advanced users. Please see the [automated fields page](https://github.com/z2k-gwp/obsidian-z2k-daily-logs/wiki/Automated-Field-Replacements#date-based-automated-fields) for more details on the `{{date:}}` field format. 

For instance:

&nbsp;
## Have Daily Notes alongside Daily Logs
If you leave your daily notes as "YYYY-MM-DD", you can specify the name of your daily log files to be "`{{date:YYYY-MM-DD}} - Log`", which will create a separate log file for each day. 

&nbsp;
## Have Daily Logs be grouped into yearly folders
If you want to save each year's worth of logs (as the Z2K default configuration does) into a separate folder, use the setting "`~Logs\{{date:YYYY}}`" for the folder name in the Z2K Daily Log plugin settings page.

&nbsp;
## Have Weekly Templates
Let's say you have different things you want included in your daily log file according to the day of the week. Then just create different log template files and use the setting "`~Templates\~Logs - Daily - {{date:dddd}}`"