import Project from '../models/Project';

class ProjectApi {
  private static readonly STORAGE_KEY = 'projects';

  static getProjects(): Project[] {
    const projects = localStorage.getItem(this.STORAGE_KEY);
    return projects ? JSON.parse(projects) : [];
  }

  static saveProjects(projects: Project[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(projects));
  }

  static addProject(project: Project): void {
    const projects = this.getProjects();
    projects.push(project);
    this.saveProjects(projects);
  }

  static updateProject(updatedProject: Project): void {
    let projects = this.getProjects();
    projects = projects.map(project => project.id === updatedProject.id ? updatedProject : project);
    this.saveProjects(projects);
  }

  static deleteProject(projectId: string): void {
    let projects = this.getProjects();
    projects = projects.filter(project => project.id !== projectId);
    this.saveProjects(projects);
  }
}

export default ProjectApi;
