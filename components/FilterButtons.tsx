import { View, TouchableOpacity, Text } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { setFilter } from "@/slices/filtersSlice"
import { RootState } from "@/store"

export default function FilterButtons() {
    const dispatch = useDispatch();
    const currentFilter = useSelector((state: RootState) => state.filters.currentFilter);

    const filters = [
        { key: 'all', label: 'All' },
        { key: 'active', label: 'Active' },
        { key: 'completed', label: 'Completed' }
    ] as const;

    return (
        <View className="flex-row justify-center space-x-2 p-4">
            {filters.map((filter) => (
                <TouchableOpacity
                    key={filter.key}
                    onPress={() => dispatch(setFilter(filter.key))}
                    className={`px-4 m-2 py-2 rounded-lg border ${
                        currentFilter === filter.key
                            ? 'bg-blue-500 border-blue-500'
                            : 'bg-white border-gray-300'
                    }`}
                >
                    <Text
                        className={`font-mono text-sm ${
                            currentFilter === filter.key ? 'text-white' : 'text-gray-700'
                        }`}
                    >
                        {filter.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    )
} 