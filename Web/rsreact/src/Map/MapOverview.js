/**
 * Created by simonljus on 2017-05-21.
 */
import React, { Component } from 'react';
import Grid from "./Grid";
import InformationOverview from "./InformationOverview";
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