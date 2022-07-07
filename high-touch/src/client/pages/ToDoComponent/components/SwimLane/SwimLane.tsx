import { FunctionComponent, ReactElement, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import { useDrop } from 'react-dnd';

// Types
import { ToDoItemTypeLabels, ToDoItemTypes } from '../../../../shared/constants';
import { ToDoItem } from '../../../../shared/types';

// Components
import PlannerItem from '../PlannerItem/PlannerItem';

export type SwimLaneProps = {
    openModal: () => void;
    dropHandler: (changedItem: ToDoItem, targetLane: ToDoItemTypes) => void;
    removeHandler: (item: ToDoItem, sourceLane: ToDoItemTypes) => void;
    laneContents?: Array<ToDoItem>;
    laneType: ToDoItemTypes;
};

const SwimLane: FunctionComponent<SwimLaneProps> = (props: SwimLaneProps): ReactElement => {
    const { openModal, dropHandler, removeHandler, laneContents, laneType } = props;
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
                <Row>
                    <Col>
                        <h1>{ToDoItemTypeLabels[laneType]}</h1>
                        <span className='max-width'>
                            <Button onClick={() => openModal()}><FontAwesomeIcon icon={faSquarePlus} /></Button>
                            &nbsp;
                            <Button onClick={() => setIsDeleteMode(!isDeleteMode)}><FontAwesomeIcon icon={faSquareXmark} /></Button>
                        </span>
                    </Col>
                    <Row className='g-1' xs={1} md={1} lg={1}>
                        {laneContents?.map((item:  ToDoItem) =>
                            <PlannerItem
                                key={item.id}
                                removeHandler={notifyParentOfRemove}
                                isDeleteMode={isDeleteMode}
                                contents={item}
                                itemType={laneType} />
                        )}
                    </Row>
                </Row>
            </Container>
        </>
    );
};

export default SwimLane;