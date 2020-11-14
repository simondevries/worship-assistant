import NewId from '../Helpers/newId';

export class Resource {
  constructor(resourceType) {
    this.id = NewId();
    this.resourceType = resourceType;
  }
}

export class Song extends Resource {
  constructor(title, lyrics) {
    super('SONG');
    this.title = title;
    this.lyrics = lyrics;
  }
}

export class Video extends Resource {
  constructor(title, filePath) {
    super('VIDEO');
    this.title = title;
    this.filePath = filePath;
  }
}

export class Image extends Resource {
  constructor(title, filePath) {
    super('IMAGE');
    this.title = title;
    this.filePath = filePath;
  }
}
