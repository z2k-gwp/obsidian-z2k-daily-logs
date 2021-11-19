## Existing solutions
The "Daily notes" core plugin has near universal appeal - its short and sweet and gets you most of the way there. There is also an advanced version of the plugin by Liam Cain's called "Periodic Notes" that also enables weekly and monthly notes as well. 

## Importing Daily Notes Configurations
When you install this plugin you will have the ability to import the daily log settings. We highly recommend doing so so that you can be up and running quickly. To re-import, simply issue the command "Z2K Daily Log - Creator: Import Daily Notes Settings" command. 

## Running Daily Notes or Periodic Notes Concurrently
There are no significant problems running Daily Notes or Periodic Notes concurrently with Z2K Log Creator. A few comments, however:
- Why would you?
   - A number of plugins use the daily notes core plugin to figure out where the daily notes reside. As such, it would be advisable to keep it installed.
- Create on Startup
   - You should use the "create on startup" setting on only one of the plugins, otherwise it is unpredictable which plugin will run first and create it - yielding inconsistent results. 
   - If you do not want the Z2K Daily Log plugin to be the one creating the log file, then of course, you will not see the benefits that come with it (e.g. advanced field expansions, log chains)
- Separate Daily Notes vs. Daily Logs
   - One interesting option is to use different configurations for daily notes and daily logs resulting in different files for daily notes and daily logs - this works just fine. See [[Advanced File, Folder and Template Naming]]
