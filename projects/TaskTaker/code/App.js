import React, { useState, useEffect, useCallback } from 'react';
import { 
  StyleSheet, Text, View, SafeAreaView, 
  KeyboardAvoidingView, Platform, TouchableOpacity 
} from 'react-native';
import * as Notifications from 'expo-notifications';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font'; 
import { Feather } from '@expo/vector-icons'; 

import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import { useTaskManager } from './hooks/useTaskManager';

SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    ...Feather.font,
  });

  const { tasks, addTask, updateTask, toggleComplete, removeTask } = useTaskManager();
  
  const [task, setTask] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskKey, setCurrentTaskKey] = useState(null);
  const [filter, setFilter] = useState('All');
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        if (fontsLoaded || fontError) {
          if (fontError) console.error("Font loading error:", fontError);
          
          await new Promise(resolve => setTimeout(resolve, 500));
          setAppIsReady(true);
        }
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
  }, [fontsLoaded, fontError]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  const handleTaskAction = (text, date) => {
    if (text.trim().length === 0) return;
    if (isEditing) {
      updateTask(currentTaskKey, text);
      cancelEdit();
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

  const cancelEdit = () => {
    setTask('');
    setIsEditing(false);
    setCurrentTaskKey(null);
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'Active') return !t.completed;
    if (filter === 'Completed') return t.completed;
    return true;
  });

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.inner}
      >
        <View style={styles.header}>
          <Text style={styles.title}>TaskTaker</Text>
          <Text style={styles.subtitle}>
            {tasks.filter(t => !t.completed).length} tasks remaining
          </Text>
        </View>

        <TaskInput
          task={task}
          setTask={setTask}
          onPress={handleTaskAction}
          isEditing={isEditing}
          onCancel={cancelEdit} 
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
    paddingTop: Platform.OS === 'android' ? 30 : 0,
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