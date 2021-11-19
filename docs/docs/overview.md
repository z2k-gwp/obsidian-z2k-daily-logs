---
id: overview
title: Overview
sidebar_position: 1
tags: [Welcome, Top Level Overview]
slug: /
---
Welcome to the online documentation for the *Z2K Daily Logs* [Obsidian](https://obsidian.md) Plugin. 

This [Obsidian](https//obsidian.md) plugin creates and maintains daily log files for your Obsidian vault. It supercharges the concept of a Daily Note to be a data sink for everything happening each day.

## Mash Up for Obsidian Experts
Conceptually, this plugin combines some features found in:
- [Liam Cain](https://github.com/liamcain)'s Daily Notes plugin (or Liam's excellent [Periodic Notes](https://github.com/liamcain/obsidian-periodic-notes) plugin),
- [Ryan Murphy](https://github.com/ryanjamurphy)'s [Lumberjack](https://github.com/ryanjamurphy/lumberjack-obsidian) plugin, 
- [Vinzent03](https://github.com/Vinzent03)'s [Advanced URI](https://github.com/Vinzent03/obsidian-advanced-uri) plugin, and
- has similarities to [@SilentVoid13](https://github.com/SilentVoid13)'s phenomenal [Templater Plugin](https://github.com/SilentVoid13/Templater).

These plugins are all great and expands Obsidian's capabilities to the next level. The Z2K Daily Log plugin incoporates similar features together to supercharge [the Daily Note into a Daily *Log*](Interoperability/Daily-Note-vs-Daily-Log). It also adds new features not seen in the community plugins for expanded `{{field}}` processing, such as new [Automated Fields](Fields/Automated-Fields), [Interactive Fields](Fields/Interactive-Fields) and [Block Fields](Fields/Block-Fields). For [logging](Logging/Event-Logging), it adds new features for [Log Chains](Logging/Log-Chains) and other ways to insert remote data into the daily log.

&nbsp;
## What Are Some of the Things You Can Do With This Plugin?
To get a feel for what you can do with this plugin, here are some sample uses (caveat: most require some extra work - like iOS shortcuts):
- **Track your mood** on your phone every 2 hours
- Run a **templater code block every few hours** and insert the result into the daily log
- Select a **random journal prompt** and insert it into the log each morning
- **Auto-create a daily log early in the morning** with failsafes so that it is always ready to start receiving data
- Create a shortcut to **save running routes** into a daily log health section
- Create an event logger to **quickly record interesting vocabulary words** throughout the day
- Track your medicine or **food consumption** with an iOS shortcut
- **Run a series of obsidian and plugin commands automatically** via a cron or task scheduler job
- ... and many more - see [Sample Use Cases](Usage/use-cases) for ideas and implementation examples

&nbsp;
## Core Feature Set
Ok so what specifically does this plugin _do_? Here are the core features:

### **Daily Log Creation**:
   - Includes [a wide number of methods](LogCreation/Log-Creation-Triggers) to automatically create the daily log file each day
   - Supports the ability to [create daily log files for other days besides today](LogCreation/Creating-Past-Log-Files)
   - Supports [more advanced log file naming conventions](Advanced/File-Naming) with the `{{date:}}` field (e.g. have yearly subfolders, have daily log+notes simultaneously, have templates for each day of the week)

### **[Event Logging](Logging/Event-Logging)**:
   - Supports the ability to [add logging information](Logging/Event-Logging) from external sources to the daily log:
      1. [Append Logging](Logging/Append-Logging) - adding a single line of text at the end of the daily log (great for quick tracking)
      2. [Header Logging](Logging/Header-Logging) - inserting text into a specific header of the daily log
      3. [Field Logging](Logging/Field-Logging) - replacing a specific `{{field}}` in the daily log
   - Events can be logged via URI commands (e.g. for iOS Shortcuts, scripts), through hotkeys, or through the plugin API
   - (Future:) Support for Log Chains, a tool to set up a whole series of automated log events to pull data into your daily log as part of the automated systems. This gets you one step closer to a fully automated Quantified Self.

### **Robust {{[Fields](./Fields/Fields)}}**
   - Includes a wide variety of new field types:
      - Expanded set of [premade {{fields}} for autoreplacement](Fields/Automated-Fields) (e.g. `timestamp`, `dayOfWeek`, `weekNum`)
      - Ability to format fields with wikilinks `[[`Brackets`]]` after insertion (e.g. convert dates to links to previous log files)
      - Ability to use fields as repeated [Insertion Points](Fields/Field-Naming-Structure#insertionflag-insertion-points) for information (great for logging hourly or repeated events)
      - Ability to use [Block Fields](Fields/Block-Fields) to reuse blocks of text, code (e.g. templater), or features (e.g. buttons)
      - New **[Interactive Fields](Fields/Interactive-Fields) that prompt the user for logging information 

### **Daily Log Fast Access**:
   - (Future:) Support for fast write access to a specific section in the daily log file


&nbsp;
## Getting Started and Documentation
Get up and running fast by checking out:
- The [Getting Started](GettingStarted/getting-started) page
- The [Installation](GettingStarted/installation) page

Once you are up and running, check out:
- [Advanced Documentation](Documentation/documentation) for advanced concepts
- [Interoperability](Interoperability/) for how this plugin can play well with others

&nbsp;
## Gratitude
This plugin was developed with the guiding help of several rock-solid plugins in the Obsidian community. Many thanks to the following for the work they have done to help with this plugin:
- Obviously, the [Obsidian.md](https://obsidian.md) developers are rockstars (to minimize their distraction I will not even mention them by name - but everyone knows them already)
- [Liam Cain](https://github.com/liamcain)'s Daily Notes, [Periodic Notes](https://github.com/liamcain/obsidian-periodic-notes/blob/main/README.md) and Calendar are indispensable.
- [Ryan Murphy](https://github.com/ryanjamurphy)'s [Lumberjack](https://github.com/ryanjamurphy/lumberjack-obsidian) - a plugin for quick logging via URI functions
- [Vinzent03](https://github.com/Vinzent03)'s [Advanced URI](https://github.com/Vinzent03/obsidian-advanced-uri) - a plugin for advanced URI calls - very versatile and powerful 
- [SilentVoid13](https://github.com/SilentVoid13)'s [Templater Plugin](https://github.com/SilentVoid13/Templater) is a phenomenal tool for adding custom data into your daily log. 
- And to the many people on the Obsidian Discord Channels that offer their time to everyone to help make Obsidian not just an amazing piece of software, but a strong community (e.g. @Shabegone, @Murf)