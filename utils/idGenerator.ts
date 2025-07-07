import { nanoid } from 'nanoid';
import {Todo} from "@/types/todo";

/**
 * ID Generation Strategies for Todo Items
 */

// Strategy 1: Nanoid (Recommended for client-side generation)
export const generateNanoid = (): string => {
    return nanoid(21); // 21 characters, URL-safe, collision-resistant
};

// Strategy 2: Timestamp + Random (Good for sorting and uniqueness)
export const generateTimestampId = (): string => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    return `${timestamp}-${random}`;
};

// Strategy 3: UUID v4 (Standard but longer)
export const generateUUID = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

// Strategy 4: Firebase Auto-ID (Let Firebase generate it)
export const generateFirebaseId = (): string => {
    // This will be replaced by Firebase's auto-generated ID
    // We use a temporary ID that will be updated after server response
    return `temp-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

// Recommended approach: Use nanoid for client-side, Firebase auto-ID for server
export const generateTodoId = (): string => {
    return generateNanoid();
};

// Create a complete todo object with proper timestamps
export const createTodoObject = (text: string, userId: string): Omit<Todo, 'id'> => {
    const now = Date.now();
    return {
        text: text.trim(),
        completed: false,
        createdAt: now,
        updatedAt: now,
        userId
    };
}; 