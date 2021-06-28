import userReducer from '../feature/components/authentificaion/userSlice.js';
const { configureStore } = require('@reduxjs/toolkit');

const rootReducer = {
  user: userReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;