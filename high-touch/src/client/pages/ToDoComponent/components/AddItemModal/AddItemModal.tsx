import moment from 'moment';
import React, { FunctionComponent, ReactElement, useState } from 'react';
import { Button } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import Modal from 'react-modal';

// Types
import { ToDoItemTypeLabels, ToDoItemTypes } from '../../../../shared/constants';
import { getRandomId } from '../../../../shared/helpers';
import { ToDoItem } from '../../../../shared/types';

export type AddItemModalProps = {
    isOpen: boolean;
    addItemHandler: (item: ToDoItem) => void;
    closeMe: () => void;
};

const AddItemModal: FunctionComponent<AddItemModalProps> = (props: AddItemModalProps): ReactElement => {
    const { isOpen, addItemHandler, closeMe } = props;

    // State
    const [newTitle, setNewTitle] = useState<string>('');
    const [newDesc, setNewDesc] = useState<string>('');
    const [newDueDate, setNewDueDate] = useState<Date | null>(null);
    const [newStatus, setNewStatus] = useState<ToDoItemTypes>(ToDoItemTypes.ToDo);

    const getDefaultDueDate = (): Date =>  new Date(moment().add(1, 'd').toString());

    const handleStatusSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
        // Retrieve value from event
        const targetStatus: string = event.target.value;

        // Reference enum by index, since it transpiles down into its index anyway
        const index = Object.values(ToDoItemTypes).indexOf(targetStatus);

        setNewStatus(index);
    };

    const addNewItem = (): void => {
        const newItem: ToDoItem = {
            completed: false,
            description: newDesc,
            dueDate: moment(newDueDate).toISOString(),
            id: getRandomId(),
            status: newStatus,
            title: newTitle,
        };

        addItemHandler(newItem);
    };

    return (
        <>
        <Modal
            // I don't like doing this but it seems like there's no way to simply add
            // a class to this component without overwriting defaults
            // RIP
            style={{
                content: {
                    width: '40%',
                    height: '65%',
                    marginLeft: '30%',
                    marginRight: '40%',
                }
            }}
            isOpen={isOpen}>
                <div slot='header' className='todo-modal-header'>
                    <h1>Add ToDo Item</h1>
                </div>
                <div slot='body' className='todo-modal-body pad-top-md'>
                    <label htmlFor='todo-title'>Name</label>
                    <input id='todo-title' type='text' value={newTitle} onChange={(event) => setNewTitle(event.target.value)} />

                    <label htmlFor='todo-description' className='pad-top-sm'>Description</label>
                    <input id='todo-description' type='text' value={newDesc} onChange={(event) => setNewDesc(event.target.value)} />

                    <label htmlFor='todo-due-date' className='pad-top-sm'>Due Date (optional)</label>
                    <ReactDatePicker 
                        id='todo-due-date'
                        selected={newDueDate}
                        allowSameDay={false}
                        onChange={(date) => setNewDueDate(date)}
                        minDate={getDefaultDueDate()} />

                    <label htmlFor='todo-status' className='pad-top-sm'>Status</label>
                    <select id='todo-status' onChange={(event) => handleStatusSelection(event)}>
                        {
                            // Iterate over the keys of the record
                            Object.keys(ToDoItemTypeLabels).map((key: string) => {
                                const enumKey: string = ToDoItemTypes[Number(key)];
                                console.log(enumKey);
                                // Use the key as the value, that being the enum
                                return <option value={enumKey}>
                                    {ToDoItemTypeLabels[key as unknown as ToDoItemTypes]}
                                </option>
                            })
                        }
                    </select>
                </div>
                <div slot='footer' className='max-width todo-modal-footer'>
                    <Button className='margin-right-sm float-right' onClick={() => closeMe()}>Close</Button>
                    <Button className='margin-right-sm float-right' onClick={() => addNewItem()}>Add</Button>
                </div>
            </Modal>
        </>
    );
};

export default AddItemModal;