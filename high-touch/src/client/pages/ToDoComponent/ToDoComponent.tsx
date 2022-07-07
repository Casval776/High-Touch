import { FunctionComponent, ReactElement, useEffect, useState } from 'react';

// Types
import { ToDoItem } from '../../shared/types';

// Components
import ToDoBoard from './components/ToDoBoard/ToDoBoard';

export type ToDoComponentProps = {

};

// The purpose of this component would be to retrieve/persist data over network calls
const ToDoComponent: FunctionComponent<ToDoComponentProps> = (props: ToDoComponentProps): ReactElement => {
    const [todoLane, setTodoLane] = useState<Array<ToDoItem>>([]);
    const [inProgressLane, setInProgressLane] = useState<Array<ToDoItem>>([]);
    const [doneLane, setDoneLane] = useState<Array<ToDoItem>>([]);

    const loadData = (): void => {
        // I'd make API calls here
    };

    const saveDate = (): void => {
        // I'd persist data here
    };

    useEffect(() => {
        // Fetch!
        loadData();
    }, []);

    return (
        <>
            <ToDoBoard
                todoList={todoLane}
                inProgressList={inProgressLane}
                doneList={doneLane} />
        </>
    );
};

export default ToDoComponent