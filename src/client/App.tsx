import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose, Dispatch } from 'redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import { GlossaryState } from './reducer';
import { Entry, add, destroy, fetch, update, suggest, Translation } from './actions';
import { EditableEntry } from './EditableEntry';
import { CreateEntry } from './CreateEntry';
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

export interface Props extends WithStyles<typeof styles> {}
export interface State {}

export class App extends React.Component<Props & PropsFromDispatch & PropsFromState, State> {
    render = () => {
        const { classes, entries, add, update, destroy, suggest, suggestions } = this.props;
        return (
            <React.Fragment>
                <CssBaseline />
                <div className={classes.root}>
                    <Grid container spacing={16}>
                        <Grid item xs={12}>
                            <Typography component="h2" variant="h1" gutterBottom>
                                Glossary
                            </Typography>
                        </Grid>
                        <CreateEntry suggest={suggest} add={add} suggestions={suggestions} />
                        <Grid item xs={12}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>English</TableCell>
                                        <TableCell>German</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {entries.map(entry => (
                                        <EditableEntry
                                            key={entry._id}
                                            entry={entry}
                                            update={update}
                                            destroy={destroy}
                                        />
                                    ))}
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>
                </div>
            </React.Fragment>
        );
    };
}
const styles = createStyles({
    root: {
        width: '100%',
        maxWidth: 960,
        margin: '16px auto'
    }
});
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
    ),
    withStyles(styles)
)(App);
