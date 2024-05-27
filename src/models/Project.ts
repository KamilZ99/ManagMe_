// models/Project.ts
export interface Project {
  _id: string;
  name: string;
  description: string;
  ownerId: string;
}

export default class ProjectClass implements Project {
  constructor(
    public _id: string,
    public name: string,
    public description: string,
    public ownerId: string
  ) {}
}
