import React, { FunctionComponent, ReactElement, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { ToDoItemTypes } from '../../../../shared/constants';
import { ToDoItem } from '../../../../shared/types';
import SwimLane from '../SwimLane/SwimLane';

export type ToDoBoardProps = {
    todoList?: Array<ToDoItem>;
    inProgressList?: Array<ToDoItem>;
    doneList?: Array<ToDoItem>;
};

const ToDoBoard: FunctionComponent<ToDoBoardProps> = (props: ToDoBoardProps): ReactElement => {
    const { todoList, inProgressList, doneList } = props;

    // There are currently only 3 swimlanes
    const [todoLane, setTodoLane] = useState<Array<ToDoItem>>(todoList || []);
    const [inProgressLane, setInProgressLane] = useState<Array<ToDoItem>>(inProgressList || []);
    const [doneLane, setDoneLane] = useState<Array<ToDoItem>>(doneList || []);

    return (
        <>
            <Container>
                <Row span='12'>
                    <Col span='4' className='swimlane-container margin-left-sm margin-right-sm'>
                        <SwimLane
                            laneContents={todoLane}
                            laneType={ToDoItemTypes.ToDo} />
                    </Col>
                    <Col span='4' className='swimlane-container margin-left-sm margin-right-sm'>
                        <SwimLane
                            laneContents={inProgressLane}
                            laneType={ToDoItemTypes.InProgress} />
                    </Col>
                    <Col span='4' className='swimlane-container margin-left-sm margin-right-sm'>
                        <SwimLane
                            laneContents={doneLane}
                            laneType={ToDoItemTypes.Done} />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ToDoBoard;