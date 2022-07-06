import React, { FunctionComponent, ReactElement, useState } from 'react';
import { Button, CardGroup, Col, Container, Row } from 'react-bootstrap';
import { ToDoItemTypeLabels, ToDoItemTypes } from '../../../../shared/constants';
import { ToDoItem } from '../../../../shared/types';
import PlannerItem from '../PlannerItem/PlannerItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';

export type SwimLaneProps = {
    laneContents?: Array<ToDoItem>;
    laneType: ToDoItemTypes;
};

const SwimLane: FunctionComponent<SwimLaneProps> = (props: SwimLaneProps): ReactElement => {
    const { laneContents, laneType } = props;

    return (
        <>
            <Container>
                <Row className='g-1'>
                    <Col>
                        <h1>{ToDoItemTypeLabels[laneType]}</h1>
                        <span className='max-width'>
                            <Button><FontAwesomeIcon icon={faSquarePlus} /></Button>
                        </span>
                    </Col>
                    <CardGroup>
                        {laneContents?.map((item:  ToDoItem) =>
                            <PlannerItem
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