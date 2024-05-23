import Task from '../models/Task';

interface TaskData {
  id: string;
  name: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  storyId: string;
  estimatedTime: number;
  status: 'todo' | 'doing' | 'done';
  creationDate: string; 
  startDate?: string; 
  endDate?: string; 
  ownerId?: string;
}

class TaskApi {
  private static readonly STORAGE_KEY = 'tasks';

  static getTasks(): Task[] {
    const tasks = localStorage.getItem(this.STORAGE_KEY);
    const parsedTasks: TaskData[] = tasks ? JSON.parse(tasks) : [];
    return parsedTasks.map((task: TaskData) => new Task(
      task.id,
      task.name,
      task.description,
      task.priority,
      task.storyId,
      task.estimatedTime,
      task.status,
      new Date(task.creationDate),
      task.startDate ? new Date(task.startDate) : undefined,
      task.endDate ? new Date(task.endDate) : undefined,
      task.ownerId
    ));
  }

  static saveTasks(tasks: Task[]): void {
    const tasksData: TaskData[] = tasks.map(task => ({
      id: task.id,
      name: task.name,
      description: task.description,
      priority: task.priority,
      storyId: task.storyId,
      estimatedTime: task.estimatedTime,
      status: task.status,
      creationDate: task.creationDate.toISOString(),
      startDate: task.startDate ? task.startDate.toISOString() : undefined,
      endDate: task.endDate ? task.endDate.toISOString() : undefined,
      ownerId: task.ownerId
    }));
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasksData));
  }

  static addTask(task: Task): void {
    const tasks = this.getTasks();
    tasks.push(task);
    this.saveTasks(tasks);
  }

  static updateTask(updatedTask: Task): void {
    let tasks = this.getTasks();
    tasks = tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
    this.saveTasks(tasks);
  }

  static deleteTask(taskId: string): void {
    let tasks = this.getTasks();
    tasks = tasks.filter(task => task.id !== taskId);
    this.saveTasks(tasks);
  }
}

export default TaskApi;
