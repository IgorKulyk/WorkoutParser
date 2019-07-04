import React from 'react'

import { connect } from 'react-redux';
import { changeTextValue } from '../actions';



class Textarea extends React.Component {
    constructor() {
        super()
        this.state = {value: ''};
    }
    
    componentDidMount() {
        document.addEventListener('keyup', this.handleKeyPress);
    }
    componentWillUnmount() {
        document.removeEventListener('keyup', this.handleKeyPress);
    }

    handleKeyPress = event => {
        this.setState({ value: event.target.value });
        this.props.base(this.state.value);
    }


    render() {
        
        // Function needet to write TAB in textarea
        window.onload = function () {
            let textarea = document.getElementById('source');
            textarea.onkeydown = function (e) {
                if (e.keyCode === 9) {
                    e.preventDefault();
                    let s = this.selectionStart;
                    this.value = this.value.substring(0, this.selectionStart) + "\t" + this.value.substring(this.selectionEnd);
                    this.selectionEnd = s + 4;
                }
            }
        }

        return (
            <div>
                <textarea placeholder="Write something here"
                    id="source"
                    cols="50" rows="20"
                    value={this.state.value}
                    onChange={this.handleKeyPress} />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        base: value => dispatch(changeTextValue(value))
    }
};

export default connect(null, mapDispatchToProps)(Textarea);