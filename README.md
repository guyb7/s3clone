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

All requests, except read of public files, must be authenticated with `X-AUTH` header:
```http
X-AUTH: qAzef32F
```

### Upload a file
```http
POST /bucket/path/file.txt
POST /bucket/path/file.txt?public=true
```

```http
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary
------WebKitFormBoundary
Content-Disposition: form-data; name="file"; filename="file.txt"
------WebKitFormBoundary--
```

### Download a file
```http
GET /bucket/path/file.txt
GET /7963b448-b8bf-48da-b3bc-e86155d5d810
```

### Get file metadata
```http
GET /bucket/path/file.txt?metadata=true
GET /7963b448-b8bf-48da-b3bc-e86155d5d810?metadata=true
```

### Update visibility
```http
PUT /bucket/path/file.txt?public=false
PUT /7963b448-b8bf-48da-b3bc-e86155d5d810?public=true
```

### Delete a file
```http
DELETE /7963b448-b8bf-48da-b3bc-e86155d5d810?private=false
```

## Metadata Structure
```json
{
  "id": "7963b448-b8bf-48da-b3bc-e86155d5d810",
  "owner": "qAzef32F",
  "bucket": "qAzef32F",
  "filepath": "/file/path/file.txt",
  "filename": "file.txt",
  "filesize": 3069,
  "isPublic": true,
  "url": "qAzef32F/66163.svg",
  "createdAt": 1529568558,
  "modifiedAt": 1529568754,
  "deletedAt": null
}
```

## Next steps
* The code is tightly coupled to Redis, we need to abstract the index storage
* As the index and files are stored seperately (DB and disk), we need a mechanism to ensure the two are always in sync
* Files are stored on local disk - to scale we need distributed network storage
* Deleted files should be deleted from disk, keep only the metadata
* File versioning - at the moment we can only modify the visibility of a file
* Add access/activity logs - the metadata contains only last change time
* Allow multiple buckets for every user. At the moment bucket == user
* Bundle the client, consider SSR
* .env is not in .gitignore for demonstration
* Add e2e and unit tests
* Resolve uuid collisions
* File URL changes with visibility change, which is awkward. Supporting both public and private paths will require index duplication with the current design
* Add file type detection. At the moment files are always downloaded as a general blob
* If a user uploads a file to an existing path, there's no way to access the previous file
* Store user tokens in DB (demonstration)
