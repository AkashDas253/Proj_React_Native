import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const TaskItem = ({ item, removeTask, startEditTask, toggleComplete }) => {
  
  const getFormattedAlarm = (isoString) => {
    if (!isoString) return null;
    const date = new Date(isoString);
    return `${date.toLocaleDateString([], { month: 'short', day: 'numeric' })}, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  const alarmDisplay = getFormattedAlarm(item.alarmIso);

  return (
    <View style={[styles.card, item.completed && styles.cardCompleted]}>
      <TouchableOpacity 
        style={styles.checkContainer} 
        onPress={() => toggleComplete(item.key)}
      >
        <Feather 
          name={item.completed ? "check-circle" : "circle"} 
          size={22} 
          color={item.completed ? "#4CAF50" : "#CED4DA"} 
        />
      </TouchableOpacity>
      
      <View style={styles.textContainer}>
        <Text style={[styles.taskText, item.completed && styles.completedText]}>
          {item.value}
        </Text>
        <View style={styles.metaContainer}>
          {alarmDisplay && (
            <View style={styles.alarmTag}>
              <Feather name="bell" size={10} color="#E65100" style={{ marginRight: 4 }} />
              <Text style={styles.alarmText}>{alarmDisplay}</Text>
            </View>
          )}
          
          {!alarmDisplay && <Text style={styles.dateText}>Created: {new Date(item.createdAt).toLocaleDateString()}</Text>}
        </View>
      </View>

      <View style={styles.actions}>
        {!item.completed && (
          <TouchableOpacity onPress={() => startEditTask(item)} style={styles.iconBtn}>
            <Feather name="edit-2" size={18} color="#3b5998" />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => removeTask(item.key)} style={styles.iconBtn}>
          <Feather name="trash-2" size={18} color="#FF5252" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF',
    padding: 16, borderRadius: 16, marginBottom: 12, borderWidth: 1,
    borderColor: '#F1F3F5', elevation: 1, shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 1,
  },
  cardCompleted: { opacity: 0.7, backgroundColor: '#F8F9FA', elevation: 0 },
  checkContainer: { marginRight: 12 },
  textContainer: { flex: 1 },
  taskText: { fontSize: 16, color: '#343A40', fontWeight: '500' },
  completedText: { textDecorationLine: 'line-through', color: '#ADB5BD' },
  metaContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  dateText: { fontSize: 11, color: '#ADB5BD' },
  alarmTag: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF3E0',
    paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginRight: 10
  },
  alarmText: { fontSize: 11, color: '#E65100', fontWeight: '600' },
  actions: { flexDirection: 'row' },
  iconBtn: { padding: 8, marginLeft: 4 },
});

export default TaskItem;