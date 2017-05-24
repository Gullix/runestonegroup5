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
    var mapState =null;
    for(var i =0; i < rows.length;i++){
        var row = rows[i];
        for(var j=0; j< row.length; j++){
            switch(row[j]){
                case("z"):
                    mapState={
                        position: {
                            row: i,
                            column: j
                        }
                    }
                    mapStates.push(mapState);
                    break;
                case("i"):
                    mapState={
                        position: {
                            row: i,
                            column: j
                        }
                    }

                    mapStates.push(mapState);
                    break;
                case("s"):
                    mapState={
                        position: {
                            row: i,
                            column: j
                        }
                    }
                    mapStates.push(mapState);
                    break;
                case("e"):
                    mapState={
                        position: {
                            row: i,
                            column: j
                        }
                    }
                    mapStates.push(mapState);
                    break;
                default:
                    break;
            }
        }
    }
    return mapStates;
}
export function zoneify(zonelists){
    var zoneItems=[];
    var stateItems=[];
    var zoneItem = null;
    var startZones = zonelists.start_zone_list;
    var storageZones = zonelists.storage_zone_list;
    var intersectionZones = zonelists.intersection_zone_list;
    for (let i =0;i <startZones.length;i++){
        var startZone = startZones[i];
        zoneItem ={
            zone_id: startZone.start_zone_id,
            position: startZone.position
        }
        zoneItems.push(zoneItem)
        stateItems.push(zoneItem)
    }
    for (let i =0;i <intersectionZones.length;i++){
        var intersectionZone = intersectionZones[i];
        zoneItem ={
            zone_id: intersectionZone.intersection_zone_id,
            position: intersectionZone.position
        }
        stateItems.push(zoneItem)
    }
    for (let i =0;i <storageZones.length;i++){
        var storageZone = storageZones[i];
        zoneItem ={
            zone_id: storageZone.storage_zone_id,
            position: storageZone.position
        }
        zoneItems.push(zoneItem)
        stateItems.push(zoneItem)
    }

    var endZones = zonelists.end_zone_list;
    for (let i =0;i <endZones.length;i++){
        var endZone = endZones[i];
        zoneItem ={
            zone_id: endZone.end_zone_id,
            position: endZone.position
        }
        zoneItems.push(zoneItem)
        stateItems.push(zoneItem)
    }
    var mz ={
        mapStates: zoneItems,
        mapZones:  stateItems
    }
    return mz
}

export function mapMatrixInit(){
    const rows=[
        ["b","b","z","b","z","b","z","b","b"],
        ["b","b","z","b","z","b","z","b","b"],
        ["s","l","i","l","i","l","i","l","e"],
        ["b","b","l","b","l","b","l","b","b"],
        ["b","b","z","b","z","b","z","b","b"]

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
    }
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


