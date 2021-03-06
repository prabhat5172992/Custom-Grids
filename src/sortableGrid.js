import React from 'react';
import PropTypes from 'prop-types';


const style = {
    tableStyle: {"borderBottom": "1px solid black", "borderTop": "1px solid black", "tableLayout": "fixed",  "borderLeft": "1px solid black", "borderRight": "1px solid black", width:"100%"},
    tableHeader: {"borderBottom": "1px solid black", "borderTop": "1px solid black"}
}

export default class Grid extends React.Component {

    static PropTypes = {
        data: PropTypes.array.isRequired,
        headers: PropTypes.array.isRequired,
        sortRows: PropTypes.func
    }
    
    constructor(props){
        super(props);
        this.state={
           data: props.data,
           headers: props.headers,
           err: "" 
        }
        this.renderHeader = this.renderHeader.bind(this);
        this.renderRows = this.renderRows.bind(this);
    };

    componentWillReceiveProps(nextProps){
        if(nextProps.headers !== this.state.headers || nextProps.data !== this.state.data){
            this.setState({
                data: nextProps.data,
                headers: nextProps.headers
            });
            console.log("data in componentwillreceiveprops", nextProps, this.state.data);
        }
    }

    renderHeader(){
        let headers = [];
        try{
            if(this.state.headers.length){
                this.state.headers.forEach((item, index) => {
                    if(item.sortable){
                        headers.push([
                            <th colSpan={2} style={{textAlign:"center", width: item.width, "borderBottom": "1px solid black", "borderTop": "1px solid black", "borderLeft": "1px solid black", "borderRight": "1px solid black", "overflow": "hidden"}}>
                                {/* eslint-disable-next-line */}
                                <a style={{cursor: "pointer"}} onClick={()=>this.props.sortRows(item.key)}> {item.key} </a>
                            </th>
                        ]);
                    }
                    else{
                        headers.push([
                            <th colSpan={2} style={{textAlign:"center", width: item.width, "borderBottom": "1px solid black", "borderTop": "1px solid black", "borderLeft": "1px solid black", "borderRight": "1px solid black", "overflow": "hidden"}}>
                                {item.key}
                            </th>
                        ]);
                    }
                    
                })
                return headers;
            }
        }
        catch(err){
            this.setState({err});
            console.error("An Error Occured", err);
        }
        
    }

    renderRows(){
        let rows = [];
        let rowStyle;
        try{
            if(this.state.data.length){
                this.state.data.forEach((item, index) => {
                    rowStyle = (index%2)===0 ? {backgroundColor:"#E8ECEB", "borderBottom": "1px solid black", hight: "35px"} : {backgroundColor:"#FFFFFF", "borderBottom": "1px solid black", hight: "35px"};
                    rows.push(
                    <tr key={"row-data-"+ index} style={rowStyle}>
                        {this.state.headers.map(val => [<td colSpan={2} style = {{width:"inherit", textAlign:"center", margin:"2px", "borderBottom": "1px solid black", "borderTop": "1px solid black", "borderLeft": "1px solid black", "borderRight": "1px solid black", "overflow": "hidden"}}>{item[val.key]}</td>])}
                    </tr>)
                    
                })
                return rows;
            }
        }
        catch(err){
            this.setState({err});
            console.error("An Error Occured", err);
        }
        
    }


    render(){
        return(
            this.state.err ? <div><h1> An Error Occured, check browser console and fix the error. </h1></div>:
            <table style={style.tableStyle}> 
                <thead style = {style.tableHeader}>
                    <tr key={"rowHeader"} style = {{height: "40px"}}>{this.renderHeader()}</tr>
                </thead>
                <tbody>{this.renderRows()}</tbody>
            </table>
        )
    }
}