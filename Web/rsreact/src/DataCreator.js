/**
 * Created by simonljus on 2017-05-24.
 */

export function createWareHouse(rows){


    let whMap ={
        colSize: largestLaneSize(rows),
        rowSize: rows.length,
        rows:rows,
    }
    return whMap;


}
export function largestLaneSize(lanes){
    let max =0
    for(var i=0;i<lanes.length; i++){

        if( lanes[0].length  > max){
            max = lanes[0].length;
        }
    }
    return max;

}

export function createMapStateList(rows){
    let start_states = [];
    let intersection_states =[];
    let end_states =[];
    let zone_states =[];

    let mapState = null;
    for(let i =0; i < rows.length;i++) {
        let row = rows[i];
        for (let j = 0; j < row.length; j++) {
            let rowElement = row[j];
            switch (rowElement.charAt(0)) {
                case("z"):
                    mapState = {
                        position: {
                            row: i,
                            column: j
                        },
                        zone_id: rowElement
                    };
                    zone_states.push(mapState);
                    break;
                case("i"):
                    mapState = {
                        position: {
                            row: i,
                            column: j
                        },
                        zone_id: rowElement
                    };
                    intersection_states.push(mapState);
                    break;
                case("s"):
                    mapState = {
                        position: {
                            row: i,
                            column: j
                        },
                        zone_id: rowElement
                    };
                    start_states.push(mapState);
                    break;
                case("e"):
                    mapState = {
                        position: {
                            row: i,
                            column: j
                        },
                        zone_id: rowElement
                    };
                    end_states.push(mapState);
                    break;
                default:
                    break;

            }

        }
    }
    return {
        mapStates: start_states.concat(intersection_states.concat(zone_states.concat(end_states))) ,
        storageStates: start_states.concat(zone_states.concat(end_states))
    };
}

export function mapMatrixInit(){
    return [
        ["b","b","z1","b","z2","b","b"],
        ["b","b","l" ,"b","l" ,"b","b"],
        ["s","l","i1","l","i2","l","e"],
        ["b","b","l" ,"b","l" ,"b","b"],
        ["b","b","z3","b","z4","b","b"]
    ];
}
export function taskListInit(){
    return [{action:"Move", args:["package1337"], task_id:0}];
}
export function robotInit(){
    return {
        position: {
            row: 0,
            column: 0},
        orientation: "west",
        has_package: false
    };
}

export function packageListInit(){
    const package1={
        position:{ row:0, column: 2},
        package_id: "package1",
    }
    const package2={
        position:{ row:4, column: 4},
        package_id: "package2",
    }
    const package3={
        position:{ row:0, column: 0},
        package_id: "package3",
    }
    return [package1,package2,package3];
}
export function packageListHandler(plist){
    let list = Object.keys(plist).map((key,i) => plist[key]);
    return list;
}


