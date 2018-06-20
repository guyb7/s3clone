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
POST /bucket/path/file.txt
POST /bucket/path/file.txt?public=false
```

Download a file
```
GET /bucket/path/file.txt
GET /bucket/path/file.txt?metadata=true
GET /dDFewFG32dz X-AUTH="sjdnfsdFE32ss"
```

Update visibility
```
PUT /bucket/path/file.txt?public=false
PUT /dDFewFG32dz?public=true X-AUTH="sjdnfsdFE32ss"
```

Delete a file
```
DELETE /dDFewFG32dz?private=false X-AUTH="sjdnfsdFE32ss"
```

## Metadata Structure
```json
{
  "id": "dDFewFG32dz",
  "fileName": "file.txt",
  "filePath": "/file/path/file.txt",
  "fileSize": 1892,
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
* versioning - cannot modify at the moment
* access/activity log - showing only last change time
* bucket = user
* build server/client + SSR
* .env is not in .gitignore for demonstration
* no tests
* coupling to Redis, missing abstraction
* resolve uuid collisions
* allowing both public/private paths will require data duplication
* no file type detection
* allowing multiple files with the same public path for the same user
* changing visibility changes URL, which is awkward
