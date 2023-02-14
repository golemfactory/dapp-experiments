import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import request, { DELETE, GET, POST } from "./request";
import _ from "lodash";
import { get } from "./localstorage";

export const getTasks = createAsyncThunk(
  "messages/fetch",
  async (act, thunk) => {
    try {
      const response = await request(GET, "/api/list");
      thunk.dispatch(updateTasks(response.data));
    } catch (e) {
      console.error(e);
      return thunk.rejectWithValue(_.get(e, "response.data", "Unknown"));
    }
  }
);

export const addTask = createAsyncThunk("messages/add", async (act, thunk) => {
  try {
    const response = await request(POST, `/api/add`, act);
    thunk.dispatch(getTasks());
  } catch (e) {
    return thunk.rejectWithValue(_.get(e, "response.data", "Unknown"));
  }
});

export const deleteTask = createAsyncThunk(
  "messages/delete",
  async (act, thunk) => {
    try {
      const response = await request(POST, `/api/${act}/delete`);
      thunk.dispatch(getTasks());
    } catch (e) {
      return thunk.rejectWithValue(_.get(e, "response.data", "Unknown"));
    }
  }
);

export const updateTask = createAsyncThunk(
  "messages/update",
  async (act, thunk) => {
    try {
      const response = await request(POST, `/api/${act}/update`);
      thunk.dispatch(getTasks());
    } catch (e) {
      return thunk.rejectWithValue(_.get(e, "response.data", "Unknown"));
    }
  }
);

export const appSlice = createSlice({
  name: "app",
  initialState: {
    tasks: [],
    nav: {
      modal: null,
      error: null,
    },
  },
  reducers: {
    updateTasks: (state, action) => {
      state.tasks = action.payload;
    },
    updateNav: (state, action) => {
      state.nav = _.merge(state.nav, action.payload);
    },
  },
  extraReducers: (builder) => {},
});

export const { updateTasks: updateTasks, updateNav } = appSlice.actions;

export default configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});
