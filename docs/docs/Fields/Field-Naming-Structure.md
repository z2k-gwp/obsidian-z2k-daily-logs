# Overview
[[Fields]] are the backbone of the Daily Logs plugin. This page describes the naming structure of fields used by the plugin. While most fields will simply follow the structure `{{fieldName}}`, more advanced field replacements are possible.

# Field Naming Structure
Here is the general naming structure of a field, including all supported options:

> `{{`fieldname[+InsertionFlag][-LinkFlag[#HeaderName]][:Description][::DefaultValue]`}}`

Each component are discussed in more detail below:

&nbsp;
## Brackets
All fields are marked by curly braces. 

**Devilish Details**:
- Fields can have white space directly after `{{` or before `}}` and it will be ignored. , For example, `{{  timestamp  }}` is a valid field.

&nbsp;
## FieldName
The FieldName simply gives a field a unique name. This is the one required attribute of a field.

**Devilish Details**:
- Field names should not have spaces. In some places they will still work, but in other places not. Best just to avoid it.
- The fields are case insensitive, e.g. `{{TIMEStamp}}` will still be replaced with the timestamp field name.
- Some field names are predefined "system" names and cannot be used. See [[Automated Fields]] for a complete list.
- `{{Fields}}` can be placed in multiple places in a file and they will all be replaced

&nbsp;
## InsertionFlag (Insertion Points)
- The Insertion Flag is appended to the name of the Field and flags the field to be treated as an "insertion point". 
- Insertion points are used for fields that will have repeated expansion. When a field is flagged as an insertion point, the field will be expanded and then a new `{{fieldName}}` will be inserted into the expanded text - thus providing a method for repeated field expansion.
- Insertion points are useful for logging repeated data - e.g. hourly heartrate, hourly mood tracking
- The insertion flag must be one of the following:
    - `+Above` - Places the expanded text above the field marker. Used to make chronological record lists.
    - `+Below` - Places the expanded text below the field marker. Used to make reverse-chronological record lists. 

**Examples**:
- `{{HourlyAverageHeartRate+Below}}`
- `{{HourlyMoodLogEntry+Above}}`
- `{{HourlyCardPrompting+Above-Link}}` -- Is both an insertion point and will be made into a link

**Devilish Details**:
- Only "Above" and "Below" are supported. If neither marker is used, then the plus will be interpreted as part of the fieldname
- Insertion Flags are not allowed on [[Automated Fields]]. Issue a feature request if this use case is of interest.
- `above` and `below` are case insensitive

&nbsp;
## LinkFlag (Linked Fields)
- The Link Flag is appended to the name of a Field and flags the field to be treated as an wikilink. 
- Link flags will result in the field to be included in `[[` `]]` after expansion. 
- The Link Flag is simply `-Link` (case insensitive)
- Using `{{fieldName-Link}}` is functionally equivalent to using `[[{{fieldname}}]]` but there are reasons why to use the Link Flag version:
    1. Your template text file will register as a valid link, creating {{fieldname}} links in your links list.
    2. If you want to use the #Header, you will need to use the Link Flag.
- Link Flags are useful for whenever you wish to make a field reference another card in the system, for instance a journal prompt, a daily log, etc.

**HeaderName**
- If you use the Link Flag, you can then append the flag with a `#` Header title to be referenced in the final output.
- Thus, if you have the field `{{fieldName-Link#My Header}}`, and the field is to be replaced with `foo`, the final output would be `[[foo#My Header]]`

**Examples**:
- `{{JournalPrompts-Link}}`
- `{{today-Link}}` - applies the Link Flag to an [[Automated Fields]], e.g. `[[2021-12-31]]`
- `{{today-Link#Passing Thoughts}}` - this would resolve to `[[2021-12-31#Passing Thoughts]]`

**Devilish Details**:
- The Header Name must follow the `-Link` marker. 

