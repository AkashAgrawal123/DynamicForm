// import { configureStore } from "@reduxjs/toolkit";
// import rootReducer from "./Services/Reducers/index";

// const store = configureStore({
//   reducer: rootReducer,
// });

// export default store;

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk"; // Import the CommonJS version
import rootReducer from './Services/Reducers/index';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;


