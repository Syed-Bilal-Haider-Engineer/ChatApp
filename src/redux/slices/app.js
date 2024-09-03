import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    sidebar: {
        open:false,
        type:'CONTACT'
    }
}

const slice = createSlice({
    name:'app',
    initialState,
    reducers: {
        toggleSidebar(state, actions){
           state.sidebar.open = !state.sidebar.open
        },
        updateType(state, actions){
            state.sidebar.type = actions.payload.type
        }
    }
})

export default slice.reducer