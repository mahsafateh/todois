import { Todo, TodoItemProps } from "@/types/todo"
import { View, Text, TouchableOpacity } from "react-native"
import { useDispatch } from "react-redux"
import { toggleTodoAsync } from "@/slices/todosSlice"
import { AppDispatch } from "@/store"

export default function TodoItem({ todo, index }: TodoItemProps) {
    const dispatch = useDispatch<AppDispatch>();

    const handleToggle = () => {
        dispatch(toggleTodoAsync({ id: todo.id, completed: todo.completed }));
    };

    return (
        <TouchableOpacity onPress={handleToggle}>
            <View className="p-3 m-1 border border-gray-200 rounded-lg flex-row items-center">
                <View className={`w-6 h-6 rounded-full border-2 mr-3 ${
                    todo.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'
                }`}>
                    {todo.completed && (
                        <Text className="text-white text-center text-xs">✓</Text>
                    )}
                </View>
                <Text
                    className={`font-mono text-[16px] ${
                        todo.completed ? 'line-through text-gray-500' : 'font-semibold'
                    }`}
                >
                    {`${index + 1}.`} {todo.text}
                </Text>
            </View>
        </TouchableOpacity>
    )
}