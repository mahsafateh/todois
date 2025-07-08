import { db } from './firebaseConfig';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, query, where, QueryDocumentSnapshot } from "firebase/firestore";
import { Todo } from '@/types/todo';

const todosCollection = collection(db, "todos");

export const fetchTodos = async (userId: string): Promise<Todo[]> => {
  try {
    const q = query(todosCollection, where("userId", "==", userId));
    const data = await getDocs(q);
    return data.docs.map((doc: QueryDocumentSnapshot) => ({ 
      id: doc.id,
      text: doc.data().text || doc.data().task || '',
      completed: doc.data().completed || false,
      createdAt: doc.data().createdAt || Date.now(),
      updatedAt: doc.data().updatedAt || Date.now(),
      userId: doc.data().userId || userId
    }));
  } catch (error) {
    console.error("Error fetching todos:", error);
    return [];
  }
};

export const addTodoToServer = async (todo: Omit<Todo, 'id'>, userId: string): Promise<string | null> => {
  try {
    const docRef = await addDoc(todosCollection, { 
      text: todo.text, 
      completed: todo.completed, 
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
      userId: userId 
    });
    return docRef.id; // Firebase auto-generated ID
  } catch (error) {
    console.error("Error adding todo:", error);
    return null;
  }
};

export const updateTodoInServer = async (id: string, updates: Partial<Todo>): Promise<boolean> => {
  try {
    const todoDoc = doc(db, 'todos', id);
    await updateDoc(todoDoc, updates);
    return true;
  } catch (error) {
    console.error("Error updating todo:", error);
    return false;
  }
};

export const deleteTodoFromServer = async (id: string): Promise<boolean> => {
  try {
    const todoDoc = doc(db, 'todos', id);
    await deleteDoc(todoDoc);
    return true;
  } catch (error) {
    console.error("Error deleting todo:", error);
    return false;
  }
};

export const clearCompletedTodosFromServer = async (todoIds: string[]): Promise<boolean> => {
  try {
    const deletePromises = todoIds.map(id => deleteDoc(doc(db, 'todos', id)));
    await Promise.all(deletePromises);
    return true;
  } catch (error) {
    console.error("Error clearing completed todos:", error);
    return false;
  }
};