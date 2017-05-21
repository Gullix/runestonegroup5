/**
 * Created by simonljus on 2017-05-21.
 */
import React, { Component } from 'react';
import Grid from "./Grid";
class MapOverview extends Component{

      render(){


          return(
              <div className="mapOverviewContainer">
                  <Grid rowSize={this.props.layout.rowSize} colSize={this.props.layout.colSize}></Grid>
              </div>

          )
      };
}
export default MapOverview