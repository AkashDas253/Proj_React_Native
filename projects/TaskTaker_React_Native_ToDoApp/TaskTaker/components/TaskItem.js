import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TaskItem = ({ item, removeTask, startEditTask }) => {
  return (
    <View style={styles.taskItem}>
      <Text>{item.value}</Text>
      <View style={styles.icons}>
        <TouchableOpacity onPress={() => startEditTask(item)}>
          <Icon name="edit" size={20} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => removeTask(item.key)}>
          <Icon name="trash" size={20} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  icons: {
    flexDirection: 'row',
    width: 60,
    justifyContent: 'space-between',
  },
});

export default TaskItem;