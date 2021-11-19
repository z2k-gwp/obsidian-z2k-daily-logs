<!-- Given that "New Card" also needs interactive fields, should this be moved into a separate plugin? -->

-----

Interactive fields are special [[fields]] designed for interactive filling. Typically they are prompts to the user to fill out some piece of information. 

### How to Trigger Interactive prompting

### Typical Uses

### Interactive Field Formatting
Because these fields are interactive, they have their own formatting system to include information to aid in the interactive prompting for information.

The general format for interactive fields are as follows
`{{GroupName!Fieldname:Prompt::XX}}``

Details:
| Formatting Part | Required   | Description |
| --------------- | ---------- | ----------------------------|
| `{{`            | Required   | Signifies that this is the start of a field name
| `Groupname!`    | *Optional* | Assigns a groupname to an interactive field. The groupname can be an alpha numeric name followed by a `!`|
| `Fieldname`     | Required   | The fieldname is the unique name of a field. It is case insensitive. |

To flesh out....

### Multiple instances
how to handle?
