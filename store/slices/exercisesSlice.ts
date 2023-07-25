import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Exercise } from "../../models/exercises/ExercisesTypes";

interface exercisesSliceProps {
  exercises: Exercise[];
}

const initialState: exercisesSliceProps = {
  exercises: [],
};

const exercisesSlice = createSlice({
  name: "exercisesSlice",
  initialState: initialState,
  reducers: {
    setExercises(state, action: PayloadAction<Exercise[]>) {
      state.exercises = action.payload;
    },
    addExercise(state, action: PayloadAction<string>) {
      let id = 1;
      state.exercises.forEach((exercise) => {
        if (exercise.id >= id) {
          id = exercise.id + 1;
        }
      });
      const newExercise: Exercise = {
        id: id,
        name: action.payload,
      } as Exercise;
      state.exercises.push(newExercise);
    },
    removeExerciseById(state, action: PayloadAction<number>) {
      const exerciseIndex = state.exercises.findIndex(
        (exercise) => exercise.id === action.payload
      );
      if (exerciseIndex) {
        state.exercises.splice(exerciseIndex, 1);
      }
    },
    modifyExercise(state, action: PayloadAction<Exercise>) {
      const exerciseIndex = state.exercises.findIndex(
        (exercise) => exercise.id === action.payload.id
      );
      if (exerciseIndex) {
        state.exercises.splice(exerciseIndex, 1, action.payload);
      }
    },
  },
});

export const exercisesActions = exercisesSlice.actions;
export const exercisesReducer = exercisesSlice.reducer;
