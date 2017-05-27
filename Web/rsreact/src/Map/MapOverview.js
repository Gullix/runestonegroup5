/**
 * Created by simonljus on 2017-05-21.
 */
import React, { Component } from 'react';
import Grid from "./WarehouseView/Grid";
require('./MapOverview.css');
import InformationOverview from "./WarehouseInfo/InformationOverview";

class MapOverview extends Component{
       squareOnClick(square){
           if (true){

           }
       }
      render(){

          return(

              <div className="mapOverviewContainer">
                  <Grid rowSize={this.props.layout.rowSize} squareOnClick={this.squareOnClick.bind(this)}colSize={this.props.layout.colSize} rows={this.props.layout.rows} robotInfo={this.props.robotInfo} packages={this.props.packages}></Grid>
                  <InformationOverview></InformationOverview>
              </div>

          )
      };
}
export default MapOverview