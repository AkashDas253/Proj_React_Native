import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, Text, View, Alert, SafeAreaView, 
  KeyboardAvoidingView, Platform, TouchableOpacity 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskKey, setCurrentTaskKey] = useState(null);
  const [filter, setFilter] = useState('All');
  const isLoaded = useRef(false);

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    if (isLoaded.current) {
      saveTasks();
    }
  }, [tasks]);

  const saveTasks = async () => {
    try {
      await AsyncStorage.setItem('tasks_v2', JSON.stringify(tasks));
    } catch (error) {
      Alert.alert('Error', 'Failed to save tasks');
    }
  };

  const loadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks_v2');
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load tasks');
    } finally {
      isLoaded.current = true;
    }
  };

  const handleTaskAction = () => {
    if (task.trim().length === 0) return;

    if (isEditing) {
      setTasks(prev => prev.map(t => 
        t.key === currentTaskKey ? { ...t, value: task } : t
      ));
      setIsEditing(false);
      setCurrentTaskKey(null);
    } else {
      const newTask = {
        key: Date.now().toString(),
        value: task,
        completed: false,
        timestamp: new Date().toLocaleDateString()
      };
      setTasks(prev => [newTask, ...prev]);
    }
    setTask('');
  };

  const toggleComplete = (key) => {
    setTasks(prev => prev.map(t => 
      t.key === key ? { ...t, completed: !t.completed } : t
    ));
  };

  const startEditTask = (item) => {
    setTask(item.value);
    setIsEditing(true);
    setCurrentTaskKey(item.key);
  };

  const removeTask = (taskKey) => {
    setTasks(prev => prev.filter(t => t.key !== taskKey));
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