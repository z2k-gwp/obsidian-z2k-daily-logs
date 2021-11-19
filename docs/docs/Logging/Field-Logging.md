The Z2K Daily Logs plugin supports [multiple ways](https://github.com/z2k-gwp/obsidian-z2k-daily-logs/wiki/Event-Logging) to log events throughout the day. One method is via "Field Logging". 

## Overview
- Field logging is used to replace a custom `{{field}}` inside your daily log
- Like all [[Event Logging]] techniques, Field Logging is intended to capture data from external sources (e.g. iOS Shortcuts, other plugins, etc.)
- Field logging is useful for one-off events that occur each day
- Field events can consist of multiple lines, and have #hashTag tagging inside them
- Fields are replaced upon use, and thus can only be used once. 
    - Postfixing a special tag to the field name will allow for subsequent entries (see *Field Formatting* Section below for details)
- The structure of field events is application dependent - anything passing Field Event data is responsible for how the data appears
- Example tagged events: Gratitude Focus for the day, Journal Prompting, Quote of the Day


## Field Formatting
- The [[Fields]] used by [[Field Logging]] are placeholders for external data. As such, the more advanced [[Interactive Fields]] formatting is not relevant to Field Logging. Therefore, Field Logging simply uses the the `{{fieldName}}` format.
- Note: field names are *not* case sensitive
- Note: you can add whitespace around the field name
 
### Insertion Point
- Event Logging does have one special formatting technique. If you have an event you wish to log multiple times through the day, you may wish to be able to reuse and Event Field. By postfixing one of the following keywords, the daily log plugin keep the field in place for future insertions.

| PostFix               | Example                                    | 
| --------------------- | -------------------------------------------|
| `-InsertionPointAbove`| `{{HourlyMood-InsertionPointAbove}}`       |
| `-InsertionPointBelow`| `{{InterestingQuotes-InsertionPointBelow}}`|

You can use the Insertion Point postfix formatting *either* on the front end or the back end and it will work. For instance, 
- in your [[Daily Log Template]], you can have a field for `{{InterestingQuotes}}`, but in a URI command ask for a field logging for the field `{{Interesting Quotes-InsertionPointBelow}}` and it will find the `{{InterestingQuotes}}` field, replace it with the passed text, and then will automatically add a new `{{InterestingQuotes}} field at the end. 
- similarly, you can have a `{{HourlyMood-InsertionPointAbove}}` field in your [[Daily Log Template]] and an iOS Shortcut can use URI to replace the field `{{HourlyMood}}`. The plugin will match it up to the field and replace it and still keep the `{{HourlyMood-InsertionPointAbove}}` field in the output for the next time. 