import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    taskList:[],
    selectedTask:{},
    isLoading:false,
    error:''
}

const BASE_URL = 'http://localhost:8000/tasks'

// GET Fetch
export const getTaskFromServer = createAsyncThunk(
    "tasks/getTaskFromServer",
    async (_,{rejectWithValue})=>{
        const response = await fetch('http://localhost:8000/tasks')
        if(response.ok){
            const jsonResponse = await response.json();
            return jsonResponse
        }else{
            return rejectWithValue({error:'No Task Found'})
        }
    }
)


// POST Insert
export const addTaskToServer = createAsyncThunk(
    "tasks/addTaskToServer",
    async (task,{rejectWithValue})=>{
        const option = {
            method : 'POST',
            body : JSON.stringify(task),
            headers : {
                'Content-type' : "application/json; charset=UTF-8"
            }
        }
        const response = await fetch(BASE_URL,option)
        if(response.ok){
            const jsonResponse = await response.json();
            return jsonResponse
        }else{
            return rejectWithValue({error:'Task Not Added Successfully'})
        }
    }
)

// PATCH  Update
export const updateTaskToServer = createAsyncThunk(
    "tasks/updateTaskToServer",
    async (task,{rejectWithValue})=>{
        const option = {
            method : 'PATCH',
            body : JSON.stringify(task),
            headers : {
                'Content-type' : "application/json; charset=UTF-8"
            }
        }
        const response = await fetch(BASE_URL + '/'+ task.id,option)
        if(response.ok){
            const jsonResponse = await response.json();
            return jsonResponse
        }else{
            return rejectWithValue({error:'Task Not Updated Successfully'})
        }
    }
)



// DELETE  Update
export const deleteTaskFromServer = createAsyncThunk(
    "tasks/deleteTaskFromServer",
    async (task,{rejectWithValue})=>{
        const option = {
            method : 'DELETE',
            body : JSON.stringify(task),
            headers : {
                'Content-type' : "application/json; charset=UTF-8"
            }
        }
        const response = await fetch(BASE_URL + '/'+ task.id,option)
        if(response.ok){
            const jsonResponse = await response.json();
            return jsonResponse
        }else{
            return rejectWithValue({error:'Task Not Deleted Successfully'})
        }
    }
)

const taskSlice = createSlice({
    name:'taskSlice',
    initialState,
    reducers:{
        addTaskToList:(state,action)=>{
            const id= Math.random() * 100
            let task ={...action.payload,id} 
            state.taskList.push(task);
        },
        removeTaskFromList:(state,action)=>{
            state.taskList = state.taskList.filter((task)=>task.id !== action.payload.id)
        },
        updateTaskInList:(state, action)=>{
            state.taskList = state.taskList.map((task)=>task.id === action.payload.id ? action.payload : task)
        },
        setSelectedTask:(state,action)=>{
            state.selectedTask = action.payload
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(getTaskFromServer.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTaskFromServer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = ""
                state.taskList = action.payload
            })
            .addCase(getTaskFromServer.rejected, (state, action) => {
                state.error = action.payload.error
                state.isLoading = false
                state.tasksList = []
            })

            .addCase(addTaskToServer.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addTaskToServer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = ""
                state.taskList.push(action.payload)
            })
            .addCase(addTaskToServer.rejected, (state, action) => {
                state.error = action.payload.error
                state.isLoading = false
                state.tasksList = []
            })

            .addCase(updateTaskToServer.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateTaskToServer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = ""
                state.taskList = state.taskList.map((task)=>task.id === action.payload.id ? action.payload : task)
            })
            .addCase(updateTaskToServer.rejected, (state, action) => {
                state.error = action.payload.error
                state.isLoading = false
                state.tasksList = []
            })

            .addCase(deleteTaskFromServer.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteTaskFromServer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = ""
            })
            .addCase(deleteTaskFromServer.rejected, (state, action) => {
                state.error = action.payload.error
                state.isLoading = false
                state.tasksList = []
            })
    }
})


export const {addTaskToList,removeTaskFromList,updateTaskInList,setSelectedTask} = taskSlice.actions
 

export default taskSlice.reducer