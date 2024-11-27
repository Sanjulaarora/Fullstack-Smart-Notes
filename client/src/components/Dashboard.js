import React, { useEffect, useState } from 'react';
import logo from '../images/icon.png';
import { FaTrashCan } from 'react-icons/fa6';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNotes } from '../features/NotesSlice';

const Dashboard = () => {
  const { isLoading, data, isError } = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  const [notes, setNotes] = useState([]);
  const [noteTitle, setNoteTitle] = useState('');

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);
  
  useEffect(() => {
    setNotes(data);
  }, [data]);

  const handleCreate = async(e) => {
    e.preventDefault();
    const res = await fetch('/add-notes', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: noteTitle })
    });

    const data = await res.json();

    if( res === 404 || !data) {
      Error('Something went wrong!')
    } else {
      setNotes([...notes, data]);
      setNoteTitle('');
      alert('Note is added successfully!!');
    }

  }

  const handleDelete = async(id) => {
    if(window.confirm('Are you sure you want to delete this note?')) {
      const res = await fetch(`/delete-notes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        }
      });
      const deletedNote = await res.json();
      if(res.status === 422 || !deletedNote) {
        alert('Something went wrong!!');
      } else {
        alert('Note deleted successfully!!')
      }
    }
  }

  return (
    <div id='dashboard' className='w-1/2 mx-auto p-6'>
      <div>
        <div className='flex justify-around sm:justify-between'>
          <div className='flex'>
            <img className='h-5 w-5 hover:scale-125' src={logo} alt={'icon-logo'} loading='lazy'/>
            <span className='ml-1 sm:ml-10 text-[12px] sm:text-base md:text-lg'>Dashboard</span>
          </div>
          <span className='text-[#367AFF] underline text-[10px] sm:text-sm md:text-base hover:scale-110'>Sign Out</span>
        </div>
        <div className='flex flex-col h-36 w-3/4 mx-auto rounded-lg shadow-xl p-5 md:p-10'>
          <p className='text-center font-bold md:font-extrabold text-base sm:text-lg md:text-3xl'>Welcome, Sanjula Arora !</p>
          <p className='text-center font-normal md:font-semibold text-[10px] sm:text-sm md:text-lg'>Email: xxxxxxxx@xxx.com</p>
        </div>
        <form className='flex flex-col justify-center items-center mt-10'>
          <input 
            className='w-[300px] md:w-[523px] mx-auto p-1 sm:p-3 rounded-lg text-sm sm:text-base'
            type='text'
            placeholder='Add Note Title'
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
          />
          <button className='h-8 md:h-10 w-3/4 rounded-lg mt-4 bg-[#367AFF] text-white hover:scale-110 text-sm sm:text-base' onClick={handleCreate}>Create Note</button>
        </form>
        <div className='w-3/4 mx-auto mt-8'>
          <p className='text-sm sm:text-base md:text-lg mb-4'>Notes</p>
          {isLoading && <p>Loading...</p> }
          {!isLoading && isError && <p>{isError}</p>}
          {!isLoading && !isError && (notes.length ?
            notes.map((note) => (
              <div className='flex justify-between h-9 sm:h-16 w-5/6 mx-auto rounded-lg shadow-xl p-2 sm:p-5 mt-2'>
              <span className='text-sm md:text-base'>{note.title}</span>
              <FaTrashCan role='button' onClick={() => handleDelete(note._id)} className='ml-1 sm:ml-0 hover:scale-125'/>
            </div>
            ))
            :
            <div>
              <p>No Notes to display.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard;