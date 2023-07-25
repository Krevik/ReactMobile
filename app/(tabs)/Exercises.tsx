import { Button, Modal, ScrollView, StyleSheet } from "react-native";

import { View } from "../../components/Themed";
import { useSelector } from "react-redux";
import { AppState, appStore } from "../../store/store";
import { MutableRefObject, useCallback, useRef, useState } from "react";
import { exercisesActions } from "../../store/slices/exercisesSlice";
import { TextInput } from "react-native-paper";
import { Text } from "react-native-paper";
import { List } from "react-native-paper";

export default function Exercises() {
  const exercises = useSelector(
    (state: AppState) => state.exercisesReducer.exercises
  );
  const [isAddExerciseModalVisible, setIsAddExerciseModalVisible] =
    useState<boolean>(false);
  const [newExerciseName, setNewExerciseName] = useState<string>("");

  const mapExercisesToView = useCallback(() => {
    return exercises.map((exercise) => (
      <List.Item
        title={exercise.name}
        description={"id: " + exercise.id}
        right={(props) => {
          return (
            <>
              <Button title={"Edit"}></Button>
              <Button
                title={"Remove"}
                onPress={() =>
                  appStore.dispatch(
                    exercisesActions.removeExerciseById(exercise.id)
                  )
                }
              ></Button>
            </>
          );
        }}
      />
    ));
  }, [exercises]);

  return (
    <View style={styles.container}>
      <Modal visible={isAddExerciseModalVisible}>
        <Text variant={"titleLarge"} style={styles.addExerciseTitle}>
          Add new exercise
        </Text>
        <TextInput
          mode={"outlined"}
          placeholder={"Exercise Name"}
          onChangeText={(name) => setNewExerciseName(name)}
        />
        <Button
          title={"Submit"}
          onPress={() => {
            appStore.dispatch(exercisesActions.addExercise(newExerciseName));
            setNewExerciseName("");
            setIsAddExerciseModalVisible(false);
          }}
        />
      </Modal>
      <Text style={styles.title}>Exercises</Text>
      {mapExercisesToView()}
      <View style={styles.addExerciseButton}>
        <Button
          title={"Add Exercise"}
          onPress={() => setIsAddExerciseModalVisible(true)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  addExerciseButton: {},
  addExerciseTitle: {
    alignSelf: "center",
  },
});
