import { Reducer } from 'redux';
import { getType } from 'typesafe-actions';
import { Entry, fetchAsync, destroyAsync, addAsync } from './actions';

export interface GloassaryState {
    readonly loading: boolean;
    readonly data: Entry[];
    readonly errors?: [];
}

export const initialState: GloassaryState = {
    data: [],
    loading: false,
    errors: undefined
};

export const reducer: Reducer<GloassaryState> = (state = initialState, action) => {
    switch (action.type) {
        case getType(fetchAsync.success):
            return {
                ...state,
                data: [...action.payload]
            };
        case getType(destroyAsync.success):
            return {
                ...state,
                data: state.data.filter(entry => entry._id !== action.payload)
            };
        case getType(addAsync.success):
            return {
                ...state,
                data: [action.payload, ...state.data]
            };
    }
    return state;
};

export default reducer;
