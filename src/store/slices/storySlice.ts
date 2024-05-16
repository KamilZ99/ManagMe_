import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Story from '../../models/Story';
import StoryApi from '../../api/StoryApi'; // Poprawny import domyślny

interface StoryState {
  stories: Story[];
  editingStory: Story | null;
}

const initialState: StoryState = {
  stories: StoryApi.getStories(),
  editingStory: null,
};

const storySlice = createSlice({
  name: 'story',
  initialState,
  reducers: {
    addStory(state, action: PayloadAction<Story>) {
      StoryApi.addStory(action.payload);
      state.stories = StoryApi.getStories();
    },
    updateStory(state, action: PayloadAction<Story>) {
      StoryApi.updateStory(action.payload);
      state.stories = StoryApi.getStories();
    },
    deleteStory(state, action: PayloadAction<string>) {
      StoryApi.deleteStory(action.payload);
      state.stories = StoryApi.getStories();
    },
    setEditingStory(state, action: PayloadAction<Story | null>) {
      state.editingStory = action.payload;
    },
  },
});

export const { addStory, updateStory, deleteStory, setEditingStory } = storySlice.actions;

export default storySlice.reducer;
