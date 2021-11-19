Automated Fields are [[Fields]] that are automatically expanded at the moment of creation for a daily log. They are predefined fields used by the plugin to handle common data that requires no special knowledge to fill out.

## Date Based Automated Fields

| **Fieldname**| **Link Version?**| **Date Format**   | **Example field**| **Example output**|
| -------------- | ------------- | ------------------ | ---------------- | ---------------- |
| `date`         | Yes           | *User Specified*   | {{date-1d:MM-dd}}| `12-30`          |
| `time`         | No            | *User Specified*   | {{time}}         | `2021-12-31`     |
| -------------- | ------------- | ------------------ | ---------------- | ---------------- |
| `timeOfDay`    | No            | `HH:mm`            | {{timeOfDay}}    | `17:30`          |
| `timestamp`    | Yes           | `YYYYMMDDHHmm`     | {{timestamp}}    | `202112312359`   |
| `timestampSec` | No            | `YYYYMMDDHHmmss`   | {{timestampSec}} | `20211231235959` |
| -------------- | ------------- | ------------------ | ---------------- | ---------------- |
| `today`        | Yes           | *Preferred Format* | {{today-Link}}   | `[[2021-12-31]]` |
| `yesterday`    | Yes           | *Preferred Format* | {{yesterday}}    | `2021-12-30`     |
| `tomorrow`     | Yes           | *Preferred Format* | {{tomorrow}}     | `2022-01-01`     |
| -------------- | ------------- | ------------------ | ---------------- | ---------------- |
| `dayOfWeek`    | Yes           | `dddd`             | {{dayOfWeek}}    | `Sunday`         |
| `weekNum`      | Yes           | `ww`               | {{weekNum}}      | `52`             |
| `yrWeekNum`    | Yes           | `YYYY`-w`ww`       | {{yrWeekNum}}    | `2021-w52`       |
| -------------- | ------------- | ------------------ | ---------------- | ---------------- |


Notes:
- **Link Version**: For those fields with a link version, you can postfix the Fieldname with `"Link"` (no spaces between) and the plugin will automatically place `[[ ]]` wikilink brackets around the replaced field. This is useful because otherwise your fieldnames in your template files themselves will be interpreted as links. See the `{{todayLink}}` entry above for an example.

- **Date Format**: This shows how a date will be formatted for the field expansion using the [moment.js formatting guide](https://momentjs.com/docs/#/displaying/format/). 
   - For those date formats listed as "Preferred Format", then the plugin will use the preferred date format specified in the Z2K Daily Logs settings page. Typically this is `YYYY-MM-dd`.
   - For the two fields (`{{date}}` and `{{time}}`) that have "*User Specified*" date formats, please see the next section

### Customized Date/Time Formats
The fields `{{date}}` and `{{time}}` are capable of more complicated text expansion. The general format for the field is as follows:
> `{{`[time|date|date-Link][`+`|`-` *`number`* *`unit`*][`:`*`formatString`*] `}}`

1. *required* : `{{` - Field Prefix
2. *required* : `time` or `date` or `date-Link` - Field name. Note: there is functionally no difference between use `time` or `date`. If you use `date-Link` then the final output will be wrapped with `[[  ]]` link brackets.
3. *optional* : (`+` or `-`) (*`number`*) (*`unit`*), where *`unit`* is one of the letters `"yqmwdhs"`
   - this is used to add or subtract units of time to the date
   - the unit can be year, quarter, month, week, day, hour, or second - use the first letter to specify which
4. *optional* : `:formatString` where the `formatString` is a valid [date format string](https://momentjs.com/docs/#/displaying/format/). If a format is not specified, then it will use the preferred format from the settings page. The plugin does minimal validation on the format string, so test it before using.
5. *required* : `}}` - Field Postfix

Thus some examples (assuming today is 2021-12-31 at 23:59):

| Field Name               | Field Expansion   |
| ------------------------ | ----------------- | 
| `{{date-1d:MM-dd}}`      | `12-30`           |
| `{{date:YYYYMMddHHmm}}`  | `202112302359`    |
| `{{date:YYYY-MM-dd}}`    | `2021-12-30`      |
| `{{date-2}}`             | `2021-12-29`      |
| `{{date-Link}}`          | `[[2021-12-29]]`  |
| `{{date-Link:YYYY-ww}}`  | `[[2021-52]]`     |

The `{{date}}` fields are also expanded for plugin settings values for filename, folder and template file entries, allowing for some advanced configurations. See [[Advanced File, Folder and Template Naming]] for more information. 


## File Based Automated Fields

| Fieldname    | Link Version? | Example field    | Example output |
| ------------ | ------------- | ---------------- | -------------- |
| `title`      | Yes           | {{title-Link}}   | `[[foo]]`      |
| `cardTitle`  | Yes           | {{cardTitle}}    | `foo`          |

Notes:
- Examples above assume the current card is titled "foo"


## Z2K Based Automated Fields

| Fieldname               | Example output    |
| ----------------------- | ----------------- |
| {{#Card/Type/Template}} | .:Card/Activated  |

Notes:
- This is used for Z2K Metadata maintenance

## Esoterics
Some really nitty gritty stuff:
- You can put white space around the field names, e.g. `{{  timestamp  }}` is a valid field.
- The fields are case insensitive, e.g. `{{TIMEStamp}}` will still be replaced with the timestamp field name.
- See the [[Fields]] page for general field name specifications.
- If you use `{{date:HHss}}` field formatter to display time of day options, it will use the present day *time* when dealing with logs from previous days. It will still preserve the log's original date however.

## Examples



## Future
- Future: add a {{date-Link#Header}} capability


