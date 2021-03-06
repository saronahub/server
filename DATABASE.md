# SaronaHub Database

This is the documentation for SaronaHub's database structure.

## User Schema

| Name | Type | Default | Optional | Description |
| - | - | - | - | - |
| id | *String* | | **false** | |
| email | *String* | | **false** | |
| name | *Object* | | **false** | |
| name.first | *String* | | **false** | |
| name.last | *String* | | **false** | |
| phone | *String* | | **false** | |
| password | *String* | | **false** | |
| picture | *String* | default image | **false** | profile picture |
| isFBUser | *Boolean* | **false** | **false** | whether a user signed up with facebook |
| fbId | *String* | | **false** | only if *isFBUser* is **true** |

## Event Schema

| Name | Type | Default | Optional | Description |
| - | - | - | - | - |
| id | *String* | | **false** | |
| name | *String* | | **false** | |
| author | *Object* | | **false** | |
| author.id | *String* | | **false** | |
| author.name | *String* | | **false** | |
| room | *Number* | 1 | **false** | the room of the event |
| end_date | *Date* | | **false** | end time of the event |
| start_date | *Date* | | **false** | start time of the event |
| description | *String* | | **false** | event description |
| image | *String* | default image | **true** | |
| age_limit | *Object* | | **true** | age limits for the event |
| age_limit.min | *Number* | | **true** | |
| age_limit.max | *Number* | | **true** | |
| participants | *Array* | [] | **false** | list of participants id's |
| approved | *Boolean* | **false** | **false** | whether the event was approved by the team |

## Visit Schema

| Name | Type | Default | Optional | Description |
| - | - | - | - | - |
| id | *String* | | **false** | |
| visitor | *String* | | **false** | visitor user id |
| date | *Object* | | **false** | |
| date.exit | *Date* | | **false** | when the visit ended |
| date.entrance | *Date* | | **false** | when the visit started |
| totalTime | *Number* | | **false** | the total number of seconds of the visit |

## Image Schema

| Name | Type | Default | Optional | Description |
| - | - | - | - | - |
| id | *String* | | **false** | |
| author | *Object* | | **false** | |
| author.id | *String* | | **false** | |
| author.name | *String* | | **false** | |
| description | *String* | | **true** | |
| url | *String* | | **false** | image url |
| timestamp | *Date* | | **false** | when the image was uploaded |
| type | *String* | 'upload' | **false** | the type of images uploaded, options: 'upload', 'profile', 'event' |