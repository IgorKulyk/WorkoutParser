import React from 'react';

import { connect } from 'react-redux';
import { editVocabularyPressed } from '../actions';


const VocabularyInfo = (props) => {
    // console.log(vocabulary);
    let vocabulary = props.vocabulary;
    if (!vocabulary) {
        return <div>Select a vocabulary to show</div>
    }

    //Sort elements by name
    vocabulary.sort(function (obj1, obj2) {
        if (obj1.name < obj2.name) return -1;
        if (obj1.name > obj2.name) return 1;
        return 0;
    });

    //Connect short_names with single name into array and set this array as value near one unique name
    vocabulary = Object.values(vocabulary.reduce((c, { name, short_name }) => {
        c[name] = c[name] || { name, short_name: [] };
        c[name].short_name = c[name].short_name.concat(Array.isArray(short_name) ? short_name : [short_name]);
        return c;
    }, {}));

    // console.log(props);

    return vocabulary.map((word) => {
        return (
            <div key={word.name}>
                {word.name} - {word.short_name.join(", ")}
                <button onClick={() => props.editVocabularyPressed(word)}>Edit</button>
            </div>
        );
    });
};

const mapStateToProps = state => {
    return { vocabulary: state.selectedVocabulary }
};


export default connect(mapStateToProps, { editVocabularyPressed })(VocabularyInfo);