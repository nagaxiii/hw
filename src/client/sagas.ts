import { all, put, takeLatest, call } from 'redux-saga/effects';
import * as api from './api';
import { GlossaryActionTypes, fetchAsync, destroyAsync, addAsync, Entry, updateAsync, suggestAsync } from './actions';

export default function* sagas() {
    yield all([
        getEntries(),
        takeLatest(GlossaryActionTypes.FETCH, getEntries),
        takeLatest(GlossaryActionTypes.DESTROY, destroyEntry),
        takeLatest(GlossaryActionTypes.ADD, addEntry),
        takeLatest(GlossaryActionTypes.UPDATE, updateEntry),
        takeLatest(GlossaryActionTypes.SUGGEST, suggestEntry)
    ]);
}

function* getEntries() {
    try {
        yield put(fetchAsync.request());
        const items = yield call(api.index);
        yield put(fetchAsync.success(items));
    } catch (error) {
        yield put(fetchAsync.failure(error));
    }
}

function* destroyEntry(action: any) {
    try {
        yield put(destroyAsync.request());
        yield call(api.destroy, action.payload as Entry);
        yield put(destroyAsync.success(action.payload._id));
    } catch (error) {
        yield put(destroyAsync.failure(error));
    }
}

function* addEntry(action: any) {
    try {
        yield put(addAsync.request());
        const entry = yield call(api.add, action.payload as Entry);
        yield put(addAsync.success(entry));
    } catch (error) {
        yield put(addAsync.failure(error));
    }
}

function* updateEntry(action: any) {
    try {
        yield put(updateAsync.request());
        const entry = yield call(api.update, action.payload as Entry);
        yield put(updateAsync.success(entry));
    } catch (error) {
        yield put(updateAsync.failure(error));
    }
}

function* suggestEntry(action: any) {
    try {
        yield put(suggestAsync.request());
        const response = yield call(api.suggest, action.payload as Entry);
        yield put(suggestAsync.success(response));
    } catch (error) {
        yield put(suggestAsync.failure(error));
    }
}
