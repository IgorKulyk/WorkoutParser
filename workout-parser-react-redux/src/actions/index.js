
export const vocabularyButtonPressed = (vocabularyPart) => {
    return {
        type: 'VOCABULARY_BUTTON_PRESSED',
        payload: vocabularyPart
    };
};

export const editVocabularyPressed = (editedPart) => {
    return {
        type: 'EDIT_VOCABULARY_PRESSED',
        payload: editedPart
    };
};

export const deleteShortName = (deletedShortName) => {
    return {
        type: 'DELETE_SHORTNAME',
        payload: deletedShortName
    };
};

export const initialFill = (base) => {
    return {
        type: 'INITIAL_FILL',
        payload: base
    };
};

export const changeTextValue = (value) => {
    return {
        type: 'CHANGE_TEXT_VALUE',
        payload: value
    };
};

export const loadBase = () => {
    return {
        type: 'LOAD_BASE',
        payload: null
    };
};

export const changeResult = (result) => {
    return {
        type: 'CHANGE_RESULT',
        payload: result
    };
};