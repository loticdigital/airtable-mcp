# Airtable API Documentation

Guide

# Authentication

## [§](/developers/web/api/authentication\#basics) Basics

Airtable's API uses token-based authentication, allowing users to authenticate API requests by inputting their tokens
into the HTTP authorization bearer token header.

Example:

```

curl https://api.airtable.com/v0/YOUR_BASE_ID/YOUR_TABLE_ID_OR_NAME -H \
"Authorization: Bearer YOUR_TOKEN"
```

All API requests must be authenticated and made through HTTPS.

Passing personal access tokens and OAuth access tokens via the legacy `api_key` URL parameter is not supported.

## [§](/developers/web/api/authentication\#types-of-token) Types of token

> As of February 1st 2024, the deprecation period for Airtable API keys has ended. Users of Airtable API keys must
> migrate to the new authentication methods to continue using Airtable's API. See [this article](https://support.airtable.com/docs/airtable-api-key-deprecation-notice)
> for more details.

We currently support using personal access tokens and OAuth access tokens during the authentication process.

[Personal access tokens](/developers/web/guides/personal-access-tokens) are for personal development, like building an integration for
yourself, your client, or your company. They can be created and managed at [/create/tokens](/../../create/tokens) or
from the enterprise admin panel for [service accounts](https://support.airtable.com/docs/service-accounts-overview). Personal access tokens act as your user account, and should not
be shared with third-party services or integrations.

[OAuth access tokens](/developers/web/guides/oauth-integrations) are recommended for building an integration where other users grant your
service access to Airtable’s API on their behalf. In this case, your integration is a third-party service with respect to Airtable.
After registering your integration with Airtable at [/create/oauth](/../../create/oauth), tokens are available
via the [OAuth grant flow](https://oauth.net/2/).

Any integrations that allow other users to grant access to Airtable should use OAuth.

## [§](/developers/web/api/authentication\#scopes-and-resources-access) Scopes and resources/access

Personal access and Oauth tokens serve as the account of the user who grants access, with the following limitations:

- [Scopes](/developers/web/api/scopes): What actions the token can perform.
- Resources/access: What bases and workspace the token can access. Tokens can be granted access to individual—or all—bases/workspaces. These can be listed using the [list bases](/developers/web/api/list-bases) endpoint.

For example, to update a record in a base via API, the user who granted the token must have editor access to the base.
Additionally, the token must have both the correct scope ( `data.records:write`) and the base added to it as a resource.

For personal access tokens, scopes and resources/access are individually configured from [/create/tokens](/../../create/tokens).
And for OAuth access tokens, developers choose the requested scopes from [/create/oauth](/../../create/oauth),
while end-users decide what resources to grant access to.

![](https://airtable.com/internal/page_view?isInitialPageLoad=true&pageLoadId=pglEu47UH6uNYbjHd&location=https%3A%2F%2Fairtable.com%2Fdevelopers%2Fweb%2Fapi%2Fauthentication)

Guide

# Scopes

Scopes control what actions a token can perform.

[Personal access tokens](https://airtable.com/developers/web/guides/personal-access-tokens) and [OAuth access tokens](https://airtable.com/developers/web/guides/oauth-integrations) can only access API endpoints covered by the scopes granted to them. A full reference of available scopes is below.

**Note**: By default, OAuth integrations can only request basic scopes. See [here](https://airtable.com/developers/web/guides/oauth-integrations#making-api-requests) for more information about requesting enterprise scopes.

On top of requesting the correct scope, the user and token must also have the required resources and permissions to perform the action.

Example 1: a personal access token with the scope `data.records:read` and a base added to it would be able to use the "Read records" endpoint on that base, but would not be allowed to use the "Write records" endpoint for that base. Similarly, it would not be able to use the "Read records" endpoint to access other bases that have not been added to the token.

Example 2: a personal access token with the scope `schema.bases:read` and multiple bases added to it would only be able to create fields in bases where the user has Creator permissions (required to customize fields).

For more information on how tokens work, refer to the [Authentication](https://airtable.com/developers/web/api/authentication) reference.

## Basic scopes

The following scopes are available to all users:

[§](/developers/web/api/scopes#data-records-read)`data.records:read`

See the data in records

- [List records](https://airtable.com/developers/web/api/list-records)
- [Get record](https://airtable.com/developers/web/api/get-record)

[§](/developers/web/api/scopes#data-records-write)`data.records:write`

Create, edit, and delete records

- [Delete multiple records](https://airtable.com/developers/web/api/delete-multiple-records)
- [Update multiple records](https://airtable.com/developers/web/api/update-multiple-records)
- [Create records](https://airtable.com/developers/web/api/create-records)
- [Sync CSV data](https://airtable.com/developers/web/api/post-sync-api-endpoint)
- [Delete record](https://airtable.com/developers/web/api/delete-record)
- [Update record](https://airtable.com/developers/web/api/update-record)

[§](/developers/web/api/scopes#data-record-comments-read)`data.recordComments:read`

See comments in records

- [List comments](https://airtable.com/developers/web/api/list-comments)

[§](/developers/web/api/scopes#data-record-comments-write)`data.recordComments:write`

Create, edit, and delete record comments

- [Create comment](https://airtable.com/developers/web/api/create-comment)
- [Delete comment](https://airtable.com/developers/web/api/delete-comment)
- [Update comment](https://airtable.com/developers/web/api/update-comment)

[§](/developers/web/api/scopes#schema-bases-read)`schema.bases:read`

See the structure of a base, like table names or field types

- [List bases](https://airtable.com/developers/web/api/list-bases)
- [Get base schema](https://airtable.com/developers/web/api/get-base-schema)

[§](/developers/web/api/scopes#schema-bases-write)`schema.bases:write`

Edit the structure of a base, like adding new fields or tables

- [Create base](https://airtable.com/developers/web/api/create-base)
- [Create table](https://airtable.com/developers/web/api/create-table)
- [Update table](https://airtable.com/developers/web/api/update-table)
- [Create field](https://airtable.com/developers/web/api/create-field)
- [Update field](https://airtable.com/developers/web/api/update-field)
- [Sync CSV data](https://airtable.com/developers/web/api/post-sync-api-endpoint)

[§](/developers/web/api/scopes#webhook-manage)`webhook:manage`

View, create, delete webhooks for a base, as well as fetch webhook payloads.

- [List webhooks](https://airtable.com/developers/web/api/list-webhooks)
- [Create a webhook](https://airtable.com/developers/web/api/create-a-webhook)
- [Delete a webhook](https://airtable.com/developers/web/api/delete-a-webhook)
- [Enable/disable webhook notifications](https://airtable.com/developers/web/api/enable-disable-webhook-notifications)
- [Refresh a webhook](https://airtable.com/developers/web/api/refresh-a-webhook)

[§](/developers/web/api/scopes#block-manage)`block:manage`

Create new releases and submissions for custom extensions via the Blocks CLI.

[§](/developers/web/api/scopes#user-email-read)`user.email:read`

See the user's email address

## Enterprise member scopes

The following scopes are only available to users on an enterprise account:

[§](/developers/web/api/scopes#enterprise-groups-read)`enterprise.groups:read`

View information about user groups under the enterprise, their access, and their members

- [Get user group](https://airtable.com/developers/web/api/get-user-group)

[§](/developers/web/api/scopes#workspaces-and-bases-read)`workspacesAndBases:read`

View metadata about workspaces, bases, and views including collaborators

- [Get base collaborators](https://airtable.com/developers/web/api/get-base-collaborators)
- [List block installations](https://airtable.com/developers/web/api/list-block-installations)
- [Get interface](https://airtable.com/developers/web/api/get-interface)
- [List views](https://airtable.com/developers/web/api/list-views)
- [Get view metadata](https://airtable.com/developers/web/api/get-view-metadata)
- [Get workspace collaborators](https://airtable.com/developers/web/api/get-workspace-collaborators)

[§](/developers/web/api/scopes#workspaces-and-bases-write)`workspacesAndBases:write`

Edit metadata of workspaces and bases, including collaborators, invites, views, and extensions

- [Delete block installation](https://airtable.com/developers/web/api/delete-block-installation)
- [Manage block installation](https://airtable.com/developers/web/api/manage-block-installation)
- [Add base collaborator](https://airtable.com/developers/web/api/add-base-collaborator)
- [Delete base collaborator](https://airtable.com/developers/web/api/delete-base-collaborator)
- [Update collaborator base permission](https://airtable.com/developers/web/api/update-collaborator-base-permission)
- [Add interface collaborator](https://airtable.com/developers/web/api/add-interface-collaborator)
- [Delete interface collaborator](https://airtable.com/developers/web/api/delete-interface-collaborator)
- [Update interface collaborator](https://airtable.com/developers/web/api/update-interface-collaborator)
- [Delete interface invite](https://airtable.com/developers/web/api/delete-interface-invite)
- [Delete base invite](https://airtable.com/developers/web/api/delete-base-invite)
- [Delete view](https://airtable.com/developers/web/api/delete-view)
- [Add workspace collaborator](https://airtable.com/developers/web/api/add-workspace-collaborator)
- [Delete workspace collaborator](https://airtable.com/developers/web/api/delete-workspace-collaborator)
- [Update workspace collaborator](https://airtable.com/developers/web/api/update-workspace-collaborator)
- [Delete workspace invite](https://airtable.com/developers/web/api/delete-workspace-invite)
- [Update workspace restrictions](https://airtable.com/developers/web/api/update-workspace-restrictions)

[§](/developers/web/api/scopes#workspaces-and-bases-shares-manage)`workspacesAndBases.shares:manage`

View, enable, disable and delete share links for bases. Note: Share links can be used to view the data in the base.

- [List shares](https://airtable.com/developers/web/api/list-shares)
- [Delete share](https://airtable.com/developers/web/api/delete-share)
- [Manage share](https://airtable.com/developers/web/api/manage-share)

## Enterprise admin scopes

The following scopes are only available to enterprise admins:

[§](/developers/web/api/scopes#enterprise-scim-users-and-groups-manage)`enterprise.scim.usersAndGroups:manage`

Manage the organization's users and groups via SCIM APIs, including provisioning and deprovisioning them.

- [List groups](https://airtable.com/developers/web/api/list-scim-groups)
- [Create group](https://airtable.com/developers/web/api/create-scim-group)
- [Delete group](https://airtable.com/developers/web/api/delete-scim-group)
- [Get group](https://airtable.com/developers/web/api/get-scim-group)
- [Patch group](https://airtable.com/developers/web/api/patch-scim-group)
- [Put group](https://airtable.com/developers/web/api/put-scim-group)
- [List users](https://airtable.com/developers/web/api/list-scim-users)
- [Create user](https://airtable.com/developers/web/api/create-scim-user)
- [Delete user](https://airtable.com/developers/web/api/delete-scim-user)
- [Get user](https://airtable.com/developers/web/api/get-scim-user)
- [Patch user](https://airtable.com/developers/web/api/patch-scim-user)
- [Put user](https://airtable.com/developers/web/api/put-scim-user)

[§](/developers/web/api/scopes#enterprise-audit-logs-read)`enterprise.auditLogs:read`

View the organization's audit logs

- [Audit log events](https://airtable.com/developers/web/api/audit-log-events)
- [List audit log requests](https://airtable.com/developers/web/api/list-audit-log-requests)
- [Create audit log request](https://airtable.com/developers/web/api/create-audit-log-request)
- [Get audit log request](https://airtable.com/developers/web/api/get-audit-log-request)

[§](/developers/web/api/scopes#enterprise-change-events-read)`enterprise.changeEvents:read`

View the organization's change events

- [Change events](https://airtable.com/developers/web/api/change-events)

[§](/developers/web/api/scopes#enterprise-exports-manage)`enterprise.exports:manage`

Manage the organization's data exports, including eDiscovery exports

- [List eDiscovery exports](https://airtable.com/developers/web/api/list-ediscovery-export)
- [Create eDiscovery export](https://airtable.com/developers/web/api/create-ediscovery-export)
- [Get eDiscovery export](https://airtable.com/developers/web/api/get-ediscovery-export)

[§](/developers/web/api/scopes#enterprise-account-read)`enterprise.account:read`

View data about the enterprise account, including workspaces ids, users, groups and email domains

- [Get enterprise](https://airtable.com/developers/web/api/get-enterprise)

[§](/developers/web/api/scopes#enterprise-account-write)`enterprise.account:write`

Edit data about the enterprise account, including creating descendant enterprise accounts

- [Create descendant enterprise](https://airtable.com/developers/web/api/create-descendant-enterprise)

[§](/developers/web/api/scopes#enterprise-user-read)`enterprise.user:read`

View account information of users under the enterprise, including user id, name, email and bases user has access to

- [Get users by id or email](https://airtable.com/developers/web/api/get-users-by-id-or-email)
- [Get user by id](https://airtable.com/developers/web/api/get-user-by-id)

[§](/developers/web/api/scopes#enterprise-user-write)`enterprise.user:write`

Manage users under the enterprise account, including provisioning, deactivating and deleting users

- [Delete users by email](https://airtable.com/developers/web/api/delete-users-by-email)
- [Manage user batched](https://airtable.com/developers/web/api/manage-user-batched)
- [Manage user membership](https://airtable.com/developers/web/api/manage-user-membership)
- [Grant admin access](https://airtable.com/developers/web/api/grant-admin-access)
- [Revoke admin access](https://airtable.com/developers/web/api/revoke-admin-access)
- [Delete user by id](https://airtable.com/developers/web/api/delete-user-by-id)
- [Manage user](https://airtable.com/developers/web/api/manage-user)
- [Logout user](https://airtable.com/developers/web/api/logout-user)
- [Remove user from enterprise](https://airtable.com/developers/web/api/remove-user-from-enterprise)

[§](/developers/web/api/scopes#enterprise-groups-manage)`enterprise.groups:manage`

Manage user groups under the enterprise, including moving them

- [Move user groups](https://airtable.com/developers/web/api/move-user-groups)

[§](/developers/web/api/scopes#workspaces-and-bases-manage)`workspacesAndBases:manage`

Manage workspaces and bases under the enterprise, including moving them

- [Delete base](https://airtable.com/developers/web/api/delete-base)
- [Move workspaces](https://airtable.com/developers/web/api/move-workspaces)
- [Delete workspace](https://airtable.com/developers/web/api/delete-workspace)
- [Move base](https://airtable.com/developers/web/api/move-base)

![](https://airtable.com/internal/page_view?isInitialPageLoad=true&pageLoadId=pglyCTUQvTw7iFqfE&location=https%3A%2F%2Fairtable.com%2Fdevelopers%2Fweb%2Fapi%2Fscopes)


# Errors

The Airtable Web API follows HTTP status code semantics.

2xx codes signify success, 4xx mostly represent user error, 5xx generally correspond to a server error. The error messages will return a JSON-encoded body that contains **error** and **message** fields. Those will provide specific error condition and human-readable message to identify what caused the error.

## [§](/developers/web/api/errors\#success-code) Success code

### [§](/developers/web/api/errors\#anchor-200-ok)`200 OK`

Request completed successfully.

## [§](/developers/web/api/errors\#user-error-codes) User error codes

These errors generally indicate a problem on the client side. If you are getting one of these, check your code and the request details.

### [§](/developers/web/api/errors\#anchor-400-bad-request)`400 Bad Request`

The request encoding is invalid; the request can't be parsed as a valid JSON.

### [§](/developers/web/api/errors\#anchor-401-unauthorized)`401 Unauthorized`

Accessing a protected resource without authorization or with invalid credentials.

### [§](/developers/web/api/errors\#anchor-403-forbidden)`403 Forbidden`

Accessing a protected resource with API credentials that don't have access to that resource.

See [below](/developers/web/api/errors#anchor-403) for examples and suggested debugging steps.

### [§](/developers/web/api/errors\#anchor-404-not-found)`404 Not Found`

Route or resource is not found. This error is returned when the request hits an undefined route, or if the resource doesn't exist (e.g. has been deleted).

### [§](/developers/web/api/errors\#anchor-413-request-entity-too-large)`413 Request Entity Too Large`

The request exceeded the maximum allowed payload size. You shouldn't encounter this under normal use.

### [§](/developers/web/api/errors\#anchor-422-invalid-request)`422 Invalid Request`

The request data is invalid. This includes most of the base-specific validations. You will receive a detailed error message and code pointing to the exact issue.

### [§](/developers/web/api/errors\#anchor-429-too-many-requests)`429 Too Many Requests`

The API is limited to 5 requests per second per base. You will receive a 429 status code and a message "Rate limit exceeded. Please try again later" and will need to wait 30 seconds before subsequent requests will succeed. To learn more about rate limits, please visit our [Rate Limits](/developers/web/api/rate-limits) guide.

## [§](/developers/web/api/errors\#server-error-codes) Server error codes

These errors generally represent an error on our side. In the event of a 5xx error code, detailed information about the error will be automatically recorded, and Airtable's developers will be notified.

### [§](/developers/web/api/errors\#anchor-500-internal-server-error)`500 Internal Server Error`

The server encountered an unexpected condition.

### [§](/developers/web/api/errors\#anchor-502-bad-gateway)`502 Bad Gateway`

Airtable's servers are restarting or an unexpected outage is in progress. You should generally not receive this error, and requests are safe to retry.

### [§](/developers/web/api/errors\#anchor-503-service-unavailable)`503 Service Unavailable`

The server could not process your request in time. The server could be temporarily unavailable, or it could have timed out processing your request. You should retry the request with backoffs.

## [§](/developers/web/api/errors\#example-error-responses) Example error responses

### [§](/developers/web/api/errors\#anchor-404)`404`

The path is not valid.

```

404 Not Found
{
  "error": "NOT_FOUND"
}
```

```

404 Not Found
{
  "error": {
    "type": "NOT_FOUND"
  }
}
```

### [§](/developers/web/api/errors\#anchor-403)`403`

You don't have the right permission for the resource, or the resource was not found.

Check that both you and the token have access to the resource. For example, to access a base using a personal access token,
your user must be a collaborator _and_ the token must also have access to the base. See [this guide](/developers/web/api/authentication#scopes-and-resources-access) for more details.

```

403 Forbidden
{
  "error": {
    "type": "INVALID_PERMISSIONS_OR_MODEL_NOT_FOUND",
    "message": "Invalid permissions, or the requested model was not found. Check that both your user and your token have the required permissions, and that the model names and/or ids are correct."
  }
}
```

You don't have permission to create records in the given table. This is returned both when creating records directly,
and when creating linked records while updating cell values.

Check whether the table or any fields you are setting values for have [editing permissions](https://support.airtable.com/docs/using-field-and-table-editing-permissions) limited.

```

403 Forbidden
{
  "error": {
    "type": "INVALID_PERMISSIONS",
    "message": "You are not permitted to create records in table TABLE_NAME (TABLE_ID)"
  }
}
```

You don't have permission to update cell values in the given field. Check whether the field has [editing permissions](https://support.airtable.com/docs/using-field-and-table-editing-permissions) limited.

```

403 Forbidden
{
  "error": {
    "type": "INVALID_PERMISSIONS",
    "message": "You are not permitted to write cell values in field FIELD_NAME (FIELD_ID)"
  }
}
```

You don't have the right permission for the action.

```

403 Forbidden
{
  "error": {
    "type": "INVALID_PERMISSIONS",
    "message": "You are not permitted to perform this operation"
  }
}
```

### [§](/developers/web/api/errors\#anchor-422)`422`

The path is correct, however the body is either not understood or not permitted.

```

422 Unprocessable Entity
{
  "error": {
    "type": "INVALID_REQUEST_UNKNOWN",
    "message": "Invalid request: parameter validation failed. Check your request data."
  }
}
```

### [§](/developers/web/api/errors\#anchor-429)`429`

The request has been rate limited.

```

429 Too Many Requests
{
  "error": {
    "type": "RATE_LIMIT_REACHED",
    "message": "Rate limit exceeded. Please try again later"
  }
}
```

### [§](/developers/web/api/errors\#anchor-503)`503`

The server is temporarily unavailable and the request should be retried. The `Retry-After` header may be provided.

```

503 Service Unavailable
{
  "error": {
    "type": "RETRIABLE_ERROR",
    "message": "Server encountered an error while processing your request, and it is safe to retry the request"
  }
}
```

Records

# List records

get `https://api.airtable.com/v0/{baseId}/{tableIdOrName}`

List records in a table. Note that table names and table ids can be used interchangeably.
We recommend using table IDs so you don't need to modify your API request when your table name changes.

The server returns one page of records at a time. Each page will contain **pageSize** records, which is 100 by default.
If there are more records, the response will contain an **offset**. To fetch the next page of records, include **offset** in the next request's parameters.
Pagination will stop when you've reached the end of your table. If the **maxRecords** parameter is passed, pagination will stop once you've reached this maximum.

Returned records do not include any fields with "empty" values, e.g. **""**, **\[\]**, or **false**.

You can filter, sort, and format the results with query parameters. Note that these parameters need to be URL encoded.
You can use our [API URL encoder tool](https://codepen.io/airtable/pen/MeXqOg) to help with this.
If you are using a helper library like [Airtable.js](https://github.com/Airtable/airtable.js), these parameters will be automatically encoded.

**Note** Airtable's API only accepts request with a URL shorter than 16,000 characters. Encoded formulas may cause your requests to exceed this limit.
To fix this issue you can instead make a POST request to `/v0/{baseId}/{tableIdOrName}/listRecords` while passing the parameters within the body of
the request instead of the query parameters.

[§](/developers/web/api/list-records#requirements)

### Requirements

|     |     |
| --- | --- |
| Authentication | [Personal access token](https://airtable.com/developers/web/api/authentication#types-of-token), [OAuth integration](https://airtable.com/developers/web/api/authentication#types-of-token) |
| Scope | [`data.records:read`](https://airtable.com/developers/web/api/scopes#data-records-read) |
| User role | Base read-only |
| Billing plans | All plans |

[§](/developers/web/api/list-records#path)

### Path parameters

``

|     |     |
| --- | --- |
| [§](/developers/web/api/list-records#path-baseid)`baseId` | `string` |
| [§](/developers/web/api/list-records#path-tableidorname)`tableIdOrName` | `string` |

[§](/developers/web/api/list-records#query)

### Query parameters

``

|     |     |
| --- | --- |
| [§](/developers/web/api/list-records#query-timezone)`timeZone` | `optional<` [`Timezone`](https://airtable.com/developers/web/api/model/timezone) `>` <br>The [time zone](https://support.airtable.com/docs/supported-timezones-for-set-timezone)<br>that should be used to format dates when using `string` as the `cellFormat`. This parameter is<br>required when using `string` as the `cellFormat`. |
| [§](/developers/web/api/list-records#query-userlocale)`userLocale` | `optional<` `string` `>` <br>The [user locale](https://support.airtable.com/docs/supported-locale-modifiers-for-set-locale)<br>that should be used to format dates when using `string` as the `cellFormat`. This parameter is<br>required when using `string` as the `cellFormat`. |
| [§](/developers/web/api/list-records#query-pagesize)`pageSize` | `optional<` `number` `>` <br>The number of records returned in each request. Must be less than or equal to 100. Default is 100. |
| [§](/developers/web/api/list-records#query-maxrecords)`maxRecords` | `optional<` `number` `>` <br>The maximum total number of records that will be returned in your requests.<br>If this value is larger than **pageSize** (which is 100 by default), you may have to load multiple pages to reach this total. |
| [§](/developers/web/api/list-records#query-offset)`offset` | `optional<` `string` `>` <br>To fetch the next page of records, include offset from the previous request in the next request's parameters. |
| [§](/developers/web/api/list-records#query-view)`view` | `optional<` `string` `>` <br>The name or ID of a view in the table. If set, only the records in that view will be returned.<br>The records will be sorted according to the order of the view unless the **sort** parameter is included, which overrides that order.<br>Fields hidden in this view will be returned in the results. To only return a subset of fields, use the **fields** parameter. |
| [§](/developers/web/api/list-records#query-sort)`sort` | `optional<` `array of the below object` `>`

A list of sort objects that specifies how the records will be ordered.
Each sort object must have a **field** key specifying the name of the field to sort on,
and an optional **direction** key that is either **"asc"** or **"desc"**. The default direction is **"asc"**.

The **sort** parameter overrides the sorting of the view specified in the **view** parameter.
If neither the **sort** nor the **view** parameter is included, the order of records is arbitrary.

``

|     |     |
| --- | --- |
| [§](/developers/web/api/list-records#query-sort-field)`field` | `string` |
| [§](/developers/web/api/list-records#query-sort-direction)`direction` | `optional<``"asc" | "desc"` `>` | |
| [§](/developers/web/api/list-records#query-filterbyformula)`filterByFormula` | `optional<` `string` `>` <br>A [formula](https://support.airtable.com/docs/formula-field-reference) used to filter records.<br>The formula will be evaluated for each record, and if the result is not **0**, **false**, **""**, **NaN**, **\[\]**,<br>or **#Error!** the record will be included in the response. We recommend testing your formula in the Formula field UI<br>before using it in your API request.<br>If combined with the **view** parameter, only records in that view which satisfy the formula will be returned.<br>The formula must be encoded first before passing it as a value.<br>You can use [this tool](https://codepen.io/airtable/full/MeXqOg) to not only encode the formula but also create the entire url you need.<br>Formulas can use field names, or field id's inside of the formula.<br>**Note** Airtable's API only accepts request with a URL shorter than 16,000 characters.<br>Encoded formulas may cause your requests to exceed this limit. To fix this issue you can instead make a<br>POST request to `/v0/{baseId}/{tableIdOrName}/listRecords` while passing the<br>parameters within the body of the request instead of the query parameters. |
| [§](/developers/web/api/list-records#query-cellformat)`cellFormat` | `optional<``"json" | "string"` `>` <br>The format that should be used for cell values. Supported values are:<br>- **json**: cells will be formatted as JSON, depending on the field type.<br>- **string**: cells will be formatted as user-facing strings, regardless of the field type.<br>The **timeZone** and **userLocale** parameters are required when using **string** as the **cellFormat**.<br>**Note**: You should not rely on the format of these strings, as it is subject to change.<br>The default is **json**. |
| [§](/developers/web/api/list-records#query-fields)`fields` | `optional<` `array of strings` `>` <br>Only data for fields whose names or IDs are in this list will be included in the result.<br>If you don't need every field, you can use this parameter to reduce the amount of data transferred.<br>**Note** Airtable's API only accepts request with a URL shorter than 16,000 characters.<br>Encoded formulas may cause your requests to exceed this limit. To fix this issue you can instead make a<br>POST request to `/v0/{baseId}/{tableIdOrName}/listRecords` while passing the<br>parameters within the body of the request instead of the query parameters. |
| [§](/developers/web/api/list-records#query-returnfieldsbyfieldid)`returnFieldsByFieldId` | `optional<` `boolean` `>` <br>An optional boolean value that lets you return field objects where the key is the field id.<br>This defaults to **false**, which returns field objects where the key is the field name. |
| [§](/developers/web/api/list-records#query-recordmetadata)`recordMetadata` | `optional<` `array of "commentCount"` `>` <br>An optional field that, if specified, includes **commentCount** on each record returned. |

[§](/developers/web/api/list-records#response)

### Response format

``

List of records with fields and cell values

|     |     |
| --- | --- |
| [§](/developers/web/api/list-records#response-offset)`offset` | `optional<` `string` `>` <br>If there are more records, the response will contain an offset. Pass this offset into the<br>next request to fetch the next page of records. |
| [§](/developers/web/api/list-records#response-records)`records` | `array of the below object`  ``

A single record with field and cell values

|     |     |
| --- | --- |
| [§](/developers/web/api/list-records#response-records-id)`id` | `string` <br>Record ID |
| [§](/developers/web/api/list-records#response-records-createdtime)`createdTime` | `string` <br>A date timestamp in the ISO format, eg:"2018-01-01T00:00:00.000Z" |
| [§](/developers/web/api/list-records#response-records-fields)`fields` | `object`

Cell values are keyed by either field name or field ID (conditioned on `returnFieldsByFieldId`).

See [Cell Values](/developers/web/api/field-model) for more information on cell value response types.

|     |     |
| --- | --- |
| `key: string` | [`Cell value`](https://airtable.com/developers/web/api/field-model) | |
| [§](/developers/web/api/list-records#response-records-commentcount)`commentCount` | `optional<` `number` `>` <br>The number of comments (if there are any) on the record.<br>The `recordMetadata` query parameter must include `"commentCount"` in order to receive this. | |

### Error responses

Iteration timeout (422)

Iteration may timeout due to client inactivity or server restarts. It may then restart iteration from the beginning.

```

{
  "error": {
    "type": "LIST_RECORDS_ITERATOR_NOT_AVAILABLE"
  }
}
```

Request (example)

Copy

```

$
curl "https://api.airtable.com/v0/{baseId}/{tableIdOrName}" \
-H "Authorization: Bearer YOUR_TOKEN"
```

200 – Response (example)

```

{
  "records": [\
    {\
      "createdTime": "2022-09-12T21:03:48.000Z",\
      "fields": {\
        "Address": "333 Post St",\
        "Name": "Union Square",\
        "Visited": true\
      },\
      "id": "rec560UJdUtocSouk"\
    },\
    {\
      "createdTime": "2022-09-12T21:03:48.000Z",\
      "fields": {\
        "Address": "1 Ferry Building",\
        "Name": "Ferry Building"\
      },\
      "id": "rec3lbPRG4aVqkeOQ"\
    }\
  ]
}
```

Records

# Get record

get `https://api.airtable.com/v0/{baseId}/{tableIdOrName}/{recordId}`

Retrieve a single record. Any "empty" fields (e.g. **""**, **\[\]**, or **false**) in the record will not be returned.

[§](/developers/web/api/get-record#requirements)

### Requirements

|     |     |
| --- | --- |
| Authentication | [Personal access token](https://airtable.com/developers/web/api/authentication#types-of-token), [OAuth integration](https://airtable.com/developers/web/api/authentication#types-of-token) |
| Scope | [`data.records:read`](https://airtable.com/developers/web/api/scopes#data-records-read) |
| User role | Base read-only |
| Billing plans | All plans |

[§](/developers/web/api/get-record#path)

### Path parameters

``

|     |     |
| --- | --- |
| [§](/developers/web/api/get-record#path-baseid)`baseId` | `string` |
| [§](/developers/web/api/get-record#path-tableidorname)`tableIdOrName` | `string` |
| [§](/developers/web/api/get-record#path-recordid)`recordId` | `string` |

[§](/developers/web/api/get-record#query)

### Query parameters

``

|     |     |
| --- | --- |
| [§](/developers/web/api/get-record#query-cellformat)`cellFormat` | `optional<``"json" | "string"` `>` <br>The format that should be used for cell values. Supported values are:<br>- `json:` cells will be formatted as JSON, depending on the field type.<br>- `string:` cells will be formatted as user-facing strings, regardless of the field type. The `timeZone` and `userLocale` parameters are required when using `string` as the `cellFormat`.<br>**Note:** You should not rely on the format of these strings, as it is subject to change.<br>The default is `json`. |
| [§](/developers/web/api/get-record#query-returnfieldsbyfieldid)`returnFieldsByFieldId` | `optional<` `boolean` `>` <br>An optional boolean value that lets you return field objects where the key is the field id.<br>This defaults to `false`, which returns field objects where the key is the field name. |

[§](/developers/web/api/get-record#response)

### Response format

``

|     |     |
| --- | --- |
| [§](/developers/web/api/get-record#response-id)`id` | `string` <br>Record ID |
| [§](/developers/web/api/get-record#response-createdtime)`createdTime` | `string` <br>A date timestamp in the ISO format, eg:"2018-01-01T00:00:00.000Z" |
| [§](/developers/web/api/get-record#response-fields)`fields` | `object`

Cell values are keyed by either field name or field ID (conditioned on `returnFieldsByFieldId`).

See [Cell Values](/developers/web/api/field-model) for more information on cell value response types.

|     |     |
| --- | --- |
| `key: string` | [`Cell value`](https://airtable.com/developers/web/api/field-model) | |

Request (example)

Copy

```

$
curl "https://api.airtable.com/v0/{baseId}/{tableIdOrName}/{recordId}" \
-H "Authorization: Bearer YOUR_TOKEN"
```

200 – Response (example)

```

{
  "createdTime": "2022-09-12T21:03:48.000Z",
  "fields": {
    "Address": "333 Post St",
    "Name": "Union Square",
    "Visited": true
  },
  "id": "rec560UJdUtocSouk"
}
```

Records

# Update multiple records

patchput `https://api.airtable.com/v0/{baseId}/{tableIdOrName}`

Updates up to 10 records, or upserts them when `performUpsert` is set (see below).

The URL path accepts both table names and table IDs. We recommend using table IDs so you don't need to modify
your API request when your table name changes.

A `PATCH` request will only update the fields included in the request. Fields not included in the request will be unchanged.
A `PUT` request will perform a destructive update and clear all unincluded cell values.

### [§](/developers/web/api/update-multiple-records\#upserts) Upserts

Set the `performUpsert` property in your request to enable upsert behavior. When upserting is enabled, the `id` property
of records becomes optional. Records that do not include `id` will use the fields chosen by [`fieldsToMergeOn`](/developers/web/api/update-multiple-records#request-performupsert-fieldstomergeon)
as an external ID to match with existing records.

- If zero matches are found, a new record will be created.
- If one match is found, that record will be updated.
- If multiple matches are found, the request will fail.

Records that include `id` will ignore `fieldsToMergeOn` and behave as normal updates. If no record with the given `id` exists,
the request will fail and will not create a new record.
The API response for upsert requests will additionally include `updatedRecords` and `createdRecords` arrays, indicating which records
in the `records` array already existed and were updated, or did not exist and were created, respectively.

Airtable reserves the right to throttle upsert requests differently from the [standard rate limit throttling policy](https://airtable.com/developers/web/api/rate-limits).

### [§](/developers/web/api/update-multiple-records\#typecasting) Typecasting

Set the `typecast` parameter to `true` to enable typecasting. When typecasting is enabled, Airtable will try to convert string values
in a record's `fields` object to the appropriate cell value. This conversion is only performed on a best-effort basis.
Typecasting is disabled by default to ensure your data's integrity, but it may be helpful when integrating with third-party services.

[§](/developers/web/api/update-multiple-records#requirements)

### Requirements

|     |     |
| --- | --- |
| Authentication | [Personal access token](https://airtable.com/developers/web/api/authentication#types-of-token), [OAuth integration](https://airtable.com/developers/web/api/authentication#types-of-token) |
| Scope | [`data.records:write`](https://airtable.com/developers/web/api/scopes#data-records-write) |
| User role | Base editor |
| Billing plans | All plans |

[§](/developers/web/api/update-multiple-records#path)

### Path parameters

``

|     |     |
| --- | --- |
| [§](/developers/web/api/update-multiple-records#path-baseid)`baseId` | `string` |
| [§](/developers/web/api/update-multiple-records#path-tableidorname)`tableIdOrName` | `string` |

[§](/developers/web/api/update-multiple-records#request)

### Request body

``

|     |     |
| --- | --- |
| [§](/developers/web/api/update-multiple-records#request-performupsert)`performUpsert` | `optional<` `the below object` `>`

Enables upsert behavior when set.

**fieldsToMergeOn** will be used as an external ID to match records for updates. For records
where no match is found, a new Airtable record will be created.

``

|     |     |
| --- | --- |
| [§](/developers/web/api/update-multiple-records#request-performupsert-fieldstomergeon)`fieldsToMergeOn` | `array of strings` <br>An array with at least one and at most three field names or IDs. IDs must uniquely identify<br>a single record. These cannot be computed fields (formulas, lookups, rollups), and must be<br>one of the following types: number, text, long text, single select, multiple select, date. | |
| [§](/developers/web/api/update-multiple-records#request-returnfieldsbyfieldid)`returnFieldsByFieldId` | `optional<` `boolean` `>` <br>If set to `true`, records in the API response will key the **fields** object by field ID.<br>Defaults to `false` when unset, which returns **fields** objects keyed by field name. |
| [§](/developers/web/api/update-multiple-records#request-typecast)`typecast` | `optional<` `boolean` `>` <br>If set to `true`, Airtable will try to convert string values into the appropriate<br>cell value. This conversion is only performed on a best-effort basis. To ensure your data's<br>integrity, this should only be used when necessary.<br>Defaults to `false` when unset. |
| [§](/developers/web/api/update-multiple-records#request-records)`records` | `array of the below object`  ``

|     |     |
| --- | --- |
| [§](/developers/web/api/update-multiple-records#request-records-id)`id` | `optional<` `string` `>` <br>The ID of the record to update. Required when **performUpsert** is undefined. |
| [§](/developers/web/api/update-multiple-records#request-records-fields)`fields` | `object`

|     |     |
| --- | --- |
| `key: string` | [`Cell value`](https://airtable.com/developers/web/api/field-model) | | |

[§](/developers/web/api/update-multiple-records#response)

### Response format

`any of the below objects`

* * *

``

|     |     |
| --- | --- |
| [§](/developers/web/api/update-multiple-records#response-multiple-0-records)`records` | `array of the below object`  ``

|     |     |
| --- | --- |
| [§](/developers/web/api/update-multiple-records#response-multiple-0-records-id)`id` | `string` <br>Record ID |
| [§](/developers/web/api/update-multiple-records#response-multiple-0-records-createdtime)`createdTime` | `string` <br>A date timestamp in the ISO format, eg:"2018-01-01T00:00:00.000Z" |
| [§](/developers/web/api/update-multiple-records#response-multiple-0-records-fields)`fields` | `object`

Cell values are keyed by either field name or field ID (conditioned on `returnFieldsByFieldId`).

See [Cell Values](/developers/web/api/field-model) for more information on cell value response types.

|     |     |
| --- | --- |
| `key: string` | [`Cell value`](https://airtable.com/developers/web/api/field-model) | | |

* * *

``

|     |     |
| --- | --- |
| [§](/developers/web/api/update-multiple-records#response-multiple-1-createdrecords)`createdRecords` | `array of strings` <br>Record IDs of records created by the upsert request. |
| [§](/developers/web/api/update-multiple-records#response-multiple-1-updatedrecords)`updatedRecords` | `array of strings` <br>Record IDs of existing records modified by the upsert request. |
| [§](/developers/web/api/update-multiple-records#response-multiple-1-records)`records` | `array of the below object`  ``

|     |     |
| --- | --- |
| [§](/developers/web/api/update-multiple-records#response-multiple-1-records-id)`id` | `string` <br>Record ID |
| [§](/developers/web/api/update-multiple-records#response-multiple-1-records-createdtime)`createdTime` | `string` <br>A date timestamp in the ISO format, eg:"2018-01-01T00:00:00.000Z" |
| [§](/developers/web/api/update-multiple-records#response-multiple-1-records-fields)`fields` | `object`

Cell values are keyed by either field name or field ID (conditioned on `returnFieldsByFieldId`).

See [Cell Values](/developers/web/api/field-model) for more information on cell value response types.

|     |     |
| --- | --- |
| `key: string` | [`Cell value`](https://airtable.com/developers/web/api/field-model) | | |

Request (example)

Copy

```

$
curl -X PATCH "https://api.airtable.com/v0/{baseId}/{tableIdOrName}" \
-H "Authorization: Bearer YOUR_TOKEN" \
-H "Content-Type: application/json" \
--data '{
    "records": [\
      {\
        "fields": {\
          "Address": "501 Twin Peaks Blvd",\
          "Name": "Twin Peaks",\
          "Visited": true\
        },\
        "id": "rec560UJdUtocSouk"\
      },\
      {\
        "fields": {\
          "Visited": true\
        },\
        "id": "rec3lbPRG4aVqkeOQ"\
      }\
    ]
  }'
```

200 – Response (example)

```

{
  "records": [\
    {\
      "createdTime": "2022-09-12T21:03:48.000Z",\
      "fields": {\
        "Address": "501 Twin Peaks Blvd",\
        "Name": "Twin Peaks",\
        "Visited": true\
      },\
      "id": "rec560UJdUtocSouk"\
    },\
    {\
      "createdTime": "2022-09-12T21:03:48.000Z",\
      "fields": {\
        "Address": "1 Ferry Building",\
        "Name": "Ferry Building",\
        "Visited": true\
      },\
      "id": "rec3lbPRG4aVqkeOQ"\
    }\
  ]
}
```

Request (example)

Copy

```

$
curl -X PATCH "https://api.airtable.com/v0/{baseId}/{tableIdOrName}" \
-H "Authorization: Bearer YOUR_TOKEN" \
-H "Content-Type: application/json" \
--data '{
    "performUpsert": {
      "fieldsToMergeOn": [\
        "Name"\
      ]
    },
    "records": [\
      {\
        "fields": {\
          "Address": "501 Twin Peaks Blvd",\
          "Name": "Twin Peaks",\
          "Visited": true\
        }\
      },\
      {\
        "fields": {\
          "Name": "New Park",\
          "Visited": true\
        }\
      }\
    ]
  }'
```

200 – Response (example)

```

{
  "createdRecords": [\
    "recsHMqsp3GEm3lEi"\
  ],
  "records": [\
    {\
      "createdTime": "2022-09-12T21:03:48.000Z",\
      "fields": {\
        "Address": "501 Twin Peaks Blvd",\
        "Name": "Twin Peaks",\
        "Visited": true\
      },\
      "id": "rec560UJdUtocSouk"\
    },\
    {\
      "createdTime": "2022-11-15T01:02:04.400Z",\
      "fields": {\
        "Name": "New Park",\
        "Visited": true\
      },\
      "id": "recsHMqsp3GEm3lEi"\
    }\
  ],
  "updatedRecords": [\
    "rec560UJdUtocSouk"\
  ]
}
```

Records

# Update record

patchput `https://api.airtable.com/v0/{baseId}/{tableIdOrName}/{recordId}`

Updates a single record. Table names and table ids can be used interchangeably.
We recommend using table IDs so you don't need to modify your API request when your table name changes.
A **PATCH** request will only update the fields you specify, leaving the rest as they were.
A **PUT** request will perform a destructive update and clear all unspecified cell values.

Your request body should include a **fields** property whose value is an object containing your record's cell values, keyed by either field name or field id.

Automatic data conversion for update actions can be enabled via **typecast** parameter. The Airtable API will perform best-effort automatic data conversion
from string values if the **typecast** parameter is passed in. Automatic conversion is disabled by default to ensure data integrity,
but it may be helpful for integrating with 3rd party data sources.

[§](/developers/web/api/update-record#requirements)

### Requirements

|     |     |
| --- | --- |
| Authentication | [Personal access token](https://airtable.com/developers/web/api/authentication#types-of-token), [OAuth integration](https://airtable.com/developers/web/api/authentication#types-of-token) |
| Scope | [`data.records:write`](https://airtable.com/developers/web/api/scopes#data-records-write) |
| User role | Base editor |
| Billing plans | All plans |

[§](/developers/web/api/update-record#path)

### Path parameters

``

|     |     |
| --- | --- |
| [§](/developers/web/api/update-record#path-baseid)`baseId` | `string` |
| [§](/developers/web/api/update-record#path-tableidorname)`tableIdOrName` | `string` |
| [§](/developers/web/api/update-record#path-recordid)`recordId` | `string` |

[§](/developers/web/api/update-record#request)

### Request body

``

|     |     |
| --- | --- |
| [§](/developers/web/api/update-record#request-returnfieldsbyfieldid)`returnFieldsByFieldId` | `optional<` `boolean` `>` <br>An optional boolean value that lets you return field objects keyed by the field id.<br>This defaults to `false`, which returns field objects where the key is the field name. |
| [§](/developers/web/api/update-record#request-typecast)`typecast` | `optional<` `boolean` `>` <br>The Airtable API will perform best-effort automatic data conversion from string values<br>if the typecast parameter is passed in. Automatic conversion is disabled by default to<br>ensure data integrity, but it may be helpful for integrating with 3rd party data sources. |
| [§](/developers/web/api/update-record#request-fields)`fields` | `object`

|     |     |
| --- | --- |
| `key: string` | `any` | |

[§](/developers/web/api/update-record#response)

### Response format

``

|     |     |
| --- | --- |
| [§](/developers/web/api/update-record#response-id)`id` | `string` <br>Record ID |
| [§](/developers/web/api/update-record#response-createdtime)`createdTime` | `string` <br>A date timestamp in the ISO format, eg:"2018-01-01T00:00:00.000Z" |
| [§](/developers/web/api/update-record#response-fields)`fields` | `object`

Cell values are keyed by either field name or field ID (conditioned on `returnFieldsByFieldId`).

See [Cell Values](/developers/web/api/field-model) for more information on cell value response types.

|     |     |
| --- | --- |
| `key: string` | [`Cell value`](https://airtable.com/developers/web/api/field-model) | |

Request (example)

Copy

```

$
curl -X PATCH "https://api.airtable.com/v0/{baseId}/{tableIdOrName}/{recordId}" \
-H "Authorization: Bearer YOUR_TOKEN" \
-H "Content-Type: application/json" \
--data '{
    "fields": {
      "Address": "1 Ferry Building",
      "Name": "Ferry Building",
      "Visited": true
    }
  }'
```

200 – Response (example)

```

{
  "createdTime": "2022-09-12T21:03:48.000Z",
  "fields": {
    "Address": "1 Ferry Building",
    "Name": "Ferry Building",
    "Visited": true
  },
  "id": "rec3lbPRG4aVqkeOQ"
}
```

Records

# Create records

post `https://api.airtable.com/v0/{baseId}/{tableIdOrName}`

Creates multiple records. Note that table names and table ids can be used interchangeably.
We recommend using table IDs so you don't need to modify your API request when your table name changes.

Your request body should include an array of up to 10 record objects. Each of these objects should have one key
whose value is an inner object containing your record's cell values, keyed by either field name or field id.

Returns a unique array of the newly created record ids if the call succeeds.

You can also include a single record object at the top level.

[§](/developers/web/api/create-records#requirements)

### Requirements

|     |     |
| --- | --- |
| Authentication | [Personal access token](https://airtable.com/developers/web/api/authentication#types-of-token), [OAuth integration](https://airtable.com/developers/web/api/authentication#types-of-token) |
| Scope | [`data.records:write`](https://airtable.com/developers/web/api/scopes#data-records-write) |
| User role | Base editor |
| Billing plans | All plans |

[§](/developers/web/api/create-records#path)

### Path parameters

``

|     |     |
| --- | --- |
| [§](/developers/web/api/create-records#path-baseid)`baseId` | `string` |
| [§](/developers/web/api/create-records#path-tableidorname)`tableIdOrName` | `string` |

[§](/developers/web/api/create-records#request)

### Request body

``

|     |     |
| --- | --- |
| [§](/developers/web/api/create-records#request-fields)`fields` | `optional<` `the below object` `>`

Create **a single** record

``

|     |     |
| --- | --- |
| `key: string` | [`Cell value`](https://airtable.com/developers/web/api/field-model) | |
| [§](/developers/web/api/create-records#request-records)`records` | `optional<` `array of the below object` `>`

Create **multiple** records

Pass in multiple records to create multiple in one request

``

|     |     |
| --- | --- |
| [§](/developers/web/api/create-records#request-records-fields)`fields` | `object`

|     |     |
| --- | --- |
| `key: string` | [`Cell value`](https://airtable.com/developers/web/api/field-model) | | |
| [§](/developers/web/api/create-records#request-returnfieldsbyfieldid)`returnFieldsByFieldId` | `optional<` `boolean` `>` <br>An optional boolean value that lets you return field objects keyed by the field id.<br>This defaults to `false`, which returns field objects where the key is the field name. |
| [§](/developers/web/api/create-records#request-typecast)`typecast` | `optional<` `boolean` `>` <br>The Airtable API will perform best-effort automatic data conversion from string values<br>if the typecast parameter is passed in. Automatic conversion is disabled by default to<br>ensure data integrity, but it may be helpful for integrating with 3rd party data sources. |

[§](/developers/web/api/create-records#response)

### Response format

`any of the below objects`

* * *

``

|     |     |
| --- | --- |
| [§](/developers/web/api/create-records#response-multiple-0-records)`records` | `array of the below object`  ``

|     |     |
| --- | --- |
| [§](/developers/web/api/create-records#response-multiple-0-records-id)`id` | `string` <br>Record ID |
| [§](/developers/web/api/create-records#response-multiple-0-records-createdtime)`createdTime` | `string` <br>A date timestamp in the ISO format, eg:"2018-01-01T00:00:00.000Z" |
| [§](/developers/web/api/create-records#response-multiple-0-records-fields)`fields` | `object`

Cell values are keyed by either field name or field ID (conditioned on `returnFieldsByFieldId`).

See [Cell Values](/developers/web/api/field-model) for more information on cell value response types.

|     |     |
| --- | --- |
| `key: string` | [`Cell value`](https://airtable.com/developers/web/api/field-model) | | |

* * *

``

|     |     |
| --- | --- |
| [§](/developers/web/api/create-records#response-multiple-1-id)`id` | `string` <br>Record ID |
| [§](/developers/web/api/create-records#response-multiple-1-createdtime)`createdTime` | `string` <br>A date timestamp in the ISO format, eg:"2018-01-01T00:00:00.000Z" |
| [§](/developers/web/api/create-records#response-multiple-1-fields)`fields` | `object`

Cell values are keyed by either field name or field ID (conditioned on `returnFieldsByFieldId`).

See [Cell Values](/developers/web/api/field-model) for more information on cell value response types.

|     |     |
| --- | --- |
| `key: string` | [`Cell value`](https://airtable.com/developers/web/api/field-model) | |

Request (example)

Copy

```

$
curl -X POST "https://api.airtable.com/v0/{baseId}/{tableIdOrName}" \
-H "Authorization: Bearer YOUR_TOKEN" \
-H "Content-Type: application/json" \
--data '{
    "records": [\
      {\
        "fields": {\
          "Address": "333 Post St",\
          "Name": "Union Square",\
          "Visited": true\
        }\
      },\
      {\
        "fields": {\
          "Address": "1 Ferry Building",\
          "Name": "Ferry Building"\
        }\
      }\
    ]
  }'
```

200 – Response (example)

```

{
  "records": [\
    {\
      "createdTime": "2022-09-12T21:03:48.000Z",\
      "fields": {\
        "Address": "333 Post St",\
        "Name": "Union Square",\
        "Visited": true\
      },\
      "id": "rec560UJdUtocSouk"\
    },\
    {\
      "createdTime": "2022-09-12T21:03:48.000Z",\
      "fields": {\
        "Address": "1 Ferry Building",\
        "Name": "Ferry Building"\
      },\
      "id": "rec3lbPRG4aVqkeOQ"\
    }\
  ]
}
```

Request (example)

Copy

```

$
curl -X POST "https://api.airtable.com/v0/{baseId}/{tableIdOrName}" \
-H "Authorization: Bearer YOUR_TOKEN" \
-H "Content-Type: application/json" \
--data '{
    "fields": {
      "Address": "333 Post St",
      "Name": "Union Square",
      "Visited": true
    }
  }'
```

200 – Response (example)

```

{
  "createdTime": "2022-09-12T21:03:48.000Z",
  "fields": {
    "Address": "333 Post St",
    "Name": "Union Square",
    "Visited": true
  },
  "id": "rec560UJdUtocSouk"
}
```

Records

# Delete multiple records

delete `https://api.airtable.com/v0/{baseId}/{tableIdOrName}`

Deletes records given an array of record ids

[§](/developers/web/api/delete-multiple-records#requirements)

### Requirements

|     |     |
| --- | --- |
| Authentication | [Personal access token](https://airtable.com/developers/web/api/authentication#types-of-token), [OAuth integration](https://airtable.com/developers/web/api/authentication#types-of-token) |
| Scope | [`data.records:write`](https://airtable.com/developers/web/api/scopes#data-records-write) |
| User role | Base editor |
| Billing plans | All plans |

[§](/developers/web/api/delete-multiple-records#path)

### Path parameters

``

|     |     |
| --- | --- |
| [§](/developers/web/api/delete-multiple-records#path-baseid)`baseId` | `string` |
| [§](/developers/web/api/delete-multiple-records#path-tableidorname)`tableIdOrName` | `string` |

[§](/developers/web/api/delete-multiple-records#query)

### Query parameters

``

|     |     |
| --- | --- |
| [§](/developers/web/api/delete-multiple-records#query-records)`records` | `optional<` `array of strings` `>` <br>The recordIds of each record to be deleted. Up to 10 recordIds can be provided. |

[§](/developers/web/api/delete-multiple-records#response)

### Response format

``

|     |     |
| --- | --- |
| [§](/developers/web/api/delete-multiple-records#response-records)`records` | `array of the below object`  ``

|     |     |
| --- | --- |
| [§](/developers/web/api/delete-multiple-records#response-records-id)`id` | `string` <br>Record ID |
| [§](/developers/web/api/delete-multiple-records#response-records-deleted)`deleted` | `true` | |

Request (example)

Copy

```

$
curl -X DELETE "https://api.airtable.com/v0/{baseId}/{tableIdOrName}\
?records[]=rec560UJdUtocSouk&records[]=rec3lbPRG4aVqkeOQ" \
-H "Authorization: Bearer YOUR_TOKEN"
```

200 – Response (example)

```

{
  "records": [\
    {\
      "deleted": true,\
      "id": "rec560UJdUtocSouk"\
    },\
    {\
      "deleted": true,\
      "id": "rec3lbPRG4aVqkeOQ"\
    }\
  ]
}
```

Records

# Delete record

delete `https://api.airtable.com/v0/{baseId}/{tableIdOrName}/{recordId}`

Deletes a single record

[§](/developers/web/api/delete-record#requirements)

### Requirements

|     |     |
| --- | --- |
| Authentication | [Personal access token](https://airtable.com/developers/web/api/authentication#types-of-token), [OAuth integration](https://airtable.com/developers/web/api/authentication#types-of-token) |
| Scope | [`data.records:write`](https://airtable.com/developers/web/api/scopes#data-records-write) |
| User role | Base editor |
| Billing plans | All plans |

[§](/developers/web/api/delete-record#path)

### Path parameters

``

|     |     |
| --- | --- |
| [§](/developers/web/api/delete-record#path-baseid)`baseId` | `string` |
| [§](/developers/web/api/delete-record#path-tableidorname)`tableIdOrName` | `string` |
| [§](/developers/web/api/delete-record#path-recordid)`recordId` | `string` |

[§](/developers/web/api/delete-record#response)

### Response format

``

|     |     |
| --- | --- |
| [§](/developers/web/api/delete-record#response-id)`id` | `string` <br>Record ID |
| [§](/developers/web/api/delete-record#response-deleted)`deleted` | `true` |

Request (example)

Copy

```

$
curl -X DELETE "https://api.airtable.com/v0/{baseId}/{tableIdOrName}/{recordId}" \
-H "Authorization: Bearer YOUR_TOKEN"
```

200 – Response (example)

```

{
  "deleted": true,
  "id": "rec560UJdUtocSouk"
}
```

Records

# Sync CSV data

post `https://api.airtable.com/v0/{baseId}/{tableIdOrName}/sync/{apiEndpointSyncId}`

Syncs raw CSV data into a Sync API table.
You must first set up a sync from a base (instructions in this [support article](https://support.airtable.com/docs/airtable-sync-integration-api-endpoint)).
The **apiEndpointSyncId** in the path parameters can be found in the setup flow when
creating a new Sync API table, or from the synced table settings.

The CSV data can contain up to 10k rows, 500 columns, and the HTTP request's size is limited to 2 MB.

There is a rate limit of 20 requests, per 5 minutes, per base for this endpoint.

[§](/developers/web/api/post-sync-api-endpoint#requirements)

### Requirements

|     |     |
| --- | --- |
| Authentication | [Personal access token](https://airtable.com/developers/web/api/authentication#types-of-token) |
| Scopes | [`data.records:write`](https://airtable.com/developers/web/api/scopes#data-records-write), [`schema.bases:write`](https://airtable.com/developers/web/api/scopes#schema-bases-write) |
| User role | Base creator |
| Billing plans | Pro, Enterprise (pre-2023.08 legacy plan), Enterprise Scale |

[§](/developers/web/api/post-sync-api-endpoint#path)

### Path parameters

``

|     |     |
| --- | --- |
| [§](/developers/web/api/post-sync-api-endpoint#path-baseid)`baseId` | `string` |
| [§](/developers/web/api/post-sync-api-endpoint#path-tableidorname)`tableIdOrName` | `string` |
| [§](/developers/web/api/post-sync-api-endpoint#path-apiendpointsyncid)`apiEndpointSyncId` | `string` |

[§](/developers/web/api/post-sync-api-endpoint#response)

### Response format

``

|     |     |
| --- | --- |
| [§](/developers/web/api/post-sync-api-endpoint#response-success)`success` | `true` |

Request (example)

Copy

```

$
curl -X POST "https://api.airtable.com/v0/{baseId}/{tableIdOrName}/sync/{apiEndpointSyncId}" \
-H "Authorization: Bearer YOUR_TOKEN" \
-H "Content-Type: text/csv" \
--data 'column1,column2
row1-column1,row1-column2
row2-column1,row2-column2'
```

Records

# Upload attachment

post `https://content.airtable.com/v0/{baseId}/{recordId}/{attachmentFieldIdOrName}/uploadAttachment`

Upload an attachment up to 5 MB to an attachment cell via the file bytes directly.

To upload attachments above this size that are accessible by a public URL, they can be added using [https://airtable.com/developers/web/api/field-model#multipleattachment](https://airtable.com/developers/web/api/field-model#multipleattachment)

[§](/developers/web/api/upload-attachment#requirements)

### Requirements

|     |     |
| --- | --- |
| Authentication | [Personal access token](https://airtable.com/developers/web/api/authentication#types-of-token), [OAuth integration](https://airtable.com/developers/web/api/authentication#types-of-token) |
| Scope | [data.records:write](/developers/web/api/scopes#data-records-write) |
| User role | Base editor |
| Billing plans | All plans |

[§](/developers/web/api/upload-attachment#path)

### Path parameters

``

|     |     |
| --- | --- |
| [§](/developers/web/api/upload-attachment#path-baseid)`baseId` | `string` |
| [§](/developers/web/api/upload-attachment#path-recordid)`recordId` | `string` |
| [§](/developers/web/api/upload-attachment#path-attachmentfieldidorname)`attachmentFieldIdOrName` | `string` |

[§](/developers/web/api/upload-attachment#request)

### Request body

``

|     |     |
| --- | --- |
| [§](/developers/web/api/upload-attachment#request-contenttype)`contentType` | `string` <br>Content type, e.g. "image/jpeg" |
| [§](/developers/web/api/upload-attachment#request-file)`file` | `string` <br>The base64 encoded string of the file to be uploaded. |
| [§](/developers/web/api/upload-attachment#request-filename)`filename` | `string` <br>Filename, e.g. "foo.jpg" |

[§](/developers/web/api/upload-attachment#response)

### Response format

``

|     |     |
| --- | --- |
| [§](/developers/web/api/upload-attachment#response-id)`id` | `string` <br>Record ID |
| [§](/developers/web/api/upload-attachment#response-createdtime)`createdTime` | `string` <br>A date timestamp in the ISO format, eg:"2018-01-01T00:00:00.000Z" |
| [§](/developers/web/api/upload-attachment#response-fields)`fields` | `object`

Cell values are keyed by field ID.

See [Cell Values](/developers/web/api/field-model) for more information on cell value response types.

|     |     |
| --- | --- |
| `key: string` | [`Cell value`](https://airtable.com/developers/web/api/field-model) | |

Request (example)

Copy

```

$
curl -X POST "https://content.airtable.com/v0/{baseId}/{recordId}/{attachmentFieldIdOrName}/uploadAttachment" \
-H "Authorization: Bearer YOUR_TOKEN" \
-H "Content-Type: application/json" \
--data '{
    "contentType": "text/plain",
    "file": "SGVsbG8gd29ybGQ=",
    "filename": "sample.txt"
  }'
```

200 – Response (example)

```

{
  "createdTime": "2022-02-01T21:25:05.663Z",
  "fields": {
    "fld00000000000000": [\
      {\
        "filename": "sample.txt",\
        "id": "att00000000000000",\
        "size": 11,\
        "type": "text/plain",\
        "url": "https://v5.airtableusercontent.com/v3/u/29/29/1716940800000/ffhiecnieIwxisnIBDSAln/foDeknw_G5CdkdPW1j-U0yUCX9YSaE1EJft3wvXb85pnTY1sKZdYeFvKpsM-fqOa6Bnu5MQVPA_ApINEUXL_E3SAZn6z01VN9Pn9SluhSy4NoakZGapcvl4tuN3jktO2Dt7Ck_gh4oMdsrcV8J-t_A/53m17XmDDHsNtIqzM1PQVnRKutK6damFgNNS5WCaTbI"\
      }\
    ]
  },
  "id": "rec00000000000000"
}
```


