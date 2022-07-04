import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

// Define a type for the slice state
interface InputState {
  value: string;
  day1: any; // day 1 of the data from fetch api
  day2: any; // ...
  day3: any; //
  day4: any; //
  day5: any; //
  currentWea: any; // current weather data object
  display_flag: boolean; // display the component only if the flag is true
}

// Define the initial state using that type
const initialState: InputState = {
  value: "",
  day1: {},
  day2: {},
  day3: {},
  day4: {},
  day5: {},
  currentWea: {},
  display_flag: false,
};

export const inputSlice = createSlice({
  name: "input",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setInput: (state, action) => {
      state.value = action.payload;
    },
    setDay_1: (state, action) => {
      state.day1 = action.payload;
    },
    setDay_2: (state, action) => {
      state.day2 = action.payload;
    },
    setDay_3: (state, action) => {
      state.day3 = action.payload;
    },
    setDay_4: (state, action) => {
      state.day4 = action.payload;
    },
    setDay_5: (state, action) => {
      state.day5 = action.payload;
    },
    setCurrentWea: (state, action) => {
      state.currentWea = action.payload;
    },
    setDisplayFlag: (state, action) => {
      state.display_flag = action.payload;
    },
  },
});

export const {
  setInput,
  setDay_1,
  setDay_2,
  setDay_3,
  setDay_4,
  setDay_5,
  setCurrentWea,
  setDisplayFlag,
} = inputSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectInput = (state: RootState) => state.input.value;

export default inputSlice.reducer;
