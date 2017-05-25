/**
 * Created by simonljus on 2017-05-24.
 */
export function createWareHouse(rows){


    const whMap ={
        colSize: largestLaneSize(rows),
        rowSize: rows.length,
        rows:rows,
    }
    return whMap;


}
export function largestLaneSize(lanes){
    var max =0
    for(var i=0;i<lanes.length; i++){

        if( lanes[0].length  > max){
            max = lanes[0].length;
        }
    }
    return max;

}

export function createMapStateList(rows){
    var mapStates =[];
    var mapState = null;
    var storageStates = [];
    for(var i =0; i < rows.length;i++){
        var row = rows[i];
        for(var j=0; j< row.length; j++){

            var rowElement = row[j];
            var rowChar = rowElement.charAt(0);

            if (rowChar === "z" || rowChar === "s" || rowChar === "e"){
                mapState={
                    position:{
                        row: i,
                        column: j
                    },
                    zone_id: row[j]
                };
                storageStates.push(mapState);
                mapStates.push(mapState);
            }
            else if(rowChar === "i"){
                mapState={
                    position:{
                        row: i,
                        column: j
                    },
                    zone_id: row[j]
                };
                mapStates.push(mapState);
            }
        }
    }
    return {
        mapStates: mapStates,
        storageStates: storageStates
    };
}

export function mapMatrixInit(){
    const rows=[
        ["b","b","z1","b","z2","b","b"],
        ["b","b","l" ,"b","l" ,"b","b"],
        ["s","l","i1","l","i2","l","e"],
        ["b","b","l" ,"b","l" ,"b","b"],
        ["b","b","z3","b","z4","b","b"]

    ];
    return rows
}
export function taskListInit(){
    const task = {action:"Move", args:["package1337"], task_id:0};
    const tasks =[task];
    return tasks;
}
export function startZoneInit(){
    const startZone= {
        position: {
            row: 2,
            column: 0
        },
        start_zone_id: "startzone1"
    };
    return startZone
}
export function robotInit(){
    const robot ={
        position: {
            row: 0,
            column: 0},
        orientation: "west",
        has_package: false
    };
    return robot
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
    const packages =[package1,package2,package3];
    return (packages);
}
export function zoneListInit(){
    var package1={
        position:{ row:0, column: 2},
        zone_id: "zone1",
    }
    var package2={
        position:{ row:4, column: 4},
        zone_id: "zone2",
    }
    var zones =[package1,package2];
    return (zones);
}
export function intersectionListInit(){
    var intersection1={
        position:{ row:0, column: 2},
        zone_id: "intersection1",
    }
    var intersection2={
        position:{ row:2, column: 4},
        zone_id: "intersectrion2",
    }

    var intersection3={
        position:{ row:2, column: 6},
        zone_id: "intersectrion3",
    }
    var intersections =[intersection1,intersection2,intersection3];
    return (intersections);
}
export function packageListHandler(plist){
    var list = plist.map((key,val) => {
        return val;
    });
    return list;
}


