import React, { Component } from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";
import Grid from './grid';
import constants from './constants';

const theme = createMuiTheme();

class App extends Component {

  constructor(props){
    super(props);
    this.state ={
      headers: constants.headers,
      data: [],
      offset: 0,
      pageNumber: 1
    } 
  }
  
  componentDidMount(){
    this.handleClick(0,1);
  }

  handleClick(offset, pageNumber) {
    let rows = constants.data.slice();
    let lowerVal = (pageNumber === 1) ? 0 : (pageNumber-1)*10;
    let upperVal = rows.length > pageNumber*10 ? pageNumber*10 : rows.length;
    const data = rows.slice(lowerVal, upperVal);
    this.setState({ offset, pageNumber, data});
    console.log("OFFSET", offset, pageNumber, lowerVal, upperVal, rows.length);
    console.log("DATA-----------", data);
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div style={{margin:"2%"}}> 
          <h1> Custom Table </h1>
          {this.state.data.length ? 
          <Grid 
            headers={this.state.headers} 
            data={this.state.data}
          /> : <h2> No Data to Display!! </h2>}
          <CssBaseline />
          <div style={{textAlign: "end"}}>
            <Pagination
              limit={10}
              offset={this.state.offset}
              total={constants.data.length}
              onClick={(e, offset, pageNumber) => this.handleClick(offset, pageNumber)}
            />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
