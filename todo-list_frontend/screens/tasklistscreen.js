import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Text, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import TaskItem from '../components/taskitem';
import axios from 'axios';

const TaskListScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://192.168.29.49:3000/api/tasks/getAll');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      Alert.alert('Error', 'Failed to load tasks.');
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await axios.delete('http://192.168.29.49:3000/api/tasks/delete', {
        data: { id },
      });

      if (response.data.message === 'Task deleted successfully!') {
        Alert.alert('Success', 'Task deleted successfully!');
        fetchTasks(); // Refresh the task list
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      Alert.alert('Error', 'Failed to delete task.');
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTasks(); // Fetch tasks every time the screen is focused
    }, [])
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onEdit={() => navigation.navigate('EditTaskScreen', { task: item, refreshTasks: fetchTasks })}
            onDelete={() => deleteTask(item.id)}
          />
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddTaskScreen', { refreshTasks: fetchTasks })}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#6200ee',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 30,
  },
});

export default TaskListScreen;
