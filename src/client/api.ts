import axios from 'axios';
import { call } from 'redux-saga/effects';
import { Entry } from './actions';

export function* index() {
    const response = yield call(axios.get, 'http://localhost:3000/api/v1/glossary');

    return response.data;
}

export function* destroy(entry: Entry) {
    const response = yield call(axios.delete, `http://localhost:3000/api/v1/glossary/${entry._id}`);

    return response.data;
}

export function* add(entry: Entry) {
    const response = yield call(axios.post, `http://localhost:3000/api/v1/glossary`, entry);

    return response.data;
}

export function* update(entry: Entry) {
    const response = yield call(axios.put, `http://localhost:3000/api/v1/glossary/${entry._id}`, entry);

    return response.data;
}
