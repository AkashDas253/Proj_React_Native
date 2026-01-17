import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Alert, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const TaskInput = ({ task, setTask, onPress }) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [alarmSet, setAlarmSet] = useState(false);

  const onChange = (event, selectedDate) => {
    if (event.type === 'dismissed') {
      setShow(false);
      setMode('date');
      return;
    }

    const currentDate = selectedDate || date;

    if (Platform.OS === 'android') {
      setShow(false);
      if (mode === 'date') {
        setDate(currentDate);
        setMode('time');
        setTimeout(() => setShow(true), 150);
      } else {
        const finalDate = new Date(date);
        finalDate.setHours(currentDate.getHours());
        finalDate.setMinutes(currentDate.getMinutes());
        finalDate.setSeconds(0);

        if (finalDate <= new Date()) {
          Alert.alert("Invalid Time", "Please pick a time in the future.");
          setAlarmSet(false);
        } else {
          setDate(finalDate);
          setAlarmSet(true);
        }
        setMode('date');
      }
    } else {
      setDate(currentDate);
      setAlarmSet(true);
    }
  };

  const handleAdd = () => {
    if (!task.trim()) return;
    onPress(task, alarmSet ? date : null);
    setTask('');
    setAlarmSet(false);
    setDate(new Date());
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <TextInput 
            style={styles.input} 
            placeholder="What's on your mind?" 
            value={task} 
            onChangeText={setTask} 
        />
        <TouchableOpacity 
            style={[styles.iconBtn, alarmSet && styles.activeBtn]} 
            onPress={() => { setMode('date'); setShow(true); }}
        >
          <Feather name="bell" size={20} color={alarmSet ? "#FFF" : "#666"} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
          <Feather name="plus" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {alarmSet && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            🔔 {date.toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </Text>
          <TouchableOpacity onPress={() => setAlarmSet(false)}>
            <Feather name="x" size={14} color="#e67e22" />
          </TouchableOpacity>
        </View>
      )}

      {show && (
        <DateTimePicker
          value={date}
          mode={mode}
          is24Hour={false}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChange}
          minimumDate={new Date()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { marginBottom: 15 },
  container: { flexDirection: 'row', alignItems: 'center' },
  input: { flex: 1, backgroundColor: '#FFF', borderRadius: 12, padding: 15, borderWidth: 1, borderColor: '#DDD' },
  iconBtn: { width: 48, height: 48, backgroundColor: '#EEE', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginHorizontal: 8 },
  activeBtn: { backgroundColor: '#e67e22' },
  addBtn: { width: 48, height: 48, backgroundColor: '#3498db', borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  badge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF3E0', marginTop: 10, padding: 8, borderRadius: 8, alignSelf: 'flex-start' },
  badgeText: { fontSize: 12, color: '#e67e22', fontWeight: 'bold', marginRight: 8 }
});

export default TaskInput;