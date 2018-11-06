import { action, createAction, createAsyncAction, ActionType } from 'typesafe-actions';

export interface Entry {
    _id?: string;
    english: string;
    german: string;
    __v?: number;
}

export interface Phrase {
    text: string;
    language: string;
}

export interface Meaning extends Phrase {}
export interface Translation {
    phrase: Phrase;
    meanings: Meaning[];
}

export interface GlosbeResponse {
    response: string;
    tuc: Translation[];
}

export const enum GlossaryActionTypes {
    FETCH = 'glossary/FETCH',
    FETCH_REQUEST = 'glossary/FETCH_REQUEST',
    FETCH_SUCCESS = 'glossary/FETCH_SUCCESS',
    FETCH_FAILURE = 'glossary/FETCH_FAILURE',
    ADD = 'glossary/ADD',
    ADD_REQUEST = 'glossary/ADD_REQUEST',
    ADD_SUCCESS = 'glossary/ADD_SUCCESS',
    ADD_FAILURE = 'glossary/ADD_FAILURE',
    DESTROY = 'glossary/DESTROY',
    DESTROY_REQUEST = 'glossary/DESTROY_REQUEST',
    DESTROY_SUCCESS = 'glossary/DESTROY_SUCCESS',
    DESTROY_FAILURE = 'glossary/DESTROY_FAILURE',
    UPDATE = 'glossary/UPDATE',
    UPDATE_REQUEST = 'glossary/UPDATE_REQUEST',
    UPDATE_SUCCESS = 'glossary/UPDATE_SUCCESS',
    UPDATE_FAILURE = 'glossary/UPDATE_FAILURE',
    SUGGEST = 'glossary/SUGGEST',
    SUGGEST_REQUEST = 'glossary/SUGGEST_REQUEST',
    SUGGEST_SUCCESS = 'glossary/SUGGEST_SUCCESS',
    SUGGEST_FAILURE = 'glossary/SUGGEST_FAILURE'
}

export const fetch = createAction(GlossaryActionTypes.FETCH);

export const fetchAsync = createAsyncAction(
    GlossaryActionTypes.FETCH_REQUEST,
    GlossaryActionTypes.FETCH_SUCCESS,
    GlossaryActionTypes.FETCH_FAILURE
)<void, Entry[], Error>();

export const destroy = createAction(GlossaryActionTypes.DESTROY, resolve => {
    return (entry: Entry) => resolve(entry);
});

export const destroyAsync = createAsyncAction(
    GlossaryActionTypes.DESTROY_REQUEST,
    GlossaryActionTypes.DESTROY_SUCCESS,
    GlossaryActionTypes.DESTROY_FAILURE
)<void, string, Error>();

export const add = createAction(GlossaryActionTypes.ADD, resolve => {
    return (entry: Entry) => resolve(entry);
});

export const addAsync = createAsyncAction(
    GlossaryActionTypes.ADD_REQUEST,
    GlossaryActionTypes.ADD_SUCCESS,
    GlossaryActionTypes.ADD_FAILURE
)<void, Entry, Error>();

export const update = createAction(GlossaryActionTypes.UPDATE, resolve => {
    return (entry: Entry) => resolve(entry);
});

export const updateAsync = createAsyncAction(
    GlossaryActionTypes.UPDATE_REQUEST,
    GlossaryActionTypes.UPDATE_SUCCESS,
    GlossaryActionTypes.UPDATE_FAILURE
)<void, Entry, Error>();

export const suggest = createAction(GlossaryActionTypes.SUGGEST, resolve => {
    return (entry: Entry) => resolve(entry);
});

export const suggestAsync = createAsyncAction(
    GlossaryActionTypes.SUGGEST_REQUEST,
    GlossaryActionTypes.SUGGEST_SUCCESS,
    GlossaryActionTypes.SUGGEST_FAILURE
)<void, GlosbeResponse, Error>();

export const GlossaryActions = {
    fetch,
    destroy,
    add,
    update,
    suggest
};
