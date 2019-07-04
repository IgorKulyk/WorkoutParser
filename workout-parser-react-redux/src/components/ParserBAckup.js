import React from 'react'

import { connect } from 'react-redux';
import { loadBase, changeResult } from '../actions';
import ResultTable from './ResultTable';




class Parser extends React.Component {
    constructor(props) {
        super(props);
        this.state = { result: [] };
    }

    // componentDidMount() {
    //     this.mainPars();
    // }

    
    componentDidUpdate(){
        // this.setState({result: [mainPars()]});
        this.props.changeResult(this.state.result);
    }

    mainPars() {


        /* Function to insert element into array on chosen place. If index is not empty => 
                existed element index ++ and new element added on its place*/
        Array.prototype.insert = function (index) {
            this.splice.apply(this, [index, 0].concat(
                Array.prototype.slice.call(arguments, 1)));
            return this;
        };

        if (!this.props.dataBase) {
            return <div>Waiting for base</div>;
        }

        let base = this.props.dataBase;
        let input = '';
        let resultArray = [];
        let rowsCounter = 0;
        let multiplier = 1;
        let lineTime = 0;
        let lineDistance = 0;
        // let totalDistance = 0;
        // let totalTime = 0;

        if (this.props.dataBase.inputText.value !== '') {
            input = this.props.dataBase.inputText.value;
        }

        const multFinderRegEx = /^(\d+ *)([x]+ *| )(\d+)/mi; // Search for multipliers written in one line
        let match = multFinderRegEx.exec(input);
        if (match != null) {
            input = input.replace(multFinderRegEx, match[1] + '\n\t' + match[3])
        }

        let multLine = input.split(/\n/); // Separates input into single lines
        let multipliers = new Array(multLine.length);
        multipliers.fill(1);
        const loopFinder = /^(\d+\s*)([x]*)$/m; // Extracts multiplier from line
        const loopInLoopFinder = /^\t+(\d+\s*)([x]*)$/m;
        let loopMultiplierMatcher;
        let loopInLoopMultiplierMatcher;
        let loopMultipliers = [];

        for (let i = 0; i < multipliers.length; i++) {

            let deepnessLevel = 0; // Counts the loop deepness level of current string

            for (let j = 0; j < multLine[i].length; j++) {
                if (multLine[i].charAt(j) === '\t') {
                    deepnessLevel++;
                }
            }

            loopMultiplierMatcher = loopFinder.exec(multLine[i]);
            loopInLoopMultiplierMatcher = loopInLoopFinder.exec(multLine[i]);
            if (loopMultiplierMatcher != null) {
                multipliers[i] = +loopMultiplierMatcher[1];
                rowsCounter = 1;
                loopMultipliers.insert(deepnessLevel, multipliers[i]);
            }
            if (loopInLoopMultiplierMatcher != null) {
                multipliers[i] = +loopInLoopMultiplierMatcher[1] * +loopMultipliers[deepnessLevel - 1];
                rowsCounter = 1;
                loopMultipliers.insert(deepnessLevel, multipliers[i]);
            }
        }


        while (rowsCounter < multLine.length) {
            for (let j = 0; j < multipliers.length; j++) {

                if (multipliers[j] > 1) {
                    multiplier = multipliers[j];
                }

                if (rowsCounter > 1 && multipliers[j - 1] === 0 && multipliers[j] !== 0) {
                    rowsCounter++;
                }

                const timeFinder = /(\d+):(\d+)/mg; // Search for time in format X:XX
                let timeMatch = timeFinder.exec(multLine[j]);
                if (timeMatch != null) {
                    lineTime = +timeMatch[1] * 60 + +timeMatch[2];
                }

                const distanceFinder = /^[0-9]+|\t[0-9]+/g; // Search for distance
                let distMatch = distanceFinder.exec(multLine[j]);
                if (distMatch != null) {
                    if (distMatch[0] % 25 === 0) {
                        lineDistance = +distMatch[0];
                    }
                }

                const wordSeparator = /\s*(\s|,|!|\.)\s*/mg; // Put single word into array
                let line = multLine[j].split(wordSeparator);

                let strokes = [];
                let types = [];
                let intensity = [];
                let equipment = [];

                line.forEach(element => {
                    for (let { name, short_name } of base.strokes) {
                        if (element === name || element === short_name) {
                            strokes.push(name);
                        }
                    }
                    for (let { name, short_name } of base.types) {
                        if (element === name || element === short_name) {
                            types.push(name);
                        }
                    }
                    for (let { name, short_name } of base.intensity) {
                        if (element === name || element === short_name) {
                            intensity.push(name);
                        }
                    }
                    for (let { name, short_name } of base.equipment) {
                        if (element === name || element === short_name) {
                            equipment.push(name);
                        }
                    }
                });

                strokes = strokes.filter((v, i, a) => a.indexOf(v) === i);
                types = types.filter((v, i, a) => a.indexOf(v) === i);
                intensity = intensity.filter((v, i, a) => a.indexOf(v) === i);
                equipment = equipment.filter((v, i, a) => a.indexOf(v) === i);


                let maxSize = (strokes.length < types.length) ? types.length :
                    (types.length < intensity.length) ? intensity.length :
                        (intensity.length < equipment.length) ? equipment.length :
                            strokes.length;

                for (let i = 0; i < maxSize; i++) {
                    let result = '';
                    if (strokes.length === 0) {
                        result += "{ \"stroke\": \"" + base.defaults.stroke + "\""; // If empty take element from defaults
                    } else if (strokes.length - 1 >= i && strokes.length !== 0) {
                        result += "{ \"stroke\": \"" + strokes[i] + "\"";
                    } else {
                        result += "{ \"stroke\": \"" + strokes[strokes.length - 1] + "\"";
                    }

                    if (types.length === 0) {
                        result += ", \"type\": \"" + base.defaults.type + "\""; // If empty take element from defaults
                    } else if (types.length - 1 >= i && types.length !== 0) {
                        result += ", \"type\": \"" + types[i] + "\"";
                    } else {
                        result += ", \"type\": \"" + types[types.length - 1] + "\"";
                    }

                    if (intensity.length === 0) {
                        result += ", \"intensity\": \"" + base.defaults.intensity + "\""; // If empty take element from defaults
                    } else if (intensity.length - 1 >= i && intensity.length !== 0) {
                        result += ", \"intensity\": \"" + intensity[i] + "\"";
                    } else {
                        result += ", \"intensity\": \"" + intensity[intensity.length - 1] + "\"";
                    }

                    if (equipment.length === 0) {
                        result += ", \"equipment\": \"no equipment\"";
                    } else if (equipment.length - 1 >= i && equipment.length !== 0) {
                        result += ", \"equipment\": \"" + equipment[i] + "\"";
                    } else {
                        result += ", \"equipment\": \"" + equipment[equipment.length - 1] + "\"";
                    }

                    let poolLength = 25;
                    let poolsInOneLine = new Array(maxSize);
                    poolsInOneLine.fill(0);

                    for (let k = 0; k < lineDistance / poolLength; k++) {
                        if (k >= maxSize) {
                            poolsInOneLine[k % maxSize] += poolLength;
                        } else poolsInOneLine[k] += poolLength;
                    }
                    if (line[0] === "") {
                        result += ", \"distance\": " + +poolsInOneLine[i] * +multiplier;
                    } else {
                        result += ", \"distance\": " + +poolsInOneLine[i];
                    }

                    if (lineTime === 0) {
                        let defaultTimeMatch = timeFinder.exec(base.defaults.time);
                        if (defaultTimeMatch != null) {
                            lineTime = +defaultTimeMatch[1] * 60 + +defaultTimeMatch[2];
                        }
                    }

                    if (line[0] === "") {
                        result += ", \"time\": " + +lineTime / +maxSize * +multiplier + "}";
                    } else {
                        result += ", \"time\": " + +lineTime / +maxSize + "}";
                    }

                    // console.log(result);

                    resultArray.push(result);
                    // props.changeResult(resultArray);
                }

                rowsCounter++;
            }
        }


        this.setState({result: [resultArray]});
    }
    // console.log(props.changeResult);

    render() {
        return (
            <div>
                <ResultTable />
            </div>
        );
    }

}

// const mapDispatchToProps = dispatch => {
//     return {
//         base: result => dispatch(changeResult(result))
//     }
// }

const mapStateToProps = state => {
    // console.log(state);

    return { dataBase: state.base }
};

export default connect(mapStateToProps, { changeResult })(Parser);