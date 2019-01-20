import React, { Component } from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";
import Grid from './grid';
import SortableGrid from './sortableGrid';
import ExpandableGrid from './expandableGrid';
import constants from './constants';
import {doSort} from './helper';

const theme = createMuiTheme();

class App extends Component {

  constructor(props){
    super(props);
    this.state ={
      headers: constants.headers,
      expandableHeaders: constants.expandableHeaders,
      paginatedRow: [],
      rows: [],
      offset: 0,
      pageNumber: 1,
      sortDirection: "ASC"
    } 
    this.sortRows = this.sortRows.bind(this);
  }
  
  componentDidMount(){
    let data = [];
    Array(158).fill().map((item, index) => 
        data.push({"Name": `Prabhat${index+1}`, "Age": `${Math.floor(Math.random()*100)}`, "Company": "Wipro", "Salary": `${Math.floor(Math.random()*1000000)}`}));
    this.setState({
      rows: data
    },()=> this.handleClick(0,1));
  }

  handleClick(offset, pageNumber) {
    let rows = this.state.rows.slice();
    let lowerVal = (pageNumber === 1) ? 0 : (pageNumber-1)*10;
    let upperVal = rows.length > pageNumber*10 ? pageNumber*10 : rows.length;
    const paginatedRow = rows.slice(lowerVal, upperVal);
    this.setState({ offset, pageNumber, paginatedRow});
  }

  sortRows(sortColumn){
    const rows = this.state.rows.slice();
    const sortDirection = this.state.sortDirection;
    const data = doSort(sortColumn, sortDirection, rows);
    const paginatedRow = data.slice(0,10);
    this.setState({
      sortDirection: sortDirection==="ASC"? "DESC" : "ASC",
      rows: data,
      paginatedRow
    });
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div style={{margin:"2%"}}> 
          <h1> Custom Table </h1>
           <div style={{marginBottom:"5px"}}>
            {this.state.rows.length ? 
            <Grid 
              headers={this.state.headers} 
              data={this.state.paginatedRow}
            /> : <h2> No Data to Display!! </h2>}
          </div>
          <h1> Expandable Table </h1>
           <div style={{marginBottom:"5px"}}>
            <ExpandableGrid 
              expandableHeaders={this.state.expandableHeaders} 
              //data={this.state.paginatedRow}
            />
          </div>
          <h1> Sortable Grid </h1>
          <div>
            {this.state.rows.length ?
            <SortableGrid 
              headers={this.state.headers} 
              data={this.state.paginatedRow}
              sortRows={this.sortRows}
            /> : <h2> No Data to Display for Sortable Grid!! </h2>}
          </div>
          <CssBaseline />
          <div style={{textAlign: "end"}}>
            <Pagination
              limit={10}
              offset={this.state.offset}
              total={this.state.rows.length}
              onClick={(e, offset, pageNumber) => this.handleClick(offset, pageNumber)}
            />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
