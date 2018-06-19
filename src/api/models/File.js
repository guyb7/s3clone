class File {
  constructor({
    id,
    bucket,
    owner,
    filepath,
    isPublic,
    tempPath,
    createdAt,
    modifiedAt = null,
    deletedAt = null
  }) {
    this.id = id
    this.owner = owner
    this.bucket = bucket
    this.filepath = filepath
    this.isPublic = !!isPublic
    this.publicPath = bucket + '/' + filepath
    this.createdAt = createdAt
    this.modifiedAt = modifiedAt
    this.deletedAt = deletedAt
  }

  getKey() {
    return this.isPublic ? this.publicPath : this.id
  }

  getMetadata() {
    return {
      id: this.id,
      owner: this.owner,
      bucket: this.bucket,
      filepath: this.filepath,
      isPublic: this.isPublic,
      createdAt: this.createdAt,
      modifiedAt: this.modifiedAt,
      deletedAt: this.deletedAt
    }
  }
}

module.exports = File
