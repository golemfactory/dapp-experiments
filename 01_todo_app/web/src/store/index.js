import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import request, { DELETE, GET, POST } from "./request";
import _ from "lodash";
import { get } from "./localstorage";

export const getMessages = createAsyncThunk(
  "messages/fetch",
  async (act, thunk) => {
    try {
      const response = await request(GET, "/api/list");
      thunk.dispatch(updateMessages(response.data));
    } catch (e) {
      console.error(e);
      return thunk.rejectWithValue(_.get(e, "response.data", "Unknown"));
    }
  }
);

export const addMessage = createAsyncThunk(
  "messages/add",
  async (act, thunk) => {
    try {
      const response = await request(POST, `/api/add`, act);
      thunk.dispatch(getMessages());
    } catch (e) {
      return thunk.rejectWithValue(_.get(e, "response.data", "Unknown"));
    }
  }
);

export const deleteMessage = createAsyncThunk(
  "messages/delete",
  async (act, thunk) => {
    try {
      const response = await request(POST, `/api/${act}/delete`);
      thunk.dispatch(getMessages());
    } catch (e) {
      return thunk.rejectWithValue(_.get(e, "response.data", "Unknown"));
    }
  }
);

export const updateMessage = createAsyncThunk(
  "messages/update",
  async (act, thunk) => {
    try {
      const response = await request(POST, `/api/${act}/update`);
      thunk.dispatch(getMessages());
    } catch (e) {
      return thunk.rejectWithValue(_.get(e, "response.data", "Unknown"));
    }
  }
);

export const appSlice = createSlice({
  name: "app",
  initialState: {
    messages: [],
    nav: {
      modal: null,
      error: null,
    },
  },
  reducers: {
    updateMessages: (state, action) => {
      state.messages = action.payload;
    },
    updateNav: (state, action) => {
      state.nav = _.merge(state.nav, action.payload);
    },
  },
  extraReducers: (builder) => {},
});

export const { updateMessages, updateNav } = appSlice.actions;

export default configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});
