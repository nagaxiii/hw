import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';

import { reducer, initialState } from './reducer';
import * as sagas from './sagas';

import { Entry, add, addAsync } from './actions';
import * as api from './api';
import { getType } from 'typesafe-actions';

describe('test sagas', () => {
    test(getType(add), () => {
        const fakeApplications = { data: [{ id: 1 }] };
        const entry: Entry = { english: 'Dog', german: 'Hund' };
        return expectSaga(sagas.addEntry, add(entry))
            .withReducer(reducer)
            .provide([[call(api.add, entry), entry]])
            .put(addAsync.request())
            .put(addAsync.success(entry))
            .hasFinalState({ ...initialState, data: [entry] })
            .run();
    });
});
