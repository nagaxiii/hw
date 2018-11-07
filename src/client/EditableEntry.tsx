import * as React from 'react';
import Button from '@material-ui/core/Button';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import { Entry } from './actions';

export interface Props {
    entry: Entry;
    update(entry: Entry): void;
    destroy(entry: Entry): void;
}

interface State {
    readonly isEditing: boolean;
    readonly english: string;
    readonly german: string;
}

export class EditableEntry extends React.Component<Props, State> {
    readonly state: State = {
        isEditing: false,
        english: '',
        german: ''
    };

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [event.currentTarget.name]: event.currentTarget.value
        } as Pick<State, Exclude<keyof State, 'isEditing'>>);
    };

    handleSelect = () => {
        this.setState(state => ({
            isEditing: !state.isEditing,
            english: this.props.entry.english,
            german: this.props.entry.german
        }));
    };

    handleUpdate = (entry: Entry) => {
        this.props.update(this.mergeChanges(entry));
        this.setState(state => ({ isEditing: !state.isEditing }));
    };

    mergeChanges = (entry: Entry): Entry => {
        const { english, german } = this.state;
        return { _id: entry._id, english, german } as Entry;
    };

    render() {
        const { entry } = this.props;
        const { isEditing, english, german } = this.state;

        return (
            <TableRow>
                <TableCell>
                    <TextField
                        type="text"
                        name="english"
                        value={isEditing ? english : entry.english}
                        onChange={this.handleInputChange}
                        margin="normal"
                        disabled={!isEditing}
                    />
                </TableCell>
                <TableCell>
                    <TextField
                        type="text"
                        name="german"
                        value={isEditing ? german : entry.german}
                        onChange={this.handleInputChange}
                        margin="normal"
                        disabled={!isEditing}
                    />
                </TableCell>
                <TableCell>
                    {isEditing && <Button onClick={() => this.handleUpdate(entry)}>Update</Button>}
                    {isEditing && <Button onClick={this.handleSelect}>Cancel</Button>}
                    {!isEditing && <Button onClick={this.handleSelect}>Edit</Button>}
                    {!isEditing && <Button onClick={() => this.props.destroy(entry)}>Delete</Button>}
                </TableCell>
            </TableRow>
        );
    }
}
