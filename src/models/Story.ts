export default class Story {
    constructor(
      public id: string,
      public name: string,
      public description: string,
      public priority: 'low' | 'medium' | 'high',
      public projectId: string,
      public creationDate: Date,
      public status: 'todo' | 'doing' | 'done',
      public ownerId: string
    ) {}
  }
  