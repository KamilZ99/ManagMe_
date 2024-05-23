import Story from '../models/Story';

class StoryApi {
  private static readonly STORAGE_KEY = 'stories';

  static getStories(): Story[] {
    const stories = localStorage.getItem(this.STORAGE_KEY);
    return stories ? JSON.parse(stories) : [];
  }

  static saveStories(stories: Story[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(stories));
  }

  static addStory(story: Story): void {
    const stories = this.getStories();
    stories.push(story);
    this.saveStories(stories);
  }

  static updateStory(updatedStory: Story): void {
    let stories = this.getStories();
    stories = stories.map(story => story.id === updatedStory.id ? updatedStory : story);
    this.saveStories(stories);
  }

  static deleteStory(storyId: string): void {
    let stories = this.getStories();
    stories = stories.filter(story => story.id !== storyId);
    this.saveStories(stories);
  }
}

export default StoryApi;
