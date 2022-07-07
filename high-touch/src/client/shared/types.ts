import { ToDoItemTypes } from "./constants";

export type ToDoItem = {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    dueDate: string;
    status: ToDoItemTypes;
};