export interface Project {
    _id: string;
    name: string;
    description: string;
    ownerId: string;
  }
  
  export interface Story {
    _id: string;
    name: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    projectId: string;
    creationDate: Date;
    status: 'todo' | 'doing' | 'done';
    ownerId: string;
  }
  
  export interface Task {
    _id: string;
    name: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    storyId: string;
    estimatedTime: number;
    status: 'todo' | 'doing' | 'done';
    creationDate: Date;
    startDate?: Date;
    endDate?: Date;
    ownerId?: string;
  }

  export interface GoogleCredentialResponse {
    credential: string;
    select_by: string;
  }
  
  