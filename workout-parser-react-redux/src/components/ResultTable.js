import React from 'react';

import { connect } from 'react-redux';



const TableBody = props => {
    return (
        <div className="result-table">
            <div className="stroke container">
                <p>Stroke</p>
                <TableColumn result={props.result} keyWord="stroke" />
            </div>
            <div className="type container">
                <p>Type</p>
                <TableColumn result={props.result} keyWord="type" />
            </div>
            <div className="intensity container">
                <p>Intensity</p>
                <TableColumn result={props.result} keyWord="intensity" />
            </div>
            <div className="equipment container">
                <p>Equipment</p>
                <TableColumn result={props.result} keyWord="equipment" />
            </div>
        </div>

    )
}

const TableColumn = props => {
    return props.result.map((row, index) => {
        if (props.keyWord === "stroke") {
            return (
                <div className="result-component" key={index}>
                    {row.stroke} : {row.distance}
                </div>
            );
        }
        if (props.keyWord === "type") {
            return (
                <div className="result-component" key={index}>
                    {row.type} : {row.distance}
                </div>
            );
        }
        if (props.keyWord === "intensity") {
            return (
                <div className="result-component" key={index}>
                    {row.intensity} : {row.distance}
                </div>
            );
        }
        if (props.keyWord === "equipment") {
            return (
                <div className="result-component" key={index}>
                    {row.equipment} : {row.distance}
                </div>
            );
        }
        return null;
    });
}

const TableTotals = props => {

    function fancyTimeFormat(time) {
        // Hours, minutes and seconds
        var hrs = ~~(time / 3600);
        var mins = ~~((time % 3600) / 60);
        var secs = time % 60;

        // Output like "1:01" or "4:03:59" or "123:03:59"
        var ret = "";

        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }

        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        return ret;
    }

    let totalDistance = 0;
    let totalTime = 0;
    props.result.map((row) => {
        totalDistance += row.distance;
        totalTime += row.time;
    });

    return (
        <div>
            <div className="total distance">
                Total distance: {totalDistance}
            </div>
            <div className="total time">
                Total time: {fancyTimeFormat(totalTime)}
            </div>
        </div>
    );
}


const ResultTable = props => {
    return (
        <div>
            <TableBody result={props.base.result} />
            <TableTotals result={props.base.result} />
        </div>
    )
}

const mapStateToProps = state => {
    console.log(state);
    return { base: state.base }
};

export default connect(mapStateToProps)(ResultTable);