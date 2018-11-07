import * as React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import { Entry, Translation, add, suggest } from './actions';

export interface Props {
    add: typeof add;
    suggest: typeof suggest;
    suggestions: Translation[];
}

interface State {
    readonly english: string;
    readonly german: string;
}

export class CreateEntry extends React.Component<Props, State> {
    readonly state: State = {
        english: '',
        german: ''
    };

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

    renderSuggestions = () => {
        const { suggestions } = this.props;
        if (!suggestions) return null;
        return (
            <Grid item xs={12}>
                {suggestions.map((suggestion, i) => {
                    return (
                        <Chip
                            key={i}
                            onClick={() => this.handleSuggestionClick(suggestion)}
                            label={suggestion.phrase.text}
                            clickable
                        />
                    );
                })}
            </Grid>
        );
    };

    render() {
        const { english, german } = this.state;

        return (
            <React.Fragment>
                <Grid item xs={4}>
                    <TextField
                        type="text"
                        name="english"
                        label="English"
                        value={english}
                        onChange={this.handleInputChange}
                        margin="normal"
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        type="text"
                        name="german"
                        label="German"
                        value={german}
                        onChange={this.handleInputChange}
                        margin="normal"
                    />
                </Grid>
                <Grid item xs={4}>
                    <Button onClick={() => this.props.suggest(this.state as Entry)}>Suggest</Button>
                    <Button onClick={this.handleAdd}>Add</Button>
                </Grid>
                {this.renderSuggestions()}
            </React.Fragment>
        );
    }
}
