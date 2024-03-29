import { createAction } from "redux-act";

export const login = createAction("login");
export const logout = createAction("logout");

export const addUser = createAction("add user");
export const removeUser = createAction("remove user");

export const newMessage = createAction("new message");
export const sendMessage = createAction("send message");

export const newRoom = createAction("new room");
export const getRoom = createAction("get room");
