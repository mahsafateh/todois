import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { Todo } from "@/types/todo"
import { 
    fetchTodos, 
    addTodoToServer, 
    updateTodoInServer, 
    deleteTodoFromServer, 
    clearCompletedTodosFromServer 
} from "@/services/itemService"

// Async thunks for server operations
export const loadTodos = createAsyncThunk(
    'todos/loadTodos',
    async (userId: string) => {
        return await fetchTodos(userId);
    }
);

export const addTodoAsync = createAsyncThunk(
    'todos/addTodoAsync',
    async ({ todo, userId }: { todo: Omit<Todo, 'id'>, userId: string }) => {
        const serverId = await addTodoToServer(todo, userId);
        if (serverId) {
            return { ...todo, id: serverId }; // Use Firebase auto-generated ID
        } else {
            // Fallback to client-generated ID if server fails
            const { generateTodoId } = await import('@/utils/idGenerator');
            return { ...todo, id: generateTodoId() };
        }
    }
);

export const toggleTodoAsync = createAsyncThunk(
    'todos/toggleTodoAsync',
    async ({ id, completed }: { id: string, completed: boolean }) => {
        await updateTodoInServer(id, { completed: !completed });
        return { id, completed: !completed };
    }
);

export const clearCompletedAsync = createAsyncThunk(
    'todos/clearCompletedAsync',
    async (todoIds: string[]) => {
        await clearCompletedTodosFromServer(todoIds);
        return todoIds;
    }
);

const todosSlice = createSlice({
    name: "todos",
    initialState: [] as Todo[],
    reducers: {
        todoAdded(state, action) {
            const now = Date.now();
            state.push({
                id: action.payload.id,
                text: action.payload.text,
                completed: false,
                createdAt: now,
                updatedAt: now,
                userId: action.payload.userId || 'unknown'
            })
        },
        todoToggled(state, action) {
            const todo = state.find(todo => todo.id === action.payload)
            if (todo) {
                todo.completed = !todo.completed
            }
        },
        clearCompleted(state) {
            return state.filter(todo => !todo.completed);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadTodos.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(addTodoAsync.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(toggleTodoAsync.fulfilled, (state, action) => {
                const todo = state.find(todo => todo.id === action.payload.id);
                if (todo) {
                    todo.completed = action.payload.completed;
                }
            })
            .addCase(clearCompletedAsync.fulfilled, (state, action) => {
                return state.filter(todo => !action.payload.includes(todo.id));
            });
    }
})

export const { todoAdded, todoToggled, clearCompleted } = todosSlice.actions
export default todosSlice.reducer