import { ToDoItemTypes } from "./constants";

export type ToDoItem = {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    status: ToDoItemTypes;
};