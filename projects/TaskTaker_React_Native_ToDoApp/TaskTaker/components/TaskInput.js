import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TaskInput = ({ task, setTask, addTask, isEditing, updateTask }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="Enter Task"
        style={styles.input}
        value={task}
        onChangeText={setTask}
      />
      {isEditing ? (
        <Icon.Button name="check" backgroundColor="#3b5998" onPress={updateTask}>
          Update
        </Icon.Button>
      ) : (
        <Icon.Button name="plus" backgroundColor="#3b5998" onPress={addTask}>
          Add
        </Icon.Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    width: '70%',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    padding: 10,
  },
});

export default TaskInput;