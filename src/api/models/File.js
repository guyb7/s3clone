class File {
  constructor ({
    id,
    bucket,
    owner,
    filepath,
    filename,
    filesize,
    isPublic,
    createdAt,
    modifiedAt = null,
    deletedAt = null
  }) {
    this.id = id
    this.owner = owner
    this.bucket = bucket
    this.filepath = filepath
    this.filename = filename
    this.filesize = filesize
    this.isPublic = !!isPublic
    this.publicPath = bucket + '/' + filepath
    this.createdAt = createdAt
    this.modifiedAt = modifiedAt
    this.deletedAt = deletedAt
  }

  getKey () {
    return this.isPublic ? this.publicPath : this.id
  }

  getMetadata () {
    return {
      id: this.id,
      owner: this.owner,
      bucket: this.bucket,
      filepath: this.filepath,
      filename: this.filename,
      filesize: this.filesize,
      isPublic: this.isPublic,
      url: this.getKey(),
      createdAt: this.createdAt,
      modifiedAt: this.modifiedAt,
      deletedAt: this.deletedAt
    }
  }
}

module.exports = File
