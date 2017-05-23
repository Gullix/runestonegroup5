/**
 * Created by simonljus on 2017-05-21.
 */
import React, { Component } from 'react';
import Grid from "./Grid";
class MapOverview extends Component{

      render(){
          console.log(this.props.packages)

          return(

              <div className="mapOverviewContainer">
                  <Grid rowSize={this.props.layout.rowSize} colSize={this.props.layout.colSize} startPoint={this.props.startPoint} rows={this.props.layout.rows} robotPos={this.props.robotPos} packages={this.props.packages}></Grid>
              </div>

          )
      };
}
export default MapOverview