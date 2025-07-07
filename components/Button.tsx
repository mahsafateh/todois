import { BtnProps } from "@/types/todo"
import { Text, TouchableOpacity } from "react-native"

export default function PrimaryButton({ onPress, title }: BtnProps) {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
            <Text className="font-mono bg-purple-600 text-white px-6 py-3 rounded-md mb-4 text-center font-medium">
                {title}
            </Text>
        </TouchableOpacity>
    )
}