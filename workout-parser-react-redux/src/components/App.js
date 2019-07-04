import React from 'react';
import Buttons from './Buttons';
import Textarea from './Textarea';
import Parser from './Parser'
import VocabularyInfo from './VocabularyInfo';
import VocabularyDetail from './VocabularyDetail';



class App extends React.Component {

    render() {
        return (
            <div>
                <div>
                    <Textarea />
                    <Parser />
                </div>
                <div>
                    <Buttons />
                </div>
                <div>
                    <VocabularyInfo />
                </div>
                <div>
                    <VocabularyDetail />
                </div>
            </div>
        );
    }
}


export default App;