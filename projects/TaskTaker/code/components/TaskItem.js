import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const TaskItem = ({ item, removeTask, startEditTask, toggleComplete }) => {
  return (
    <View style={[styles.card, item.completed && styles.cardCompleted]}>
      <TouchableOpacity 
        style={styles.checkContainer} 
        onPress={() => toggleComplete(item.key)}
      >
        <Icon 
          name={item.completed ? "check-circle" : "circle"} 
          size={22} 
          color={item.completed ? "#4CAF50" : "#CED4DA"} 
        />
      </TouchableOpacity>
      
      <View style={styles.textContainer}>
        <Text style={[styles.taskText, item.completed && styles.completedText]}>
          {item.value}
        </Text>
        <Text style={styles.dateText}>{item.timestamp}</Text>
      </View>

      <View style={styles.actions}>
        {!item.completed && (
          <TouchableOpacity onPress={() => startEditTask(item)} style={styles.iconBtn}>
            <Icon name="edit-2" size={18} color="#3b5998" />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => removeTask(item.key)} style={styles.iconBtn}>
          <Icon name="trash-2" size={18} color="#FF5252" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F3F5',
  },
  cardCompleted: {
    opacity: 0.7,
    backgroundColor: '#F8F9FA',
  },
  checkContainer: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  taskText: {
    fontSize: 16,
    color: '#343A40',
    fontWeight: '500',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#ADB5BD',
  },
  dateText: {
    fontSize: 11,
    color: '#ADB5BD',
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
  },
  iconBtn: {
    padding: 8,
    marginLeft: 4,
  },
});

export default TaskItem;