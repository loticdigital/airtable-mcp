# Field types and cell values

This documents all of the currently supported field types and their corresponding cell value formats, as well as their option formats.

**Note:** Webhooks have different cell payloads for some cell types (eg: [single select](https://airtable.com/developers/web/api/field-model#select)). This will be detailed below.

**Warning:** We may add more field types in the future and this will not be considered a [breaking change](https://support.airtable.com/docs/airtable-api-deprecation-guidelines). API consumers are expected to handle unknown field types gracefully. Further, object definitions are not meant to exhaustively describe the shape, new properties can be added and will not be considered a breaking change.

## Field types

- [AI Text](https://airtable.com/developers/web/api/field-model#ai-text)
- [Attachment](https://airtable.com/developers/web/api/field-model#multiple-attachment)
- [Auto number](https://airtable.com/developers/web/api/field-model#auto-number)
- [Barcode](https://airtable.com/developers/web/api/field-model#barcode)
- [Button](https://airtable.com/developers/web/api/field-model#button)
- [Checkbox](https://airtable.com/developers/web/api/field-model#checkbox)
- [Collaborator](https://airtable.com/developers/web/api/field-model#collaborator)
- [Count](https://airtable.com/developers/web/api/field-model#count)
- [Created by](https://airtable.com/developers/web/api/field-model#created-by)
- [Created time](https://airtable.com/developers/web/api/field-model#created-time)
- [Currency](https://airtable.com/developers/web/api/field-model#currency-number)
- [Date](https://airtable.com/developers/web/api/field-model#date-only)
- [Date and time](https://airtable.com/developers/web/api/field-model#date-and-time)
- [Duration](https://airtable.com/developers/web/api/field-model#duration-number)
- [Email](https://airtable.com/developers/web/api/field-model#email-text)
- [Formula](https://airtable.com/developers/web/api/field-model#formula)
- [Last modified by](https://airtable.com/developers/web/api/field-model#last-modified-by)
- [Last modified time](https://airtable.com/developers/web/api/field-model#last-modified-time)
- [Link to another record](https://airtable.com/developers/web/api/field-model#foreign-key)
- [Long text](https://airtable.com/developers/web/api/field-model#multiline-text)
- [Lookup](https://airtable.com/developers/web/api/field-model#lookup)
- [Multiple collaborator](https://airtable.com/developers/web/api/field-model#multi-collaborator)
- [Multiple select](https://airtable.com/developers/web/api/field-model#multi-select)
- [Number](https://airtable.com/developers/web/api/field-model#decimal-or-integer-number)
- [Percent](https://airtable.com/developers/web/api/field-model#percent-number)
- [Phone](https://airtable.com/developers/web/api/field-model#phone)
- [Rating](https://airtable.com/developers/web/api/field-model#rating)
- [Rich text](https://airtable.com/developers/web/api/field-model#rich-text)
- [Rollup](https://airtable.com/developers/web/api/field-model#rollup)
- [Single line text](https://airtable.com/developers/web/api/field-model#simple-text)
- [Single select](https://airtable.com/developers/web/api/field-model#select)
- [Sync source](https://airtable.com/developers/web/api/field-model#sync-source)
- [Url](https://airtable.com/developers/web/api/field-model#url-text)

## [§](https://airtable.com/developers/web/api/field-model\#aitext) AI Text

Long text (with AI output enabled)

AI generated text can depend on other cells in the same record and can be in a loading state.

Cell format (read only)

`any of the below objects`

* * *

``

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#aitext-cellformat-multiple-0-state)`state` | `"empty" | "loading" | "generated"` <br>The current state of the cell. |
| [§](https://airtable.com/developers/web/api/field-model#aitext-cellformat-multiple-0-isstale)`isStale` | `boolean` <br>If the cell should be recomputed due to a dependency change.<br>This can either be a dependent field or the field configuration. |
| [§](https://airtable.com/developers/web/api/field-model#aitext-cellformat-multiple-0-value)`value` | `string | null` <br>The value that is shown to the user inside of the cell |

* * *

``

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#aitext-cellformat-multiple-1-state)`state` | `"error"` <br>Whether the cell is currently in an error state. |
| [§](https://airtable.com/developers/web/api/field-model#aitext-cellformat-multiple-1-errortype)`errorType` | `string` <br>A short string that describes the error. |
| [§](https://airtable.com/developers/web/api/field-model#aitext-cellformat-multiple-1-isstale)`isStale` | `boolean` <br>If the cell should be recomputed due to a dependency change.<br>This can either be a dependent field or the field configuration. |
| [§](https://airtable.com/developers/web/api/field-model#aitext-cellformat-multiple-1-value)`value` | `string | null` <br>The value that is shown to the user inside of the cell |

Field type and options (read only)

``

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#aitext-fieldtype-type)`type` | `"aiText"` |
| [§](https://airtable.com/developers/web/api/field-model#aitext-fieldtype-options)`options` | `object`

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#aitext-fieldtype-options-prompt)`prompt` | `optional<` `array of (strings | the below object)` `>`

The prompt that is used to generate the results in the AI field, additional object
types may be added in the future. Currently, this is an array of strings or objects that identify any fields interpolated into the prompt.

The prompt will not currently be provided if this field config is within another
fields configuration (like a lookup field)

``

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#aitext-fieldtype-options-prompt-field)`field` | `object`

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#aitext-fieldtype-options-prompt-field-fieldid)`fieldId` | `string` | | |
| [§](https://airtable.com/developers/web/api/field-model#aitext-fieldtype-options-referencedfieldids)`referencedFieldIds` | `optional<` `array of strings` `>` <br>The other fields in the record that are used in the ai field<br>The referencedFieldIds will not currently be provided if this field config is within another<br>fields configuration (like a lookup field) | |

## [§](https://airtable.com/developers/web/api/field-model\#multipleattachment) Attachment

Attachments allow you to add images, documents, or other files
which can then be viewed or downloaded.

URLs returned will expire 2 hours after being returned from our API.
If you want to persist the attachments, we recommend downloading them instead of saving the URL.
See our [support article](https://support.airtable.com/docs/changes-to-airtable-attachments) for
more information.

Cell format (read)

`array of the below object`  ``

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#multipleattachment-cellformat-id)`id` | `string` <br>Unique attachment id |
| [§](https://airtable.com/developers/web/api/field-model#multipleattachment-cellformat-type)`type` | `string` <br>Content type, e.g. "image/jpeg" |
| [§](https://airtable.com/developers/web/api/field-model#multipleattachment-cellformat-filename)`filename` | `string` <br>Filename, e.g. "foo.jpg" |
| [§](https://airtable.com/developers/web/api/field-model#multipleattachment-cellformat-height)`height` | `number` <br>Height, in pixels (these may be available if the attachment is an image) |
| [§](https://airtable.com/developers/web/api/field-model#multipleattachment-cellformat-size)`size` | `number` <br>File size, in bytes |
| [§](https://airtable.com/developers/web/api/field-model#multipleattachment-cellformat-url)`url` | `string` <br>url, e.g. " [https://v5.airtableusercontent.com/foo](https://v5.airtableusercontent.com/foo)".<br>URLs returned will expire 2 hours after being returned from our API.<br>If you want to persist the attachments, we recommend downloading them instead of saving the URL.<br>See [our support article](https://support.airtable.com/docs/airtable-attachment-url-behavior)<br>for more information. |
| [§](https://airtable.com/developers/web/api/field-model#multipleattachment-cellformat-width)`width` | `number` <br>Width, in pixels (these may be available if the attachment is an image) |
| [§](https://airtable.com/developers/web/api/field-model#multipleattachment-cellformat-thumbnails)`thumbnails` | `object`

These small, large, and full thumbnails may be available if attachment is an image or document

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#multipleattachment-cellformat-thumbnails-full)`full` | `optional<` `object` `>`

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#multipleattachment-cellformat-thumbnails-full-url)`url` | `string` <br>These may be available if the attachment is an image or document. See notes under `url` about the lifetime of these URLs. |
| [§](https://airtable.com/developers/web/api/field-model#multipleattachment-cellformat-thumbnails-full-height)`height` | `number` |
| [§](https://airtable.com/developers/web/api/field-model#multipleattachment-cellformat-thumbnails-full-width)`width` | `number` | |
| [§](https://airtable.com/developers/web/api/field-model#multipleattachment-cellformat-thumbnails-large)`large` | `optional<` `object` `>`

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#multipleattachment-cellformat-thumbnails-large-url)`url` | `string` <br>These may be available if the attachment is an image or document. See notes under `url` about the lifetime of these URLs. |
| [§](https://airtable.com/developers/web/api/field-model#multipleattachment-cellformat-thumbnails-large-height)`height` | `number` |
| [§](https://airtable.com/developers/web/api/field-model#multipleattachment-cellformat-thumbnails-large-width)`width` | `number` | |
| [§](https://airtable.com/developers/web/api/field-model#multipleattachment-cellformat-thumbnails-small)`small` | `optional<` `object` `>`

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#multipleattachment-cellformat-thumbnails-small-url)`url` | `string` <br>These may be available if the attachment is an image or document. See notes under `url` about the lifetime of these URLs. |
| [§](https://airtable.com/developers/web/api/field-model#multipleattachment-cellformat-thumbnails-small-height)`height` | `number` |
| [§](https://airtable.com/developers/web/api/field-model#multipleattachment-cellformat-thumbnails-small-width)`width` | `number` | | |

Cell format (write)

`array of any of the below objects`

* * *

``

To create new attachments, provide the url and optionally filename.

You must also provide the id's for any existing attachment objects you wish to keep.

Note that in most cases the API does not currently return an error code for failed attachment object creation
given attachment uploading happens in an asynchronous manner, such cases will manifest with the
attachment object either being cleared from the cell or persisted with generated URLs that return
error responses when queried. If the same attachment URL fails to upload multiple times in a short time interval then
the API may return an ATTACHMENTS\_FAILED\_UPLOADING error code in the details field of the response and the attachment object will
be cleared from the cell synchronously.

We also require URLs used to upload have the https:// or http:// protocol (Note: http:// support will be removed in the
near future), have a limit of 3 max redirects, and a file size limit of 1GB. In addition,
URLs must be publicly accessible, in cases where cookie authentication or logging
in to access the file is required, the login page HTML will be downloaded instead of the file.

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#multipleattachment-cellformat-write-multiple-0-url)`url` | `string` <br>url, e.g. " [https://v5.airtableusercontent.com/foo](https://v5.airtableusercontent.com/foo)".<br>URLs returned will expire 2 hours after being returned from our API.<br>If you want to persist the attachments, we recommend downloading them instead of saving the URL.<br>See [our support article](https://support.airtable.com/docs/airtable-attachment-url-behavior)<br>for more information. |
| [§](https://airtable.com/developers/web/api/field-model#multipleattachment-cellformat-write-multiple-0-filename)`filename` | `optional<` `string` `>` <br>Filename, e.g. "foo.jpg" |

* * *

``

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#multipleattachment-cellformat-write-multiple-1-id)`id` | `string` <br>When writing an attachment object, be sure to include all existing attachment objects<br>by providing an `id`. This can be retrieved using the [get record endpoint](https://airtable.com/developers/web/api/get-record).<br>To remove attachments, include the existing array of attachment objects,<br>excluding any that you wish to remove. |

Field type and options

``

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#multipleattachment-fieldtype-type)`type` | `"multipleAttachments"` |
| [§](https://airtable.com/developers/web/api/field-model#multipleattachment-fieldtype-options)`options` | `object`

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#multipleattachment-fieldtype-options-isreversed)`isReversed` | `boolean` <br>Whether attachments are rendered in the reverse order from the cell value in the<br>Airtable UI (i.e. most recent first).<br>You generally do not need to rely on this option. | |

## [§](https://airtable.com/developers/web/api/field-model\#autonumber) Auto number

Automatically incremented unique counter for each record.

Cell format (read only)

`number`

Field type and options (read only)

``

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#autonumber-fieldtype-type)`type` | `"autoNumber"` |

## [§](https://airtable.com/developers/web/api/field-model\#barcode) Barcode

Use the Airtable iOS or Android app to scan barcodes.

Cell format

``

The barcode object may contain the following two properties, both of which are optional.

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#barcode-cellformat-type)`type` | `optional<` `string | null` `>` <br>Barcode symbology, e.g. "upce" or "code39" |
| [§](https://airtable.com/developers/web/api/field-model#barcode-cellformat-text)`text` | `string` <br>Barcode data |

Field type and options

``

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#barcode-fieldtype-type)`type` | `"barcode"` |

## [§](https://airtable.com/developers/web/api/field-model\#button) Button

A button that can be clicked from the Airtable UI to open a URL or open an extension.

Cell format (read only)

``

Object providing details about the button configuration.

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#button-cellformat-label)`label` | `string` <br>Button label |
| [§](https://airtable.com/developers/web/api/field-model#button-cellformat-url)`url` | `string | null` <br>For "Open URL" actions, the computed url value |

Field type and options (read only)

``

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#button-fieldtype-type)`type` | `"button"` |

## [§](https://airtable.com/developers/web/api/field-model\#checkbox) Checkbox

Cell format

`true`

This field is "true" when checked and otherwise empty.

You can write to the cell with "false", but the read value will be still be "empty" (unchecked).

Field type and options

``

Bases on a free or plus plan are limited to using the `'check'` icon and `'greenBright'` color.

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#checkbox-fieldtype-type)`type` | `"checkbox"` |
| [§](https://airtable.com/developers/web/api/field-model#checkbox-fieldtype-options)`options` | `object`

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#checkbox-fieldtype-options-color)`color` | `"greenBright" | "tealBright" | "cyanBright" | "blueBright" | "purpleBright" | "pinkBright" | "redBright" | "orangeBright" | "yellowBright" | "grayBright"` <br>The color of the checkbox. |
| [§](https://airtable.com/developers/web/api/field-model#checkbox-fieldtype-options-icon)`icon` | `"check" | "xCheckbox" | "star" | "heart" | "thumbsUp" | "flag" | "dot"` <br>The icon name of the checkbox. | |

## [§](https://airtable.com/developers/web/api/field-model\#collaborator) Collaborator

A collaborator field lets you add collaborators to your records.
Collaborators can optionally be notified when they're added (using the field settings in
the UI). A single collaborator field has been configured to only reference
one user collaborator.

Cell format (read)

``

Object providing details about the user collaborator in this field.

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#collaborator-cellformat-id)`id` | `string` <br>User id or group id |
| [§](https://airtable.com/developers/web/api/field-model#collaborator-cellformat-email)`email` | `optional<` `string` `>` <br>User's email address |
| [§](https://airtable.com/developers/web/api/field-model#collaborator-cellformat-name)`name` | `optional<` `string` `>` <br>User's display name (may be omitted if the user hasn't created an account) |
| [§](https://airtable.com/developers/web/api/field-model#collaborator-cellformat-permissionlevel)`permissionLevel` | `optional<``"none" | "read" | "comment" | "edit" | "create"` `>` <br>User's collaborator permission Level<br>This is only included if you're observing a webhooks response. |
| [§](https://airtable.com/developers/web/api/field-model#collaborator-cellformat-profilepicurl)`profilePicUrl` | `optional<` `string` `>` <br>User's profile picture<br>This is only included if it exists for the user **and** you're observing a webhooks response. |

Cell format (write)

`any of the below objects`

* * *

``

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#collaborator-cellformat-write-multiple-0-id)`id` | `string` <br>The user id, group id of the user |

* * *

``

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#collaborator-cellformat-write-multiple-1-email)`email` | `string` <br>The user's email address |

Field type and options

``

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#collaborator-fieldtype-type)`type` | `"singleCollaborator"` |
| [§](https://airtable.com/developers/web/api/field-model#collaborator-fieldtype-options)`options` | `optional<` `object` `>`

|
| |

## [§](https://airtable.com/developers/web/api/field-model\#count) Count

Number of linked records, from a linked record field in the same table.

Cell format (read only)

`number`

Field type and options (read only)

``

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#count-fieldtype-type)`type` | `"count"` |
| [§](https://airtable.com/developers/web/api/field-model#count-fieldtype-options)`options` | `object`

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#count-fieldtype-options-isvalid)`isValid` | `boolean` <br>`false` when recordLinkFieldId is null, e.g. the referenced column was deleted. |
| [§](https://airtable.com/developers/web/api/field-model#count-fieldtype-options-recordlinkfieldid)`recordLinkFieldId` | `optional<` `string | null` `>` | |

## [§](https://airtable.com/developers/web/api/field-model\#createdby) Created by

The collaborator who created the record.

Cell format (read only)

``

Object providing details about the user collaborator in this field.

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#createdby-cellformat-id)`id` | `string` <br>User id or group id |
| [§](https://airtable.com/developers/web/api/field-model#createdby-cellformat-email)`email` | `optional<` `string` `>` <br>User's email address |
| [§](https://airtable.com/developers/web/api/field-model#createdby-cellformat-name)`name` | `optional<` `string` `>` <br>User's display name (may be omitted if the user hasn't created an account) |
| [§](https://airtable.com/developers/web/api/field-model#createdby-cellformat-permissionlevel)`permissionLevel` | `optional<``"none" | "read" | "comment" | "edit" | "create"` `>` <br>User's collaborator permission Level<br>This is only included if you're observing a webhooks response. |
| [§](https://airtable.com/developers/web/api/field-model#createdby-cellformat-profilepicurl)`profilePicUrl` | `optional<` `string` `>` <br>User's profile picture<br>This is only included if it exists for the user **and** you're observing a webhooks response. |

Field type and options (read only)

``

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#createdby-fieldtype-type)`type` | `"createdBy"` |

## [§](https://airtable.com/developers/web/api/field-model\#createdtime) Created time

The time the record was created in UTC e.g. "2022-08-29T07:00:00.000Z" or "2022-08-29"

Cell format (read only)

`string`

Field type and options (read only)

``

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#createdtime-fieldtype-type)`type` | `"createdTime"` |
| [§](https://airtable.com/developers/web/api/field-model#createdtime-fieldtype-options)`options` | `object`

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#createdtime-fieldtype-options-result)`result` | `optional<` `any of the below objects` `>` <br>This will always be a `date` or `dateTime` field config.<br>* * *<br>[`Date field config`](https://airtable.com/developers/web/api/field-model#dateonly)<br>* * *<br>[`Date-time field config`](https://airtable.com/developers/web/api/field-model#dateandtime) | |

## [§](https://airtable.com/developers/web/api/field-model\#currencynumber) Currency

Currency value. Symbol set with the field config.

Cell format

`number`

Field type and options

``

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#currencynumber-fieldtype-type)`type` | `"currency"` |
| [§](https://airtable.com/developers/web/api/field-model#currencynumber-fieldtype-options)`options` | `object`

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#currencynumber-fieldtype-options-precision)`precision` | `number` <br>Indicates the number of digits shown to the right of the decimal point for this field. (0-7 inclusive) |
| [§](https://airtable.com/developers/web/api/field-model#currencynumber-fieldtype-options-symbol)`symbol` | `string` <br>Currency symbol to use. | |

## [§](https://airtable.com/developers/web/api/field-model\#dateonly) Date

String (ISO 8601 formatted date)

UTC date, e.g. "2022-09-05".

Cell format

`string`

A date.

When reading from and writing to a date field, the cell value will always be an
[ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html)
formatted date. (Field options specify how it's formatted in the main Airtable UI - format
can be used with [moment.js](https://momentjs.com/) to match that.)

The date format string follows the moment.js structure documented
[here](https://momentjs.com/docs/#/parsing/string-format/).

When using the Airtable.js library you can also use a [Date object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date).

Field type and options (read)

``

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#dateonly-fieldtype-type)`type` | `"date"` |
| [§](https://airtable.com/developers/web/api/field-model#dateonly-fieldtype-options)`options` | `object`

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#dateonly-fieldtype-options-dateformat)`dateFormat` | `object`

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#dateonly-fieldtype-options-dateformat-format)`format` | `"l" | "LL" | "M/D/YYYY" | "D/M/YYYY" | "YYYY-MM-DD"` <br>`format` is always provided when reading.<br>( `l` for local, `LL` for friendly, `M/D/YYYY` for us, `D/M/YYYY` for european, `YYYY-MM-DD` for iso) |
| [§](https://airtable.com/developers/web/api/field-model#dateonly-fieldtype-options-dateformat-name)`name` | `"local" | "friendly" | "us" | "european" | "iso"` | | |

Field type and options (write)

``

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#dateonly-fieldtype-write-type)`type` | `"date"` |
| [§](https://airtable.com/developers/web/api/field-model#dateonly-fieldtype-write-options)`options` | `object`

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#dateonly-fieldtype-write-options-dateformat)`dateFormat` | `object`

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#dateonly-fieldtype-write-options-dateformat-format)`format` | `optional<``"l" | "LL" | "M/D/YYYY" | "D/M/YYYY" | "YYYY-MM-DD"` `>` <br>Format is optional when writing, but it must match<br>the corresponding name if provided.<br>( `l` for local, `LL` for friendly, `M/D/YYYY` for us, `D/M/YYYY` for european, `YYYY-MM-DD` for iso) |
| [§](https://airtable.com/developers/web/api/field-model#dateonly-fieldtype-write-options-dateformat-name)`name` | `"local" | "friendly" | "us" | "european" | "iso"` | | |

## [§](https://airtable.com/developers/web/api/field-model\#dateandtime) Date and time

String (ISO 8601 formatted date)

UTC date and time, e.g. "2022-09-05T07:00:00.000Z".

Cell format

`string`

A date and time.

When reading from and writing to a date field, the cell value will always be an
[ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html)
formatted date. (Field options specify how it's formatted in the main Airtable UI - format
can be used with [moment.js](https://momentjs.com/) to match that.)

When using the Airtable.js library you can also use a [Date object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date).

When writing to a `dateTime` field configured with a non `utc` or `client` time zone like `America/Los_Angeles`,
ambiguous string inputs like "2020-09-05T07:00:00" and "2020-09-08" will be interpreted according
to the `timeZone` of the field instead of `utc`, and nonambiguous string inputs with zone offset like "2020-09-05T07:00:00.000Z"
and "2020-09-08T00:00:00-07:00" will be interpreted correctly as the underlying timestamp.

Field type and options (read)

``

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#dateandtime-fieldtype-type)`type` | `"dateTime"` |
| [§](https://airtable.com/developers/web/api/field-model#dateandtime-fieldtype-options)`options` | `object`

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#dateandtime-fieldtype-options-timezone)`timeZone` | [`Timezone`](https://airtable.com/developers/web/api/model/timezone) |
| [§](https://airtable.com/developers/web/api/field-model#dateandtime-fieldtype-options-dateformat)`dateFormat` | `object`

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#dateandtime-fieldtype-options-dateformat-format)`format` | `"l" | "LL" | "M/D/YYYY" | "D/M/YYYY" | "YYYY-MM-DD"` <br>`format` is always provided when reading.<br>( `l` for local, `LL` for friendly, `M/D/YYYY` for us, `D/M/YYYY` for european, `YYYY-MM-DD` for iso) |
| [§](https://airtable.com/developers/web/api/field-model#dateandtime-fieldtype-options-dateformat-name)`name` | `"local" | "friendly" | "us" | "european" | "iso"` | |
| [§](https://airtable.com/developers/web/api/field-model#dateandtime-fieldtype-options-timeformat)`timeFormat` | `object`

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#dateandtime-fieldtype-options-timeformat-format)`format` | `"h:mma" | "HH:mm"` |
| [§](https://airtable.com/developers/web/api/field-model#dateandtime-fieldtype-options-timeformat-name)`name` | `"12hour" | "24hour"` | | |

Field type and options (write)

``

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#dateandtime-fieldtype-write-type)`type` | `"dateTime"` |
| [§](https://airtable.com/developers/web/api/field-model#dateandtime-fieldtype-write-options)`options` | `object`

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#dateandtime-fieldtype-write-options-timezone)`timeZone` | [`Timezone`](https://airtable.com/developers/web/api/model/timezone) |
| [§](https://airtable.com/developers/web/api/field-model#dateandtime-fieldtype-write-options-dateformat)`dateFormat` | `object`

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#dateandtime-fieldtype-write-options-dateformat-format)`format` | `optional<``"l" | "LL" | "M/D/YYYY" | "D/M/YYYY" | "YYYY-MM-DD"` `>` <br>Format is optional when writing, but it must match<br>the corresponding name if provided.<br>( `l` for local, `LL` for friendly, `M/D/YYYY` for us, `D/M/YYYY` for european, `YYYY-MM-DD` for iso) |
| [§](https://airtable.com/developers/web/api/field-model#dateandtime-fieldtype-write-options-dateformat-name)`name` | `"local" | "friendly" | "us" | "european" | "iso"` | |
| [§](https://airtable.com/developers/web/api/field-model#dateandtime-fieldtype-write-options-timeformat)`timeFormat` | `object`

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#dateandtime-fieldtype-write-options-timeformat-name)`name` | `"12hour" | "24hour"` |
| [§](https://airtable.com/developers/web/api/field-model#dateandtime-fieldtype-write-options-timeformat-format)`format` | `optional<``"h:mma" | "HH:mm"` `>` | | |

## [§](https://airtable.com/developers/web/api/field-model\#durationnumber) Duration

An integer representing number of seconds.

Cell format

`number`

Field type and options

``

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#durationnumber-fieldtype-type)`type` | `"duration"` |
| [§](https://airtable.com/developers/web/api/field-model#durationnumber-fieldtype-options)`options` | `object`

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#durationnumber-fieldtype-options-durationformat)`durationFormat` | `"h:mm" | "h:mm:ss" | "h:mm:ss.S" | "h:mm:ss.SS" | "h:mm:ss.SSS"` | |

## [§](https://airtable.com/developers/web/api/field-model\#emailtext) Email

A valid email address.

Cell format

`string`

Field type and options

``

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#emailtext-fieldtype-type)`type` | `"email"` |

## [§](https://airtable.com/developers/web/api/field-model\#formula) Formula

Compute a value in each record based on other fields in the same record.

Cell format (read only)

`string | number | true | array of (strings | numbers)`

Computed value - Check options.result to know the resulting field type.

Field type and options (read only)

``

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#formula-fieldtype-type)`type` | `"formula"` |
| [§](https://airtable.com/developers/web/api/field-model#formula-fieldtype-options)`options` | `object`

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#formula-fieldtype-options-formula)`formula` | `string` <br>The formula including fields referenced by their IDs. For example, LEFT(4, {Birthday})<br>in the Airtable.com formula editor will be returned as LEFT(4, {fldXXX}) via API. |
| [§](https://airtable.com/developers/web/api/field-model#formula-fieldtype-options-isvalid)`isValid` | `boolean` <br>`false` if the formula contains an error. |
| [§](https://airtable.com/developers/web/api/field-model#formula-fieldtype-options-referencedfieldids)`referencedFieldIds` | `array of strings | null` <br>All fields in the record that are used in the formula. |
| [§](https://airtable.com/developers/web/api/field-model#formula-fieldtype-options-result)`result` | `Field type and options | null` <br>The resulting field type and options returned by the formula. See other field<br>type configs on this page for the possible values. Can be null if invalid. | |

## [§](https://airtable.com/developers/web/api/field-model\#lastmodifiedby) Last modified by

Shows the collaborator who most recently modified any editable field or just in specific editable fields.

Cell format (read only)

``

Object providing details about the user collaborator in this field.

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#lastmodifiedby-cellformat-id)`id` | `string` <br>User id or group id |
| [§](https://airtable.com/developers/web/api/field-model#lastmodifiedby-cellformat-email)`email` | `optional<` `string` `>` <br>User's email address |
| [§](https://airtable.com/developers/web/api/field-model#lastmodifiedby-cellformat-name)`name` | `optional<` `string` `>` <br>User's display name (may be omitted if the user hasn't created an account) |
| [§](https://airtable.com/developers/web/api/field-model#lastmodifiedby-cellformat-permissionlevel)`permissionLevel` | `optional<``"none" | "read" | "comment" | "edit" | "create"` `>` <br>User's collaborator permission Level<br>This is only included if you're observing a webhooks response. |
| [§](https://airtable.com/developers/web/api/field-model#lastmodifiedby-cellformat-profilepicurl)`profilePicUrl` | `optional<` `string` `>` <br>User's profile picture<br>This is only included if it exists for the user **and** you're observing a webhooks response. |

Field type and options (read only)

``

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#lastmodifiedby-fieldtype-type)`type` | `"lastModifiedBy"` |

## [§](https://airtable.com/developers/web/api/field-model\#lastmodifiedtime) Last modified time

The time the record was last modified in UTC e.g. "2022-08-29T07:00:00.000Z" or "2022-08-29"

Cell format (read only)

`string`

Field type and options (read only)

``

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#lastmodifiedtime-fieldtype-type)`type` | `"lastModifiedTime"` |
| [§](https://airtable.com/developers/web/api/field-model#lastmodifiedtime-fieldtype-options)`options` | `object`

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#lastmodifiedtime-fieldtype-options-isvalid)`isValid` | `boolean` <br>False if this formula/field configuation has an error |
| [§](https://airtable.com/developers/web/api/field-model#lastmodifiedtime-fieldtype-options-referencedfieldids)`referencedFieldIds` | `array of strings | null` <br>The fields to check the last modified time of |
| [§](https://airtable.com/developers/web/api/field-model#lastmodifiedtime-fieldtype-options-result)`result` | `null | any of the below objects` <br>This will always be a `date` or `dateTime` field config.<br>* * *<br>[`Date field config`](https://airtable.com/developers/web/api/field-model#dateonly)<br>* * *<br>[`Date-time field config`](https://airtable.com/developers/web/api/field-model#dateandtime) | |

## [§](https://airtable.com/developers/web/api/field-model\#foreignkey) Link to another record

Cell format V1

`array of strings`

Array of linked records IDs from the linked table.

Cell format V2 (webhooks)

`array of the below object`  ``

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#foreignkey-cellformat-v-2-id)`id` | `string` <br>Record ID |
| [§](https://airtable.com/developers/web/api/field-model#foreignkey-cellformat-v-2-name)`name` | `string` |

Field type and options (read)

``

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#foreignkey-fieldtype-type)`type` | `"multipleRecordLinks"` |
| [§](https://airtable.com/developers/web/api/field-model#foreignkey-fieldtype-options)`options` | `object`

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#foreignkey-fieldtype-options-isreversed)`isReversed` | `boolean` <br>Whether linked records are rendered in the reverse order from the cell value in the<br>Airtable UI (i.e. most recent first).<br>You generally do not need to rely on this option. |
| [§](https://airtable.com/developers/web/api/field-model#foreignkey-fieldtype-options-linkedtableid)`linkedTableId` | `string` <br>The ID of the table this field links to |
| [§](https://airtable.com/developers/web/api/field-model#foreignkey-fieldtype-options-preferssinglerecordlink)`prefersSingleRecordLink` | `boolean` <br>Whether this field prefers to only have a single linked record. While this preference<br>is enforced in the Airtable UI, it is possible for a field that prefers single linked<br>records to have multiple record links (for example, via copy-and-paste or programmatic<br>updates). |
| [§](https://airtable.com/developers/web/api/field-model#foreignkey-fieldtype-options-inverselinkfieldid)`inverseLinkFieldId` | `optional<` `string` `>` <br>The ID of the field in the linked table that links back<br>to this one |
| [§](https://airtable.com/developers/web/api/field-model#foreignkey-fieldtype-options-viewidforrecordselection)`viewIdForRecordSelection` | `optional<` `string` `>` <br>The ID of the view in the linked table to use when showing<br>a list of records to select from. | |

Field type and options (write)

``

Creating "multipleRecordLinks" fields is supported but updating options for
existing "multipleRecordLinks" fields is not supported.

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#foreignkey-fieldtype-write-type)`type` | `"multipleRecordLinks"` |
| [§](https://airtable.com/developers/web/api/field-model#foreignkey-fieldtype-write-options)`options` | `object`

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#foreignkey-fieldtype-write-options-linkedtableid)`linkedTableId` | `string` <br>The ID of the table this field links to |
| [§](https://airtable.com/developers/web/api/field-model#foreignkey-fieldtype-write-options-viewidforrecordselection)`viewIdForRecordSelection` | `optional<` `string` `>` <br>The ID of the view in the linked table<br>to use when showing a list of records to select from | |

## [§](https://airtable.com/developers/web/api/field-model\#multilinetext) Long text

Cell format

`string`

Multiple lines of text, which may contain "mention tokens", e.g.
`<airtable:mention id="menE1i9oBaGX3DseR">@Alex</airtable:mention>`

Field type and options

``

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#multilinetext-fieldtype-type)`type` | `"multilineText"` |

## [§](https://airtable.com/developers/web/api/field-model\#lookup) Lookup

Lookup a field on linked records.

Cell format V1 (read only)

`array of (numbers | strings | booleans | any)`

Array of cell values from a field in the linked table.

Cell format V2 (webhooks)

``

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#lookup-cellformat-v-2-valuesbylinkedrecordid)`valuesByLinkedRecordId` | `object`

|     |     |
| --- | --- |
| `key: string` | `array of any` | |
| [§](https://airtable.com/developers/web/api/field-model#lookup-cellformat-v-2-linkedrecordids)`linkedRecordIds` | `array of strings` |

Field type and options (read only)

``

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#lookup-fieldtype-type)`type` | `"multipleLookupValues"` |
| [§](https://airtable.com/developers/web/api/field-model#lookup-fieldtype-options)`options` | `object`

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#lookup-fieldtype-options-fieldidinlinkedtable)`fieldIdInLinkedTable` | `string | null` <br>The field in the linked table that this field is looking up. |
| [§](https://airtable.com/developers/web/api/field-model#lookup-fieldtype-options-isvalid)`isValid` | `boolean` <br>Is the field currently valid (e.g. false if the linked record field has<br>been deleted) |
| [§](https://airtable.com/developers/web/api/field-model#lookup-fieldtype-options-recordlinkfieldid)`recordLinkFieldId` | `string | null` <br>The linked record field in the current table. |
| [§](https://airtable.com/developers/web/api/field-model#lookup-fieldtype-options-result)`result` | `Field type and options | null` <br>The field type and options inside of the linked table. See other field<br>type configs on this page for the possible values. Can be null if invalid. | |

## [§](https://airtable.com/developers/web/api/field-model\#multicollaborator) Multiple collaborator

Array of objects providing details about the user or [user group](https://support.airtable.com/docs/user-groups) collaborators in this field.

Note: Adding user groups to multiple collaborator fields is an enterprise feature.

Cell format (read)

`array of the below object`  ``

Object providing details about the user collaborator in this field.

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#multicollaborator-cellformat-id)`id` | `string` <br>User id or group id |
| [§](https://airtable.com/developers/web/api/field-model#multicollaborator-cellformat-email)`email` | `optional<` `string` `>` <br>User's email address |
| [§](https://airtable.com/developers/web/api/field-model#multicollaborator-cellformat-name)`name` | `optional<` `string` `>` <br>User's display name (may be omitted if the user hasn't created an account) |
| [§](https://airtable.com/developers/web/api/field-model#multicollaborator-cellformat-permissionlevel)`permissionLevel` | `optional<``"none" | "read" | "comment" | "edit" | "create"` `>` <br>User's collaborator permission Level<br>This is only included if you're observing a webhooks response. |
| [§](https://airtable.com/developers/web/api/field-model#multicollaborator-cellformat-profilepicurl)`profilePicUrl` | `optional<` `string` `>` <br>User's profile picture<br>This is only included if it exists for the user **and** you're observing a webhooks response. |

Cell format (write)

`array of strings`

Array of user or group ids

Similar to [multipleAttachments](https://airtable.com/developers/web/api/field-model#multiple-attachment) and
[multipleSelects](https://airtable.com/developers/web/api/field-model#multi-select), this array-type field will override the current
cell value when being updated. Be sure to spread the current cell value if you want to keep
the currently selected collaborators.

Field type and options

``

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#multicollaborator-fieldtype-type)`type` | `"multipleCollaborators"` |
| [§](https://airtable.com/developers/web/api/field-model#multicollaborator-fieldtype-options)`options` | `object`

|
| |

## [§](https://airtable.com/developers/web/api/field-model\#multiselect) Multiple select

Array of selected option names.

When creating or updating records, if a choice string does not exactly match an existing option,
the request will fail with an `INVALID_MULTIPLE_CHOICE_OPTIONS` error unless the `typecast`
parameter is enabled. If `typecast` is enabled, a new choice will be created if one does
not exactly match.

Similar to `multipleAttachments` and `multipleCollaborators`, this array-type field will override
the current cell value when being updated. Be sure to spread the current cell value if
you want to keep the currently selected choices.

Cell format V1

`array of strings`

Array of selected option names.

Cell format V2 (webhooks)

`array of the below object`  ``

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#multiselect-cellformat-v-2-id)`id` | `string` |
| [§](https://airtable.com/developers/web/api/field-model#multiselect-cellformat-v-2-color)`color` | `optional<` `string` `>` <br>Optional when the select field is configured to not use colors.<br>Allowed values: "blueLight2", "cyanLight2", "tealLight2", "greenLight2", "yellowLight2", "orangeLight2", "redLight2", "pinkLight2", "purpleLight2", "grayLight2", "blueLight1", "cyanLight1", "tealLight1", "greenLight1", "yellowLight1", "orangeLight1", "redLight1", "pinkLight1", "purpleLight1", "grayLight1", "blueBright", "cyanBright", "tealBright", "greenBright", "yellowBright", "orangeBright", "redBright", "pinkBright", "purpleBright", "grayBright", "blueDark1", "cyanDark1", "tealDark1", "greenDark1", "yellowDark1", "orangeDark1", "redDark1", "pinkDark1", "purpleDark1", "grayDark1" |
| [§](https://airtable.com/developers/web/api/field-model#multiselect-cellformat-v-2-name)`name` | `string` |

Field type and options (read)

``

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#multiselect-fieldtype-type)`type` | `"multipleSelects"` |
| [§](https://airtable.com/developers/web/api/field-model#multiselect-fieldtype-options)`options` | `object`

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#multiselect-fieldtype-options-choices)`choices` | `array of the below object`  ``

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#multiselect-fieldtype-options-choices-id)`id` | `string` |
| [§](https://airtable.com/developers/web/api/field-model#multiselect-fieldtype-options-choices-color)`color` | `optional<` `string` `>` <br>Optional when the select field is configured to not use colors.<br>Allowed values: "blueLight2", "cyanLight2", "tealLight2", "greenLight2", "yellowLight2", "orangeLight2", "redLight2", "pinkLight2", "purpleLight2", "grayLight2", "blueLight1", "cyanLight1", "tealLight1", "greenLight1", "yellowLight1", "orangeLight1", "redLight1", "pinkLight1", "purpleLight1", "grayLight1", "blueBright", "cyanBright", "tealBright", "greenBright", "yellowBright", "orangeBright", "redBright", "pinkBright", "purpleBright", "grayBright", "blueDark1", "cyanDark1", "tealDark1", "greenDark1", "yellowDark1", "orangeDark1", "redDark1", "pinkDark1", "purpleDark1", "grayDark1" |
| [§](https://airtable.com/developers/web/api/field-model#multiselect-fieldtype-options-choices-name)`name` | `string` | | |

Field type and options (write)

``

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#multiselect-fieldtype-write-type)`type` | `"multipleSelects"` |
| [§](https://airtable.com/developers/web/api/field-model#multiselect-fieldtype-write-options)`options` | `object`

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#multiselect-fieldtype-write-options-choices)`choices` | `array of the below object`  ``

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#multiselect-fieldtype-write-options-choices-id)`id` | `optional<` `string` `>` <br>This is not specified when creating new options, useful when specifing existing<br>options (for example: reordering options, keeping old options and adding new ones, etc) |
| [§](https://airtable.com/developers/web/api/field-model#multiselect-fieldtype-write-options-choices-color)`color` | `optional<` `string` `>` <br>Optional when creating an option. |
| [§](https://airtable.com/developers/web/api/field-model#multiselect-fieldtype-write-options-choices-name)`name` | `string` | | |

## [§](https://airtable.com/developers/web/api/field-model\#decimalorintegernumber) Number

A integer(whole number, e.g. 1, 32, 99) or decimal number showing decimal digits. Precision set with the field config.

Cell format

`number`

Field type and options

``

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#decimalorintegernumber-fieldtype-type)`type` | `"number"` |
| [§](https://airtable.com/developers/web/api/field-model#decimalorintegernumber-fieldtype-options)`options` | `object`

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#decimalorintegernumber-fieldtype-options-precision)`precision` | `number` <br>Indicates the number of digits shown to the right of the decimal point for this field. (0-8 inclusive) | |

## [§](https://airtable.com/developers/web/api/field-model\#percentnumber) Percent

Decimal number representing a percentage value. For example, the underlying cell value for 12.3% is 0.123.

Cell format

`number`

Field type and options

``

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#percentnumber-fieldtype-type)`type` | `"percent"` |
| [§](https://airtable.com/developers/web/api/field-model#percentnumber-fieldtype-options)`options` | `object`

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#percentnumber-fieldtype-options-precision)`precision` | `number` <br>Indicates the number of digits shown to the right of the decimal point for this field. (0-8 inclusive) | |

## [§](https://airtable.com/developers/web/api/field-model\#phone) Phone

A telephone number, e.g. "(415) 555-9876".

Cell format

`string`

Field type and options

``

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#phone-fieldtype-type)`type` | `"phoneNumber"` |

## [§](https://airtable.com/developers/web/api/field-model\#rating) Rating

A positive integer (e.g. "3 stars" is 3). A rating cannot be 0.

Cell format

`number`

Field type and options

``

Bases on a free or plus plan are limited to using the 'star' icon and 'yellowBright' color.

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#rating-fieldtype-type)`type` | `"rating"` |
| [§](https://airtable.com/developers/web/api/field-model#rating-fieldtype-options)`options` | `object`

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#rating-fieldtype-options-color)`color` | `"yellowBright" | "orangeBright" | "redBright" | "pinkBright" | "purpleBright" | "blueBright" | "cyanBright" | "tealBright" | "greenBright" | "grayBright"` <br>The color of selected icons. |
| [§](https://airtable.com/developers/web/api/field-model#rating-fieldtype-options-icon)`icon` | `"star" | "heart" | "thumbsUp" | "flag" | "dot"` <br>The icon name used to display the rating. |
| [§](https://airtable.com/developers/web/api/field-model#rating-fieldtype-options-max)`max` | `number` <br>The maximum value for the rating, from 1 to 10 inclusive. | |

## [§](https://airtable.com/developers/web/api/field-model\#richtext) Rich text

Long text (with rich text formatting enabled)

A Markdown-inspired markup language.
[Learn more about using Markdown in long text's rich text formatting API.](https://support.airtable.com/docs/using-rich-text-with-airtable)

Cell format

`string`

Field type and options

``

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#richtext-fieldtype-type)`type` | `"richText"` |

## [§](https://airtable.com/developers/web/api/field-model\#rollup) Rollup

A rollup allows you to summarize data from records that are linked to this table.

Cell format V1 (read only)

`string | number | true`

Cell format V2 (webhooks)

`any`

Field type and options (read only)

``

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#rollup-fieldtype-type)`type` | `"rollup"` |
| [§](https://airtable.com/developers/web/api/field-model#rollup-fieldtype-options)`options` | `object`

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#rollup-fieldtype-options-fieldidinlinkedtable)`fieldIdInLinkedTable` | `optional<` `string` `>` <br>The id of the field in the linked table |
| [§](https://airtable.com/developers/web/api/field-model#rollup-fieldtype-options-recordlinkfieldid)`recordLinkFieldId` | `optional<` `string` `>` <br>The linked field id |
| [§](https://airtable.com/developers/web/api/field-model#rollup-fieldtype-options-result)`result` | `optional<` `Field type and options | null` `>` <br>The resulting field type and options for the rollup. See other field<br>type configs on this page for the possible values. Can be null if invalid. |
| [§](https://airtable.com/developers/web/api/field-model#rollup-fieldtype-options-isvalid)`isValid` | `optional<` `boolean` `>` |
| [§](https://airtable.com/developers/web/api/field-model#rollup-fieldtype-options-referencedfieldids)`referencedFieldIds` | `optional<` `array of strings` `>` <br>The ids of any fields referenced in the rollup formula | |

## [§](https://airtable.com/developers/web/api/field-model\#simpletext) Single line text

A single line of text.

Cell format

`string`

Field type and options

``

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#simpletext-fieldtype-type)`type` | `"singleLineText"` |

## [§](https://airtable.com/developers/web/api/field-model\#select) Single select

Selected option name.

When creating or updating records, if the choice string does not exactly match an existing option,
the request will fail with an `INVALID_MULTIPLE_CHOICE_OPTIONS` error unless the `typecast` parameter
is enabled. If `typecast` is enabled, a new choice will be created if one does not exactly match.

Cell format V1

`string`

Cell format V2 (webhooks)

``

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#select-cellformat-v-2-id)`id` | `string` |
| [§](https://airtable.com/developers/web/api/field-model#select-cellformat-v-2-color)`color` | `optional<` `string` `>` <br>Optional when the select field is configured to not use colors.<br>Allowed values: "blueLight2", "cyanLight2", "tealLight2", "greenLight2", "yellowLight2", "orangeLight2", "redLight2", "pinkLight2", "purpleLight2", "grayLight2", "blueLight1", "cyanLight1", "tealLight1", "greenLight1", "yellowLight1", "orangeLight1", "redLight1", "pinkLight1", "purpleLight1", "grayLight1", "blueBright", "cyanBright", "tealBright", "greenBright", "yellowBright", "orangeBright", "redBright", "pinkBright", "purpleBright", "grayBright", "blueDark1", "cyanDark1", "tealDark1", "greenDark1", "yellowDark1", "orangeDark1", "redDark1", "pinkDark1", "purpleDark1", "grayDark1" |
| [§](https://airtable.com/developers/web/api/field-model#select-cellformat-v-2-name)`name` | `string` |

Field type and options (read)

``

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#select-fieldtype-type)`type` | `"singleSelect"` |
| [§](https://airtable.com/developers/web/api/field-model#select-fieldtype-options)`options` | `object`

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#select-fieldtype-options-choices)`choices` | `array of the below object`  ``

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#select-fieldtype-options-choices-id)`id` | `string` |
| [§](https://airtable.com/developers/web/api/field-model#select-fieldtype-options-choices-color)`color` | `optional<` `string` `>` <br>Optional when the select field is configured to not use colors.<br>Allowed values: "blueLight2", "cyanLight2", "tealLight2", "greenLight2", "yellowLight2", "orangeLight2", "redLight2", "pinkLight2", "purpleLight2", "grayLight2", "blueLight1", "cyanLight1", "tealLight1", "greenLight1", "yellowLight1", "orangeLight1", "redLight1", "pinkLight1", "purpleLight1", "grayLight1", "blueBright", "cyanBright", "tealBright", "greenBright", "yellowBright", "orangeBright", "redBright", "pinkBright", "purpleBright", "grayBright", "blueDark1", "cyanDark1", "tealDark1", "greenDark1", "yellowDark1", "orangeDark1", "redDark1", "pinkDark1", "purpleDark1", "grayDark1" |
| [§](https://airtable.com/developers/web/api/field-model#select-fieldtype-options-choices-name)`name` | `string` | | |

Field type and options (write)

``

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#select-fieldtype-write-type)`type` | `"singleSelect"` |
| [§](https://airtable.com/developers/web/api/field-model#select-fieldtype-write-options)`options` | `object`

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#select-fieldtype-write-options-choices)`choices` | `array of the below object`  ``

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#select-fieldtype-write-options-choices-id)`id` | `optional<` `string` `>` <br>This is not specified when creating new options, useful when specifing existing<br>options (for example: reordering options, keeping old options and adding new ones, etc) |
| [§](https://airtable.com/developers/web/api/field-model#select-fieldtype-write-options-choices-color)`color` | `optional<` `string` `>` <br>Optional when creating an option. |
| [§](https://airtable.com/developers/web/api/field-model#select-fieldtype-write-options-choices-name)`name` | `string` | | |

## [§](https://airtable.com/developers/web/api/field-model\#syncsource) Sync source

Shows the name of the source that a record is synced from. This field is only available on synced tables.

Cell format V1 (read only)

`string`

The sync source name.

Cell format V2 (webhooks)

``

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#syncsource-cellformat-v-2-id)`id` | `string` <br>The id unique for this source within this base. **Not** the baseId. |
| [§](https://airtable.com/developers/web/api/field-model#syncsource-cellformat-v-2-name)`name` | `string` <br>The sync source name. |
| [§](https://airtable.com/developers/web/api/field-model#syncsource-cellformat-v-2-color)`color` | `optional<` `string` `>` |

Field type and options

``

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#syncsource-fieldtype-type)`type` | `"externalSyncSource"` |
| [§](https://airtable.com/developers/web/api/field-model#syncsource-fieldtype-options)`options` | `object`

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#syncsource-fieldtype-options-choices)`choices` | `array of the below object`  ``

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#syncsource-fieldtype-options-choices-id)`id` | `string` |
| [§](https://airtable.com/developers/web/api/field-model#syncsource-fieldtype-options-choices-color)`color` | `optional<` `string` `>` <br>Optional when the select field is configured to not use colors.<br>Allowed values: "blueLight2", "cyanLight2", "tealLight2", "greenLight2", "yellowLight2", "orangeLight2", "redLight2", "pinkLight2", "purpleLight2", "grayLight2", "blueLight1", "cyanLight1", "tealLight1", "greenLight1", "yellowLight1", "orangeLight1", "redLight1", "pinkLight1", "purpleLight1", "grayLight1", "blueBright", "cyanBright", "tealBright", "greenBright", "yellowBright", "orangeBright", "redBright", "pinkBright", "purpleBright", "grayBright", "blueDark1", "cyanDark1", "tealDark1", "greenDark1", "yellowDark1", "orangeDark1", "redDark1", "pinkDark1", "purpleDark1", "grayDark1" |
| [§](https://airtable.com/developers/web/api/field-model#syncsource-fieldtype-options-choices-name)`name` | `string` | | |

## [§](https://airtable.com/developers/web/api/field-model\#urltext) Url

A valid URL (e.g. airtable.com or [https://airtable.com/universe](https://airtable.com/universe)).

Cell format

`string`

Field type and options

``

|     |     |
| --- | --- |
| [§](https://airtable.com/developers/web/api/field-model#urltext-fieldtype-type)`type` | `"url"` |


