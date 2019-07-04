import { combineReducers } from 'redux';

const initialState = {
    strokes: [
        { "short_name": "fly", "name": "butterfly" },
        { "short_name": "back", "name": "backstroke" },
        { "short_name": "breast", "name": "breaststroke" },
        { "short_name": "free", "name": "freestyle" },
        { "short_name": "frim", "name": "free-IM" },
        { "short_name": "strk", "name": "stoke" },
        { "short_name": "ch", "name": "choice" },
        { "short_name": "wrs", "name": "worst" },
        { "short_name": "mx", "name": "mix" },
        { "short_name": "fl", "name": "butterfly" },
        { "short_name": "bk", "name": "backstroke" },
        { "short_name": "br", "name": "breaststroke" },
        { "short_name": "fr", "name": "freestyle" },
        { "short_name": "im", "name": "individual medley" },
        { "short_name": "st", "name": "stoke" }
    ],

    types: [
        { "short_name": "sw", "name": "swim" },
        { "short_name": "k", "name": "kick" },
        { "short_name": "p", "name": "pull" },
        { "short_name": "d", "name": "drill" },
        { "short_name": "sc", "name": "scull" }
    ],

    intensity: [
        { "short_name": "ez", "name": "easy" },
        { "short_name": "mod", "name": "moderate" },
        { "short_name": "fst", "name": "fast" },
        { "short_name": "spr", "name": "sprint" },
        { "short_name": "bld", "name": "build" }
    ],

    equipment: [
        { "short_name": "brd", "name": "board" },
        { "short_name": "pdd", "name": "paddles" },
        { "short_name": "fin", "name": "fins" },
        { "short_name": "sn", "name": "snorkel" },
        { "short_name": "rb", "name": "rubber band" }
    ],

    defaults: { "time": "1:00", "stroke": "mix", "intensity": "easy", "type": "swim" },

    inputText: { value: '' },

    result: []
}
const vocabularyReducer = () => {
    return {
        strokes: [
            { "short_name": "fly", "name": "butterfly" },
            { "short_name": "back", "name": "backstroke" },
            { "short_name": "breast", "name": "breaststroke" },
            { "short_name": "free", "name": "freestyle" },
            { "short_name": "frim", "name": "free-IM" },
            { "short_name": "strk", "name": "stoke" },
            { "short_name": "ch", "name": "choice" },
            { "short_name": "wrs", "name": "worst" },
            { "short_name": "mx", "name": "mix" },
            { "short_name": "fl", "name": "butterfly" },
            { "short_name": "bk", "name": "backstroke" },
            { "short_name": "br", "name": "breaststroke" },
            { "short_name": "fr", "name": "freestyle" },
            { "short_name": "im", "name": "individual medley" },
            { "short_name": "st", "name": "stoke" }
        ],

        types: [
            { "short_name": "sw", "name": "swim" },
            { "short_name": "k", "name": "kick" },
            { "short_name": "p", "name": "pull" },
            { "short_name": "d", "name": "drill" },
            { "short_name": "sc", "name": "scull" }
        ],

        intensity: [
            { "short_name": "ez", "name": "easy" },
            { "short_name": "mod", "name": "moderate" },
            { "short_name": "fst", "name": "fast" },
            { "short_name": "spr", "name": "sprint" },
            { "short_name": "bld", "name": "build" }
        ],

        equipment: [
            { "short_name": "brd", "name": "board" },
            { "short_name": "pdd", "name": "paddles" },
            { "short_name": "fin", "name": "fins" },
            { "short_name": "sn", "name": "snorkel" },
            { "short_name": "rb", "name": "rubber band" }
        ],

        defaults: { "time": "1:00", "stroke": "mix", "intensity": "easy", "type": "swim" }
    };
};

const selectedVocabularyReducer = (selectedVocabulary = null, action) => {
    if (action.type === 'VOCABULARY_BUTTON_PRESSED') {
        return action.payload;
    }
    return selectedVocabulary;
};

const editVocabularyReducer = (editedVocabulary = null, action) => {
    if (action.type === 'EDIT_VOCABULARY_PRESSED') {
        return action.payload;
    }
    return editedVocabulary
};

const deleteShortNameReducer = (deletedShortName = null, action) => {
    if (action.type === 'DELETE_SHORTNAME') {
        return action.payload;
    }
    return deletedShortName;
};

const initialFillReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INITIAL_FILL':
            return action.payload;
        case 'CHANGE_TEXT_VALUE':
            return { ...state, inputText: { value: action.payload } };
        case 'LOAD_BASE':
            return state;
        case 'CHANGE_RESULT':
            return { ...state, result: action.payload };
        default:
            return state;
    }
};

export default combineReducers({
    vocabulary: vocabularyReducer,
    selectedVocabulary: selectedVocabularyReducer,
    editedVocabulary: editVocabularyReducer,
    deleteShortName: deleteShortNameReducer,
    base: initialFillReducer
});