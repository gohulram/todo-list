import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import InputField from '../components/inputfield';
import axios from 'axios';

const AddTaskScreen = ({ navigation }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const handleAddTask = async () => {
    if (!taskTitle.trim() || !taskDescription.trim()) {
      alert('Please enter both task title and description');
      return;
    }

    try {
      const response = await axios.post('http://192.168.29.49:3000/api/tasks/create', {
        title: taskTitle,
        description: taskDescription,
      });
      console.log('Task added:', response.data);
      Alert.alert('Success', 'Task added successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Error adding task:', error);
      Alert.alert('Error', 'Failed to add task. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <InputField
        value={taskTitle}
        onChangeText={setTaskTitle}
        placeholder="Enter task title"
      />
      <InputField
        value={taskDescription}
        onChangeText={setTaskDescription}
        placeholder="Enter task description"
      />
      <TouchableOpacity style={styles.button} onPress={handleAddTask}>
        <Text style={styles.buttonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AddTaskScreen;
