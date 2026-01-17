import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, removeTask, startEditTask, toggleComplete }) => {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => (
        <TaskItem 
          item={item} 
          removeTask={removeTask} 
          startEditTask={startEditTask} 
          toggleComplete={toggleComplete}
        />
      )}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No tasks found</Text>
        </View>
      }
      contentContainerStyle={{ paddingBottom: 40 }}
    />
  );
};

const styles = StyleSheet.create({
  empty: {
    marginTop: 60,
    alignItems: 'center',
  },
  emptyText: {
    color: '#ADB5BD',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default TaskList;