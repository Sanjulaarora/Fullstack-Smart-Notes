import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//Action
export const fetchNotes = createAsyncThunk('/fetchNotes', async() => {
    const response = await fetch('/get-notes', {
        method : 'GET',
        headers: {
            'Content-Type':'application/json'
        }
    });
    return response.json();
});

export const NotesSlice = createSlice({
    name: 'notes',
    initialState: {
        isLoading: false,
        data: [],
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchNotes.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchNotes.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchNotes.rejected, (state, action) => {
            console.log('Error', action.payload);
            state.isError = true;
        });
    },
});

export default NotesSlice.reducer;