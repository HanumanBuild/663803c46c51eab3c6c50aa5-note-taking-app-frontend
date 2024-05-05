import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Notes() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await axios.get(`${process.env.REACT_APP_NOTE_TAKING_APP_BACKEND_URL}/api/notes`);
      setNotes(response.data);
    };
    fetchNotes();
  }, []);

  const handleAddNote = async () => {
    const response = await axios.post(`${process.env.REACT_APP_NOTE_TAKING_APP_BACKEND_URL}/api/notes`, { title: newNote, content: '' });
    setNotes([...notes, response.data]);
    setNewNote('');
  };

  const handleDeleteNote = async (id) => {
    await axios.delete(`${process.env.REACT_APP_NOTE_TAKING_APP_BACKEND_URL}/api/notes/${id}`);
    setNotes(notes.filter(note => note._id !== id));
  };

  return (
    <div>
      <h2>Notes</h2>
      <div>
        <input type="text" value={newNote} onChange={(e) => setNewNote(e.target.value)} />
        <button onClick={handleAddNote}>Add Note</button>
      </div>
      {notes.map(note => (
        <div key={note._id}>
          <h4>{note.title}</h4>
          <button onClick={() => handleDeleteNote(note._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Notes;