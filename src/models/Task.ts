export default class Task {
    constructor(
      public id: string,
      public name: string,
      public description: string,
      public priority: 'low' | 'medium' | 'high',
      public storyId: string,
      public estimatedTime: number,
      public status: 'todo' | 'doing' | 'done',
      public creationDate: Date,
      public startDate?: Date,
      public endDate?: Date,
      public ownerId?: string // ID użytkownika odpowiedzialnego za zadanie
    ) {}
  }
  