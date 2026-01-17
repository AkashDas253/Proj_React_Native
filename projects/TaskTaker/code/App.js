import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, SafeAreaView, 
  KeyboardAvoidingView, Platform, TouchableOpacity 
} from 'react-native';
import * as Notifications from 'expo-notifications';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import { useTaskManager } from './hooks/useTaskManager';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const { tasks, addTask, updateTask, toggleComplete, removeTask } = useTaskManager();
  
  const [task, setTask] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskKey, setCurrentTaskKey] = useState(null);
  const [filter, setFilter] = useState('All');

  const handleTaskAction = (text, date) => {
    if (text.trim().length === 0) return;

    if (isEditing) {
      updateTask(currentTaskKey, text);
      setIsEditing(false);
      setCurrentTaskKey(null);
    } else {
      addTask(text, date);
    }
    setTask('');
  };

  const startEditTask = (item) => {
    setTask(item.value);
    setIsEditing(true);
    setCurrentTaskKey(item.key);
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'Active') return !t.completed;
    if (filter === 'Completed') return t.completed;
    return true;
  });

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.inner}
      >
        <View style={styles.header}>
          <Text style={styles.title}>TaskTaker</Text>
          <Text style={styles.subtitle}>{tasks.filter(t => !t.completed).length} tasks remaining</Text>
        </View>

        <TaskInput
          task={task}
          setTask={setTask}
          onPress={handleTaskAction}
          isEditing={isEditing}
        />

        <View style={styles.filterBar}>
          {['All', 'Active', 'Completed'].map((status) => (
            <TouchableOpacity 
              key={status} 
              onPress={() => setFilter(status)}
              style={[styles.filterBtn, filter === status && styles.filterBtnActive]}
            >
              <Text style={[styles.filterText, filter === status && styles.filterTextActive]}>
                {status}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TaskList 
          tasks={filteredTasks} 
          removeTask={removeTask} 
          startEditTask={startEditTask}
          toggleComplete={toggleComplete}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  inner: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginVertical: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  subtitle: {
    fontSize: 14,
    color: '#6C757D',
    marginTop: 4,
  },
  filterBar: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    padding: 4,
  },
  filterBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  filterBtnActive: {
    backgroundColor: '#FFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6C757D',
  },
  filterTextActive: {
    color: '#3b5998',
  },
});