import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import TaskItem from './TaskItem';
import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DraggableProvided } from 'react-beautiful-dnd';
import { updateTask } from '../store/slices/taskSlice';

interface KanbanBoardProps {
  storyId: string;
}

type TaskStatus = 'todo' | 'doing' | 'done';

const KanbanBoard: React.FC<KanbanBoardProps> = ({ storyId }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.task.tasks.filter(task => task.storyId === storyId));

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const draggedTask = tasks.find(task => task.id === draggableId);

    if (draggedTask) {
      dispatch(updateTask({ ...draggedTask, status: destination.droppableId as TaskStatus }));
    }
  };

  const getTasksByStatus = (status: TaskStatus) => tasks.filter(task => task.status === status);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex space-x-4 p-4 bg-gray-100 min-h-screen">
        {['todo', 'doing', 'done'].map(status => (
          <Droppable key={status} droppableId={status}>
            {(provided: DroppableProvided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="w-1/3 bg-white rounded-lg shadow p-4"
              >
                <h2 className="text-xl font-semibold mb-4 text-gray-700 capitalize">
                  {status}
                </h2>
                {getTasksByStatus(status as TaskStatus).map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided: DraggableProvided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TaskItem key={task.id} task={task} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
