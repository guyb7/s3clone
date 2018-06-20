# S3 Clone
A simple storage service for arbitrary objects.

## Install
Developed and tested on node version 10.4.1, yarn version 1.7.0, redis version 4.0.2.
The client was tested on latest Chrome.
* `git clone`
* `yarn install`
* Set `.env` variables 
* Make sure Redis is available 
* `yarn start`

The server will run on [localhost:3033](http://localhost:3033/).

## API
Base URL: `/api`

Upload a file
```
POST /file/path/file.txt
POST /file/path/file.txt?private=true -> dDFewFG32dz
```

Download a file
```
GET /file/path/file.txt
GET /file/path/file.txt?metadata=true
GET /dDFewFG32dz X-AUTH="sjdnfsdFE32ss"
```

Update visibility
```
PUT /file/path/file.txt { "private": true }
PUT /dDFewFG32dz?private=false X-AUTH="sjdnfsdFE32ss" { "private": false }
```

Delete a file
```
DELETE /file/path/file.txt
```

## Metadata Structure
```json
{
  "id": "dDFewFG32dz", // guid
  "fileName": "file.txt",
  "filePath": "/file/path/file.txt",
  "fileSize": 1892, // in bytes
  "owner": "qAzef32F",
  "isDeleted": false,
  "isPrivate": false,
  "createdAt": 1529434800,
  "modifiedAt": 1529434800,
  "deletedAt": null
}
```

## Considerations
* sync DB with disk
* storage is local disk - to scale we need network storage
* backups and integrity - RAID?
* versioning - cannot modify at the moment
* access/activity log - showing only last change time
* bucket = user
* errors/monitoring
* build server/client + SSR
* .env is not in .gitignore for demonstration
* tests
* coupling to Redis, missing abstraction
* resolve uuid collisions
* allowing both public/private paths will require data duplication
* file type detection
* allow multiple files with the same public path?
* changing visibility changes URL, which is awkward
