
## What are Fields?
Fields are the workhorse of Daily Logs. They represent placeholders inside the daily log that will be filled in as the day progresses. Fields are denoted with `{{` `}}` curly braces and have field naming details in between that control how the fields are replaced with data. 

## Types of Fields
There are several 'flavors' of fields in the Z2K Daily Logs Plugin:
- [[Automated Fields]] - premade system fields that are recognized and expanded at the moment when a log is created
- Fields intended for [[Field Logging]] - standard simple field names that are expanded from some external source (e.g. URI command, another plugin)
- [[Interactive Fields]] - fields that require direct user interface to fill out. These can include additional formatting to aid in data entry
- [[Block Fields]] - fields that are filled with blocks of premade data (e.g. text, code, \`\`\` blocks)

## Field Naming Structure
The naming structure of a field is simply a field name surrounded by curly braces, e.g. `{{fieldName}}`. The Z2k Daily Log Plugin, however, supports more advanced field replacement methods (e.g. automated linking, insertion points, [[Interactive Fields]]) that make more complicating field names. Please see the [[Field Naming Structure]] page for more details. 