import { getType } from 'typesafe-actions';
import { reducer, initialState } from './reducer';
import { fetchAsync, Entry } from './actions';

describe('reducer tests', () => {
    test(getType(fetchAsync.success), () => {
        let state;
        const entry: Entry = { english: 'Welcome', german: 'Willkommen' };
        const payload = [entry];
        state = reducer(initialState, { type: getType(fetchAsync.success), payload });
        expect(state).toEqual({ ...initialState, data: [...payload] });
    });
});
