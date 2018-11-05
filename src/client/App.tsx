import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose, Dispatch } from 'redux';
import { GloassaryState } from './reducer';
import { fetch, destroy, add, Entry, update } from './actions';

interface PropsFromDispatch {
    add: typeof add;
    destroy: typeof destroy;
    fetch: typeof fetch;
    update: typeof update;
}

interface PropsFromState {
    entries: Entry[];
}

export interface AppProps {}
export interface AppState {
    english: string;
    german: string;
}

export class App extends React.Component<AppProps & PropsFromDispatch & PropsFromState, AppState> {
    readonly state: AppState = {
        english: '',
        german: ''
    };
    handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            [event.currentTarget.name]: event.currentTarget.value
        } as Pick<AppState, keyof AppState>);
    };

    handleAdd = () => {
        this.props.add(this.state as Entry);
        this.setState({ english: '', german: '' });
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
                            <button onClick={this.handleAdd}>Add</button>
                        </td>
                    </tr>

                    {this.props.entries.map(entry => {
                        return (
                            <tr key={entry._id}>
                                <td>{entry.english}</td>
                                <td>{entry.german}</td>
                                <td>
                                    <button onClick={() => this.props.update(entry)}>Edit</button>
                                    <button onClick={() => this.props.destroy(entry)}>Delete</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    };
}

const mapStateToProps = (state: GloassaryState) => {
    return {
        entries: state.data
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            add,
            fetch,
            destroy,
            update
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
