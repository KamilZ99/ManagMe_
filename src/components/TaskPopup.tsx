import React, { useState, useEffect } from 'react';
import { Task } from '../types';

type Comment = {
  text: string;
  image: string;
};

type TaskPopupProps = {
  task: Task;
  onClose: () => void;
};

const TaskPopup: React.FC<TaskPopupProps> = ({ task, onClose }) => {
  const [comment, setComment] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const savedComments = localStorage.getItem('comments');
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(Array.from(e.target.files));
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem('attachments', reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onloadend = () => {
      const newComment: Comment = {
        text: comment,
        image: reader.result as string,
      };
      setComments([...comments, newComment]);
      setComment('');
      setAttachments([]);
      localStorage.removeItem('attachments'); 
    };
    if (attachments.length > 0) {
      reader.readAsDataURL(attachments[0]);
    } else {
      const newComment: Comment = {
        text: comment,
        image: '',
      };
      setComments([...comments, newComment]);
      setComment('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-75 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-1/2 overflow-y-auto max-h-screen">
        <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Task Details</h2>
        <p className="text-black dark:text-gray-300"><strong>Name:</strong> {task.name}</p>
        <p className="text-black dark:text-gray-300"><strong>Description:</strong> {task.description}</p>
        <p className="text-black dark:text-gray-300"><strong>Priority:</strong> {task.priority}</p>
        <p className="text-black dark:text-gray-300"><strong>Estimated Time:</strong> {task.estimatedTime}</p>
        <p className="text-black dark:text-gray-300"><strong>Status:</strong> {task.status}</p>
        <p className="text-black dark:text-gray-300"><strong>Start Date:</strong> {task.startDate?.toString() || 'N/A'}</p>
        <p className="text-black dark:text-gray-300"><strong>End Date:</strong> {task.endDate?.toString() || 'N/A'}</p>
        <p className="text-black dark:text-gray-300"><strong>Creation Date:</strong> {task.creationDate.toString()}</p>
        <p className="text-black dark:text-gray-300"><strong>Owner ID:</strong> {task.ownerId}</p>

        <form onSubmit={handleCommentSubmit} className="mt-4">
          <h3 className="text-xl font-bold mb-2 text-black dark:text-white">Add Comment</h3>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2 border rounded mb-2 text-black dark:text-gray-300 bg-white dark:bg-gray-700"
            placeholder="Add a comment"
            required
          />
          <input type="file" onChange={handleFileChange} className="text-black dark:text-gray-300" />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2">
            Submit
          </button>
        </form>

        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2 text-black dark:text-white">Comments</h3>
          {comments.map((comment, index) => (
            <div key={index} className="mb-4 p-4 border rounded bg-gray-100 dark:bg-gray-700">
              <p className="text-black dark:text-gray-300">{comment.text}</p>
              {comment.image && <img src={comment.image} alt="attachment" className="mt-2" />}
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-4"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TaskPopup;
