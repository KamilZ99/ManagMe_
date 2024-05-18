import React, { useState, useEffect } from 'react';
import Task from '../models/Task';
import { v4 as uuidv4 } from 'uuid';

interface TaskDetailsModalProps {
  task: Task;
  onClose: () => void;
}

interface Comment {
  id: string;
  text: string;
  avatar: string;
}

const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({ task, onClose }) => {
  const [attachments, setAttachments] = useState<File[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const savedComments = sessionStorage.getItem(`comments-${task.id}`);
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, [task.id]);

  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments([...attachments, ...Array.from(e.target.files)]);
    }
  };

  const handleAddComment = () => {
    if (comment.trim()) {
      const newComment = { id: uuidv4(), text: comment.trim(), avatar: 'https://via.placeholder.com/40' };
      const newComments = [...comments, newComment];
      setComments(newComments);
      setComment('');
      sessionStorage.setItem(`comments-${task.id}`, JSON.stringify(newComments));
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-black opacity-50 absolute inset-0" onClick={onClose}></div>
      <div className="bg-white p-6 rounded-lg shadow-lg z-50 max-w-4xl w-full mx-auto overflow-y-auto h-3/4">
        <h2 className="text-3xl font-bold mb-4">{task.name}</h2>
        <p className="text-gray-700 mb-4">{task.description}</p>
        <p className="text-sm text-gray-500 mb-1">Priority: <span className="font-medium">{task.priority}</span></p>
        <p className="text-sm text-gray-500 mb-1">Status: <span className={`font-medium ${task.status === 'done' ? 'text-green-500' : 'text-yellow-500'}`}>{task.status}</span></p>
        <p className="text-sm text-gray-500 mb-1">Estimated Time: <span className="font-medium">{task.estimatedTime} hours</span></p>
        <p className="text-sm text-gray-500 mb-1">Creation Date: <span className="font-medium">{task.creationDate.toLocaleDateString()}</span></p>
        {task.startDate && <p className="text-sm text-gray-500 mb-1">Start Date: <span className="font-medium">{task.startDate.toLocaleDateString()}</span></p>}
        {task.endDate && <p className="text-sm text-gray-500 mb-1">End Date: <span className="font-medium">{task.endDate.toLocaleDateString()}</span></p>}
        <p className="text-sm text-gray-500 mb-4">Owner: <span className="font-medium">{task.ownerId || 'Unassigned'}</span></p>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="attachments">
            Attachments 📎
          </label>
          <input
            type="file"
            id="attachments"
            multiple
            onChange={handleAttachmentChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {attachments.length > 0 && (
            <ul className="mt-2">
              {attachments.map((file, index) => (
                <li key={index} className="text-sm text-gray-700">{file.name}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="comment">
            Add Comment 💬
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Write a comment..."
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            onClick={handleAddComment}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
          >
            Add Comment
          </button>
        </div>

        {comments.length > 0 && (
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2">Comments</h3>
            {comments.map((comment) => (
              <div key={comment.id} className="bg-gray-100 p-2 rounded mb-2 flex items-start">
                <img src={comment.avatar} alt="avatar" className="w-10 h-10 rounded-full mr-2" />
                <p className="text-sm text-gray-700">{comment.text}</p>
              </div>
            ))}
          </div>
        )}

        <button onClick={onClose} className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600">Close</button>
      </div>
    </div>
  );
};

export default TaskDetailsModal;
