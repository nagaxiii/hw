import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose, Dispatch } from 'redux';
import { GlossaryState } from './reducer';
import { Entry, add, destroy, fetch, update, suggest, Translation } from './actions';
import { EditableEntry } from './EditableEntry';

interface PropsFromDispatch {
    add: typeof add;
    destroy: typeof destroy;
    fetch: typeof fetch;
    update: typeof update;
    suggest: typeof suggest;
}

interface PropsFromState {
    entries: Entry[];
    suggestions: Translation[];
}

export interface Props {}
export interface State {
    english: string;
    german: string;
}

export class App extends React.Component<Props & PropsFromDispatch & PropsFromState, State> {
    readonly state: State = {
        english: '',
        german: ''
    };
    handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            [event.currentTarget.name]: event.currentTarget.value
        } as Pick<State, keyof State>);
    };

    handleAdd = () => {
        this.props.add(this.state as Entry);
        this.setState({ english: '', german: '' });
    };

    handleSuggestionClick = (suggestion: Translation) => {
        this.setState({
            german: suggestion.phrase.text
        });
    };

    render = () => {
        return (
            <table>
                <thead>
                    <tr>
                        <th colSpan={3}>Glossary</th>
                    </tr>
                    <tr>
                        <th>English</th>
                        <th>German</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={3}>
                            <button onClick={() => this.props.fetch()}>Fetch</button>
                        </td>
                    </tr>
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
                            <button onClick={() => this.props.suggest(this.state as Entry)}>Suggest</button>
                            <button onClick={this.handleAdd}>Add</button>
                        </td>
                    </tr>
                    {this.props.suggestions && (
                        <tr>
                            <td colSpan={3}>
                                {this.props.suggestions.map((suggestion, i) => {
                                    return (
                                        <span key={i} onClick={() => this.handleSuggestionClick(suggestion)}>
                                            {suggestion.phrase.text}
                                        </span>
                                    );
                                })}
                            </td>
                        </tr>
                    )}
                    {this.props.entries.map(entry => (
                        <EditableEntry
                            key={entry._id}
                            entry={entry}
                            update={this.props.update}
                            destroy={this.props.destroy}
                        />
                    ))}
                </tbody>
            </table>
        );
    };
}

const mapStateToProps = (state: GlossaryState) => {
    return {
        entries: state.data,
        suggestions: state.suggestions
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            add,
            fetch,
            destroy,
            update,
            suggest
        },
        dispatch
    );
};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(App);
