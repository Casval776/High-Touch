import React, { FunctionComponent, ReactElement, useState } from 'react';
import { Button, CardGroup, Col, Container, Row } from 'react-bootstrap';
import { ToDoItemTypeLabels, ToDoItemTypes } from '../../../../shared/constants';
import { ToDoItem } from '../../../../shared/types';
import PlannerItem from '../PlannerItem/PlannerItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import { useDrop } from 'react-dnd';

export type SwimLaneProps = {
    dropHandler: (changedItem: ToDoItem, targetLane: ToDoItemTypes) => void;
    removeHandler: (item: ToDoItem, sourceLane: ToDoItemTypes) => void;
    laneContents?: Array<ToDoItem>;
    laneType: ToDoItemTypes;
};

const SwimLane: FunctionComponent<SwimLaneProps> = (props: SwimLaneProps): ReactElement => {
    const { dropHandler, removeHandler, laneContents, laneType } = props;
    const [isDeleteMode, setIsDeleteMode] = useState<boolean>(false);
    const [{ isDrop }, dropRef] = useDrop({
        accept: 'plannerItem',
        drop: (plannerItem: ToDoItem) => notifyParentOfDrop(plannerItem),
        collect: (monitor) => ({
            isDrop: monitor.isOver()
        })
    });

    const notifyParentOfDrop = (item: ToDoItem): void => {
        // Sanity check
        if (item.status !== laneType) {
            // Notify the parent to update its state and re-render
            dropHandler(item, laneType);
        }
    };

    const notifyParentOfRemove = (item: ToDoItem): void => removeHandler(item, laneType);

    return (
        <>
            <Container ref={dropRef} className={`swimlane-container${isDrop ? 'dropBlink' : ''}`}>
                <Row className='g-1'>
                    <Col>
                        <h1>{ToDoItemTypeLabels[laneType]}</h1>
                        <span className='max-width'>
                            <Button><FontAwesomeIcon icon={faSquarePlus} /></Button>
                            &nbsp;
                            <Button onClick={() => setIsDeleteMode(!isDeleteMode)}><FontAwesomeIcon icon={faSquareXmark} /></Button>
                        </span>
                    </Col>
                    <CardGroup>
                        {laneContents?.map((item:  ToDoItem) =>
                            <PlannerItem
                                key={item.id}
                                removeHandler={notifyParentOfRemove}
                                isDeleteMode={isDeleteMode}
                                contents={item}
                                itemType={laneType} />
                        )}
                    </CardGroup>
                </Row>
            </Container>
        </>
    );
};

export default SwimLane;