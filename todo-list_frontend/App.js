import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/loginscreen';
import SignUpScreen from './screens/signupscreen';
import TaskListScreen from './screens/tasklistscreen';
import AddTaskScreen from './screens/addtaskscreen';
import EditTaskScreen from './screens/EditTaskscreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{ title: 'Sign Up' }}
        />
        <Stack.Screen
          name="TaskListScreen"
          component={TaskListScreen}
          options={{ title: 'Task List' }}
        />
        <Stack.Screen
          name="AddTaskScreen"
          component={AddTaskScreen}
          options={{ title: 'Add Task' }}
        />
        <Stack.Screen
          name="EditTaskScreen"
          component={EditTaskScreen}
          options={{ title: 'Edit Task' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
