export interface TodoItemProps {
    todo: Todo;
    index: number;
}

export type BtnProps = {
    onPress: () => void
    title: string,
}

export interface Todo {
    id: string;
    text: string;
    completed: boolean;
    createdAt: number; // Unix timestamp for sorting
    updatedAt: number; // Unix timestamp for tracking changes
    userId: string; // For user-specific queries
}

export type FilterType = 'all' | 'active' | 'completed';

export interface FiltersState {
    currentFilter: FilterType;
}
