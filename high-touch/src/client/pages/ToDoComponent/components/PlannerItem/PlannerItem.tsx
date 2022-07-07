import { faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { FunctionComponent, ReactElement } from 'react';
import { Card } from 'react-bootstrap';
import { useDrag } from 'react-dnd';

// Types
import { ToDoItemTypeMapping, ToDoItemTypes } from '../../../../shared/constants';
import { ToDoItem } from '../../../../shared/types';

export type ToDoProps = {
    removeHandler: (item: ToDoItem) => void;
    isDeleteMode: boolean;
    contents: ToDoItem;
    itemType: ToDoItemTypes;
};

const PlannerItem: FunctionComponent<ToDoProps> = (props: ToDoProps): ReactElement => {
    const { removeHandler, isDeleteMode, contents, itemType } = props;
    const [{ isDragging }, dragRef] = useDrag({
        type: 'plannerItem',
        item: contents,
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });

    return (
        <>
            <Card
                ref={dragRef} 
                border={ToDoItemTypeMapping[itemType]} 
                className={`margin-bottom-sm rounded-corners${isDragging ? 'is-being-dragged': ''}`}>
                <Card.Header>
                    {contents.title} - {contents.id}
                    {isDeleteMode && 
                    <a href='' className='float-right' onClick={() => removeHandler(contents)}>
                        <span className='full-width'><FontAwesomeIcon icon={faSquareXmark} /></span>
                    </a>}
                </Card.Header>
                <Card.Body>
                    <Card.Text>{contents.description}</Card.Text>
                </Card.Body>
                <Card.Footer className='text-muted'>{moment(new Date(contents.dueDate)).format('MM/DD/yyyy')}</Card.Footer>
            </Card>
        </>
    );
};

export default PlannerItem;