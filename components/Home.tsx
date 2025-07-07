import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import {
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Alert
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { addTodoAsync, clearCompletedAsync } from '@/slices/todosSlice';
import { Todo } from '@/types/todo';

import PrimaryButton from './Button';
import TodoItem from './TodoItem';
import FilterButtons from './FilterButtons';

export default function HomePage() {
  const [text, setText] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  
  const todos = useSelector((state: RootState) => state.todos);
  const currentFilter = useSelector((state: RootState) => state.filters.currentFilter);

  // Filter todos based on current filter
  const filteredTodos = todos.filter((todo: Todo) => {
    switch (currentFilter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true; // 'all'
    }
  });

  const addTodo = () => {
    if (text.trim()) {
      // For now, using a mock userId. In a real app, get this from auth
      const userId = "mock-user-id";
      const now = Date.now();
      const newTodo = {
        text: text.trim(),
        completed: false,
        createdAt: now,
        updatedAt: now,
        userId
      };
      dispatch(addTodoAsync({ todo: newTodo, userId }));
      setText("");
    }
  };

  const handleClearCompleted = () => {
    const completedTodoIds = todos
      .filter(todo => todo.completed)
      .map(todo => todo.id);
    
    Alert.alert(
      "Clear Completed",
      "Are you sure you want to clear all completed todos?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Clear", onPress: () => dispatch(clearCompletedAsync(completedTodoIds)) }
      ]
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 bg-white w-full">

        <Text className="font-mono text-lg font-semibold mb-4 text-center pt-6">
          Make your day productive with Todo List
        </Text>

        <View className="px-5">
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="What's in your mind?"
            className="font-mono w-full border border-gray-400 rounded-md p-3 mb-4"
          />
          <PrimaryButton onPress={addTodo} title='Add Todo' />
        </View>
        <FilterButtons />

        <View className="flex-1 w-full px-5">
          <FlatList
            data={filteredTodos}
            renderItem={({ item, index }) => (
              <TodoItem todo={item} index={index} />
            )}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={
              <Text className="text-center text-gray-500 font-mono mt-8">
                {currentFilter === 'all' 
                  ? 'No todos yet. Add one above!' 
                  : `No ${currentFilter} todos.`
                }
              </Text>
            }
          />
        </View>

        {todos.some(todo => todo.completed) && (
          <View className="p-4">
            <PrimaryButton 
              onPress={handleClearCompleted} 
              title='Clear Completed' 
            />
          </View>
        )}

        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}