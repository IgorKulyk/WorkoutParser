import React from 'react';
import { connect } from 'react-redux';
import { vocabularyButtonPressed } from '../actions';


class Buttons extends React.Component {

    render() {
        // console.log(this.props.vocabulary);
        return (
            <div>
                <button 
                className="stroke" 
                onClick={() => this.props.vocabularyButtonPressed(this.props.vocabulary.strokes)}>
                Strokes
                </button>
                <br />
                <button 
                className="type"
                onClick={() => this.props.vocabularyButtonPressed(this.props.vocabulary.types)}>
                Types
                </button>
                <br />
                <button 
                className="intensity"
                onClick={() => this.props.vocabularyButtonPressed(this.props.vocabulary.intensity)}>
                Intensity
                </button>
                <br />
                <button 
                className="equipment"
                onClick={() => this.props.vocabularyButtonPressed(this.props.vocabulary.equipment)}>
                Equipment
                </button>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return { vocabulary: state.vocabulary }
};


export default connect(mapStateToProps, { vocabularyButtonPressed })(Buttons);