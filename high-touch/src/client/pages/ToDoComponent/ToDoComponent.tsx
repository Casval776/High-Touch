import React, { FunctionComponent, ReactElement } from 'react';
import { ToDoItemTypes } from '../../shared/constants';
import { getRandomId } from '../../shared/helpers';
import { ToDoItem } from '../../shared/types';
import ToDoBoard from './components/ToDoBoard/ToDoBoard';

export type ToDoComponentProps = {

};

const ToDoComponent: FunctionComponent<ToDoComponentProps> = (props: ToDoComponentProps): ReactElement => {
    const defineDefaultDataToDo = (): Array<ToDoItem> => {
        return [{
            id: getRandomId(),
            completed: false,
            description: 'description',
            dueDate: (new Date()).toString(),
            title: 'titleffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
            status: ToDoItemTypes.ToDo,
        }];
    };

    const defineDefaultDataInProgress = (): Array<ToDoItem> => {
        return [{
            id: getRandomId(),
            completed: false,
            description: 'description',
            dueDate: (new Date()).toString(),
            title: 'title',
            status: ToDoItemTypes.InProgress,
        }];
    };

    const defineDefaultDataDone = (): Array<ToDoItem> => {
        return [{
            id: getRandomId(),
            completed: false,
            description: 'description',
            dueDate: (new Date()).toString(),
            title: 'title',
            status: ToDoItemTypes.Done,
        }];
    };

    return (
        <>
            <ToDoBoard
                todoList={defineDefaultDataToDo()}
                inProgressList={defineDefaultDataInProgress()}
                doneList={defineDefaultDataDone()} />
        </>
    );
};

export default ToDoComponent