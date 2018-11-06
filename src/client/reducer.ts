import { Reducer } from 'redux';
import { getType } from 'typesafe-actions';
import {
    Entry,
    fetchAsync,
    destroyAsync,
    addAsync,
    suggestAsync,
    Translation,
    GlosbeResponse,
    updateAsync
} from './actions';

export interface GlossaryState {
    readonly loading: boolean;
    readonly data: Entry[];
    readonly errors?: [];
    readonly suggestions?: Translation[];
}

export const initialState: GlossaryState = {
    data: [],
    loading: false,
    errors: undefined,
    suggestions: []
};

export const reducer: Reducer<GlossaryState> = (state = initialState, action) => {
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

        case getType(updateAsync.success):
            return {
                ...state,
                data: state.data.map(entry => {
                    if (entry._id === action.payload._id) {
                        return { ...action.payload };
                    }
                    return entry;
                })
            };
        case getType(suggestAsync.success):
            let glosbe = action.payload as GlosbeResponse;
            return {
                ...state,
                suggestions: glosbe.tuc.filter(entry => entry.phrase)
            };
    }
    return state;
};

export default reducer;
