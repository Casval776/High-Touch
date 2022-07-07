import { FunctionComponent, ReactElement, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Types
import { ToDoItemTypes } from '../../../../shared/constants';
import { ToDoItem } from '../../../../shared/types';

// Components
import SwimLane from '../SwimLane/SwimLane';
import AddItemModal from '../AddItemModal/AddItemModal';

export type ToDoBoardProps = {
    todoList?: Array<ToDoItem>;
    inProgressList?: Array<ToDoItem>;
    doneList?: Array<ToDoItem>;
};

const ToDoBoard: FunctionComponent<ToDoBoardProps> = (props: ToDoBoardProps): ReactElement => {
    // Props
    const { todoList, inProgressList, doneList } = props;

    // State
    // There are currently only 3 swimlanes
    const [todoLane, setTodoLane] = useState<Array<ToDoItem>>(todoList || []);
    const [inProgressLane, setInProgressLane] = useState<Array<ToDoItem>>(inProgressList || []);
    const [doneLane, setDoneLane] = useState<Array<ToDoItem>>(doneList || []);

    // Toggles the add modal
    const [isAddOpen, setIsAddOpen] = useState<boolean>(false);

    // Designates target lane for add modal
    const [addItemLane, setAddItemLane] = useState<ToDoItemTypes>(ToDoItemTypes.ToDo);

    // Adds the provided item to the designated state array
    const addItemToLane = (changedItem: ToDoItem, targetLane: ToDoItemTypes): void => {
        // Change the status of the changed item
        changedItem.status = targetLane;
        // Determine which list we need to add the item to
        switch(targetLane) {
            case ToDoItemTypes.Done: 
                let doneLaneClone: Array<ToDoItem> = [ ...doneLane ];
                doneLaneClone.push(changedItem);
                setDoneLane(doneLaneClone);
                break;
            case ToDoItemTypes.InProgress:
                let inProgressLaneClone: Array<ToDoItem> = [ ...inProgressLane ];
                inProgressLaneClone.push(changedItem);
                setInProgressLane(inProgressLaneClone);
                break;
            case ToDoItemTypes.ToDo:
                let todoLaneClone: Array<ToDoItem> = [ ...todoLane ];
                todoLaneClone.push(changedItem);
                setTodoLane(todoLaneClone);
                break;
        }
    };

    const removeItemFromLane = (removedItem: ToDoItem, sourceLane: ToDoItemTypes): void => {
        // Determine which list we need to remove the item from
        switch(removedItem.status) {
            case ToDoItemTypes.Done:
                // Deep clone array so we don't modify by ref
                // This happens after transpiling a lot
                const doneLaneClone: Array<ToDoItem> = 
                    [ ...doneLane ].filter((doneItem: ToDoItem) => doneItem.id !== removedItem.id);

                // Remove it from the original lane
                setDoneLane(doneLaneClone);
                break;
            case ToDoItemTypes.InProgress:
                // Deep clone array so we don't modify by ref
                // This happens after transpiling a lot
                const inProgressLaneClone: Array<ToDoItem> = 
                    [ ...inProgressLane ].filter((doneItem: ToDoItem) => doneItem.id !== removedItem.id);

                // Remove it from the original lane
                setInProgressLane(inProgressLaneClone);
                break;
            case ToDoItemTypes.ToDo:
                // Deep clone array so we don't modify by ref
                // This happens after transpiling a lot
                const todoLaneClone: Array<ToDoItem> = 
                    [ ...todoLane ].filter((doneItem: ToDoItem) => doneItem.id !== removedItem.id);

                // Remove it from the original lane
                setTodoLane(todoLaneClone);
                break;
            default:
                console.log('how did you even do this stop it');
                break;
        }
    };

    const dragDropHandler = (changedItem: ToDoItem, targetLane: ToDoItemTypes): void => {
        // Remove
        removeItemFromLane(changedItem, targetLane);

        // Add
        addItemToLane(changedItem, targetLane);
    };

    const openModalHandler = (lane: ToDoItemTypes): void => {
        setIsAddOpen(true);
        setAddItemLane(lane);
    };

    return (
        <>
            <Container>
                <Row span='12'>
                    <Col span='4' className='margin-left-sm margin-right-sm'>
                        <DndProvider backend={HTML5Backend}>
                        <SwimLane
                            openModal={openModalHandler}
                            removeHandler={removeItemFromLane}
                            dropHandler={dragDropHandler}
                            laneContents={todoLane}
                            laneType={ToDoItemTypes.ToDo} />
                        </DndProvider>
                    </Col>
                    <Col span='4' className='margin-left-sm margin-right-sm'>
                        <DndProvider backend={HTML5Backend}>
                        <SwimLane
                            openModal={openModalHandler}
                            removeHandler={removeItemFromLane}
                            dropHandler={dragDropHandler}
                            laneContents={inProgressLane}
                            laneType={ToDoItemTypes.InProgress} />
                            </DndProvider>
                    </Col>
                    <Col span='4' className='margin-left-sm margin-right-sm'>
                        <DndProvider backend={HTML5Backend}>
                        <SwimLane
                            openModal={openModalHandler}
                            removeHandler={removeItemFromLane}
                            dropHandler={dragDropHandler}
                            laneContents={doneLane}
                            laneType={ToDoItemTypes.Done} />
                            </DndProvider>
                    </Col>
                </Row>
            </Container>
            {isAddOpen &&
            <AddItemModal 
                isOpen={isAddOpen}
                laneType={addItemLane}
                addItemHandler={(item: ToDoItem) => {
                    addItemToLane(item, item.status);
                    setIsAddOpen(false);
                }}
                closeMe={() => setIsAddOpen(false)}/>}
        </>
    );
};

export default ToDoBoard;