import moment from 'moment';
import React, { FunctionComponent, ReactElement } from 'react';
import { Card } from 'react-bootstrap';
import { ToDoItemTypeMapping, ToDoItemTypes } from '../../../../shared/constants';
import { ToDoItem } from '../../../../shared/types';

export type ToDoProps = {
    contents: ToDoItem;
    itemType: ToDoItemTypes;
};

const PlannerItem: FunctionComponent<ToDoProps> = (props: ToDoProps): ReactElement => {
    const { contents, itemType } = props;

    return (
        <>
            <Card border={ToDoItemTypeMapping[itemType]} className='margin-bottom-sm rounded-corners'>
                <Card.Header>{contents.title}</Card.Header>
                <Card.Body>
                    <Card.Text>{contents.description}</Card.Text>
                </Card.Body>
                <Card.Footer className='text-muted'>{moment(new Date(contents.dueDate)).format('MM/DD/yyyy')}</Card.Footer>
            </Card>
        </>
    );
};

export default PlannerItem;