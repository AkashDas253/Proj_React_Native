import React from 'react';
import { FlatList } from 'react-native';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, removeTask, startEditTask }) => {
  return (
    <FlatList
      data={tasks}
      renderItem={({ item }) => (
        <TaskItem item={item} removeTask={removeTask} startEditTask={startEditTask} />
      )}
    />
  );
};

export default TaskList;