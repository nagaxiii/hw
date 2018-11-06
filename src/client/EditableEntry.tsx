import * as React from 'react';
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

    handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
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

    renderStaticEntry = (entry: Entry) => {
        return (
            <tr>
                <td>{entry.english}</td>
                <td>{entry.german}</td>
                <td>
                    <button onClick={this.handleSelect}>Edit</button>
                    <button onClick={() => this.props.destroy(entry)}>Delete</button>
                </td>
            </tr>
        );
    };

    renderDynamicEntry = (entry: Entry) => {
        return (
            <tr>
                <td>
                    <input
                        type="text"
                        value={this.state.english}
                        name="english"
                        placeholder="English part"
                        onChange={e => this.handleInputChange(e)}
                    />
                </td>
                <td>
                    <input
                        type="text"
                        value={this.state.german}
                        name="german"
                        placeholder="German part"
                        onChange={e => this.handleInputChange(e)}
                    />
                </td>
                <td>
                    <button onClick={() => this.handleUpdate(entry)}>Update</button>
                    <button onClick={this.handleSelect}>Cancel</button>
                </td>
            </tr>
        );
    };

    render() {
        const { entry } = this.props;

        return this.state.isEditing ? this.renderDynamicEntry(entry) : this.renderStaticEntry(entry);
    }
}
