import { useState, useEffect, useRef } from 'react';
import { Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const useTaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const isLoaded = useRef(false);

  useEffect(() => {
    loadTasks();
    requestPermissions();
  }, []);

  useEffect(() => {
    if (isLoaded.current) saveTasks();
  }, [tasks]);

  const requestPermissions = async () => {
    if (Device.isDevice) {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') console.log('Permission denied');
    }
  };

  const saveTasks = async () => {
    try {
      await AsyncStorage.setItem('tasks_v7', JSON.stringify(tasks));
    } catch (e) { console.log('Save error'); }
  };

  const loadTasks = async () => {
    try {
      const saved = await AsyncStorage.getItem('tasks_v7');
      if (saved) setTasks(JSON.parse(saved));
    } finally { isLoaded.current = true; }
  };

  const addTask = async (text, notificationDate = null) => {
    let notificationId = null;

    if (notificationDate && notificationDate > new Date()) {
      try {
        notificationId = await Notifications.scheduleNotificationAsync({
          content: {
            title: "Task Reminder",
            body: text,
            sound: 'default',
          },
          trigger: {
            type: 'date',
            date: notificationDate,
          },
        });
      } catch (e) {
        console.log("Scheduling error:", e);
      }
    }

    const newTask = {
      key: Date.now().toString(),
      value: text,
      completed: false,
      createdAt: new Date().toISOString(),
      alarmIso: notificationDate ? notificationDate.toISOString() : null,
      notificationId
    };

    setTasks(prev => [newTask, ...prev].sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    }));
  };

  const updateTask = (key, newText) => {
    setTasks(prev => prev.map(t => 
      t.key === key ? { ...t, value: newText } : t
    ));
  };

  const toggleComplete = (key) => {
    setTasks(prev => prev.map(t => t.key === key ? { ...t, completed: !t.completed } : t));
  };

  const removeTask = async (key) => {
    const task = tasks.find(t => t.key === key);
    if (task?.notificationId) {
      await Notifications.cancelScheduledNotificationAsync(task.notificationId).catch(() => {});
    }
    setTasks(prev => prev.filter(t => t.key !== key));
  };

  return { tasks, addTask, updateTask, toggleComplete, removeTask };
};