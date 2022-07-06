export enum ToDoItemTypes {
    ToDo,
    InProgress,
    Done,
};

export const ToDoItemTypeMapping: Record<ToDoItemTypes, string> = {
    [ToDoItemTypes.ToDo]: 'secondary',
    [ToDoItemTypes.InProgress]: 'primary',
    [ToDoItemTypes.Done]: 'success',
};

export const ToDoItemTypeLabels: Record<ToDoItemTypes, string> = {
    [ToDoItemTypes.ToDo]: 'To Do',
    [ToDoItemTypes.InProgress]: 'In Progress',
    [ToDoItemTypes.Done]: 'Done',
};