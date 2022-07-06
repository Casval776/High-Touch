import React, { FunctionComponent, ReactElement } from 'react';
import { ToDoItem } from '../../shared/types';
import ToDoBoard from './components/ToDoBoard/ToDoBoard';

export type ToDoComponentProps = {

};

const ToDoComponent: FunctionComponent<ToDoComponentProps> = (props: ToDoComponentProps): ReactElement => {
    const defineDefaultData = (): Array<ToDoItem> => {
        return [{
            completed: false,
            description: 'description',
            dueDate: (new Date).toString(),
            title: 'title',
        }];
    };

    return (
        <>
            <ToDoBoard
                todoList={defineDefaultData()}
                inProgressList={defineDefaultData()}
                doneList={defineDefaultData()} />
        </>
    );
};

export default ToDoComponent