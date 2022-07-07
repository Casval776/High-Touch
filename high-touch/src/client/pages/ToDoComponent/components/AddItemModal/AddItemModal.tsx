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
    laneType: ToDoItemTypes;
    addItemHandler: (item: ToDoItem) => void;
    closeMe: () => void;
};

const AddItemModal: FunctionComponent<AddItemModalProps> = (props: AddItemModalProps): ReactElement => {
    const { isOpen, laneType, addItemHandler, closeMe } = props;

    // Consts
    const getDefaultDueDate = (): Date =>  new Date(moment().add(1, 'd').toString());

    // State
    const [newTitle, setNewTitle] = useState<string>('');
    const [newDesc, setNewDesc] = useState<string>('');
    const [newDueDate, setNewDueDate] = useState<Date | null>(null);
    const [newStatus, setNewStatus] = useState<ToDoItemTypes>(laneType);


    const handleStatusSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
        // Retrieve value from event
        const targetStatus: string = event.target.value;

        // Reference enum by index, since it transpiles down into its index anyway
        const index = Object.values(ToDoItemTypes).indexOf(targetStatus);

        setNewStatus(index);
    };

    const addNewItem = (): void => {
        const newItem: ToDoItem = {
            description: newDesc,
            dueDate: moment(newDueDate).toISOString(),
            id: getRandomId(),
            status: newStatus,
            title: newTitle,
        };

        addItemHandler(newItem);
    };

    const isAddDisabled = (): boolean => {
        // Check whether fields are valid
        let disabled: boolean = false;

        if (newTitle.trim() === '') disabled = true;
        if (newDesc.trim() === '') disabled = true;
        if (newDueDate === null) disabled = true;

        // Note: This doesn't work because of how enums are setup
        // They don't have concrete values so they're effectively integers
        // We can't do javascript style is true checks off integers and logical not's
        // if (!newStatus) disabled = true;

        return disabled;
    }

    const getSelectSection = (): JSX.Element => {
        const selectOptions: Array<JSX.Element> = Object.keys(ToDoItemTypeLabels).map((key: string, index: number) => {
            const enumKey: string = ToDoItemTypes[Number(key)];

            // Use the key as the value, that being the enum
            return <option value={enumKey} key={`${key}-${index}`}>
                {ToDoItemTypeLabels[key as unknown as ToDoItemTypes]}
            </option>
        });

        return (
        <select id='todo-status' onChange={(event) => handleStatusSelection(event)} defaultValue={ToDoItemTypes[laneType]}>
            {selectOptions}
        </select>);
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
                    <h1>Add {ToDoItemTypeLabels[laneType]} Item</h1>
                </div>
                <div slot='body' className='todo-modal-body pad-top-md'>
                    <span className='subtext danger-text'>All fields are required</span>
                    <label htmlFor='todo-title' className='pad-top-sm'>Name</label>
                    <input id='todo-title' type='text' value={newTitle} onChange={(event) => setNewTitle(event.target.value)} />

                    <label htmlFor='todo-description' className='pad-top-sm'>Description</label>
                    <input id='todo-description' type='text' value={newDesc} onChange={(event) => setNewDesc(event.target.value)} />

                    <label htmlFor='todo-due-date' className='pad-top-sm'>Due Date</label>
                    <ReactDatePicker 
                        id='todo-due-date'
                        selected={newDueDate}
                        allowSameDay={false}
                        onChange={(date) => setNewDueDate(date)}
                        minDate={getDefaultDueDate()} />

                    <label htmlFor='todo-status' className='pad-top-sm'>Status</label>
                    {getSelectSection()}
                </div>
                <div slot='footer' className='max-width todo-modal-footer'>
                    <Button className='margin-right-sm float-right' onClick={() => closeMe()}>Close</Button>
                    <Button 
                        className='margin-right-sm float-right'
                        disabled={isAddDisabled()}
                        onClick={() => addNewItem()}>
                            Add
                        </Button>
                </div>
            </Modal>
        </>
    );
};

export default AddItemModal;