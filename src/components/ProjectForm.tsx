import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addProject, updateProject, setEditingProject } from '../store/slices/projectSlice';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background: violet;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
`;

const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 8px;
  background-color: white;
  color: black;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #218838;
  }
`;

const ProjectForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editingProject = useSelector((state: RootState) => state.project.editingProject);
  const [name, setName] = useState(editingProject ? editingProject.name : '');
  const [description, setDescription] = useState(editingProject ? editingProject.description : '');

  useEffect(() => {
    if (editingProject) {
      setName(editingProject.name);
      setDescription(editingProject.description);
    }
  }, [editingProject]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProject) {
      dispatch(updateProject({ ...editingProject, name, description }));
    } else {
      dispatch(addProject({ id: uuidv4(), name, description }));
    }
    setName('');
    setDescription('');
    dispatch(setEditingProject(null));
    navigate('/'); // Nawiguj do strony głównej po dodaniu projektu
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Project Name" required />
      <Textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Project Description" required />
      <Button type="submit">{editingProject ? 'Update' : 'Add'} Project</Button>
    </FormContainer>
  );
};

export default ProjectForm;
