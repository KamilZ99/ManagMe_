import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import TaskItem from './TaskItem';
import styled from 'styled-components';

interface KanbanBoardProps {
  storyId: string;
}

const KanbanContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
  width: 100%;
  justify-content: center;
`;

const KanbanColumn = styled.div`
  background-color: #e9ecef;
  border-radius: 12px;
  padding: 20px;
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ColumnTitle = styled.h3`
  text-align: center;
  margin-bottom: 10px;
`;

const KanbanBoard: React.FC<KanbanBoardProps> = ({ storyId }) => {
  const tasks = useSelector((state: RootState) => state.task.tasks.filter(task => task.storyId === storyId));

  const todoTasks = tasks.filter(task => task.status === 'todo');
  const doingTasks = tasks.filter(task => task.status === 'doing');
  const doneTasks = tasks.filter(task => task.status === 'done');

  return (
    <KanbanContainer>
      <KanbanColumn>
        <ColumnTitle>To Do</ColumnTitle>
        {todoTasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </KanbanColumn>
      <KanbanColumn>
        <ColumnTitle>Doing</ColumnTitle>
        {doingTasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </KanbanColumn>
      <KanbanColumn>
        <ColumnTitle>Done</ColumnTitle>
        {doneTasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
         </KanbanColumn>
      </KanbanContainer>
   
  );
};

export default KanbanBoard;
