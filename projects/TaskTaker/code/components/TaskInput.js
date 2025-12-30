import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const TaskInput = ({ task, setTask, onPress, isEditing }) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Add a new task..."
        placeholderTextColor="#ADB5BD"
        style={styles.input}
        value={task}
        onChangeText={setTask}
        onSubmitEditing={onPress}
      />
      <TouchableOpacity 
        style={[styles.button, isEditing ? styles.editBtn : styles.addBtn]} 
        onPress={onPress}
      >
        <Icon name={isEditing ? "check" : "plus"} size={24} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#1A1A1A',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#DEE2E6',
  },
  button: {
    width: 52,
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  addBtn: { backgroundColor: '#3b5998' },
  editBtn: { backgroundColor: '#4CAF50' },
});

export default TaskInput;