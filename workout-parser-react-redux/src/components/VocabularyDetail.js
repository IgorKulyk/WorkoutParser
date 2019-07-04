import React from 'react';
import { connect } from 'react-redux';
import { deleteShortName } from '../actions';


const VocabularyDetail = props => {
    // console.log(props);

    // const removeShortName = shortName => {
    //     return props.vocabularyPart.short_name.filter(oneShortName => shortName !== oneShortName);
    // }

    if (!props.vocabularyPart) {
        return <div>Chose some name to edit</div>
    }

    const shortNames = props.vocabularyPart.short_name.map((shortName, index) => {
        return (
            <div key={index}>
                {shortName}
                <button onClick={() => props.deleteShortName(shortName)}>Delete</button>
            </div>
        );
    });

    return (
        <div>
            <h3>Editing {props.vocabularyPart.name}</h3>
            <br />
            {shortNames}
        </div>
    );
};

const mapStateToProps = state => {
    // console.log(state);
    
    return { vocabularyPart: state.editedVocabulary }
};
export default connect(mapStateToProps, { deleteShortName })(VocabularyDetail);