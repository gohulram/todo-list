import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import InputField from '../components/inputfield';
import axios from 'axios';

const EditTaskScreen = ({ navigation, route }) => {
  const { task } = route.params;
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [taskDescription, setTaskDescription] = useState(task.description);

  const handleEditTask = async () => {
    if (!taskTitle.trim() || !taskDescription.trim()) {
      alert('Please enter both task title and description');
      return;
    }

    try {
      const response = await axios.put('http://192.168.29.49:3000/api/tasks/update', {
        id: task.id,
        title: taskTitle,
        description: taskDescription,
        status: task.status,
      });
      console.log('Task updated:', response.data);
      Alert.alert('Success', 'Task updated successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Error updating task:', error);
      Alert.alert('Error', 'Failed to update task. Please try again.');
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
      <TouchableOpacity style={styles.button} onPress={handleEditTask}>
        <Text style={styles.buttonText}>Update Task</Text>
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

export default EditTaskScreen;

