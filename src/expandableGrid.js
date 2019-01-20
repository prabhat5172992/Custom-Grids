import React from 'react';
import PropTypes from 'prop-types';


const style = {
    tableStyle: {"borderBottom": "1px solid black", "borderTop": "1px solid black", "tableLayout": "fixed",  "borderLeft": "1px solid black", "borderRight": "1px solid black", width:"100%"},
    tableHeader: {"borderBottom": "1px solid black", "borderTop": "1px solid black"}
}

export default class Grid extends React.Component {

    static PropTypes = {
        data: PropTypes.array.isRequired,
        headers: PropTypes.array.isRequired
    }
    
    constructor(props){
        super(props);
        this.state={
           data: [],
           headers: props.expandableHeaders,
           childRow: []
        }
        this.renderHeader = this.renderHeader.bind(this);
        this.renderRows = this.renderRows.bind(this);
        this.expandRows = this.expandRows.bind(this);
    };

    componentDidMount(){
        let data = [];
        Array(158).fill().map((item, index) =>  data.push({"Name": `Prabhat${index+1}`, "Age": `${Math.floor(Math.random()*100)}`, "Company": "Wipro","childObj":{"id":`${index+10}`, 
            "user":`user${index}`, "key":`${Math.floor(Math.random()*10000)}`, "desc":"this is a child row."} ,"Salary": `${Math.floor(Math.random()*1000000)}`}));
        this.setState({data});
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.expandableHeaders !== this.state.headers){
            this.setState({
                headers: nextProps.expandableHeaders
            });
        }
    }

    renderHeader(){
        let headers = [];
        if(this.state.headers.length){
            this.state.headers.forEach((item, index) => {
                headers.push([<th colSpan={2} style={{textAlign:"center", width: item.width, "borderBottom": "1px solid black", "borderTop": "1px solid black", "borderLeft": "1px solid black", "borderRight": "1px solid black"}}>{item.key}</th>]);
            })
            return headers;
        }
    }

    renderRows(){
        let rows = [];
        let rowStyle;
        if(this.state.data && this.state.data.length){
            this.state.data.forEach((item, index) => {
                rowStyle = (index%2)===0 ? {backgroundColor:"#E8ECEB", "borderBottom": "1px solid black", hight: "35px"} : {backgroundColor:"#FFFFFF", "borderBottom": "1px solid black", hight: "35px"};
                rows.push(
                <tr key={"row-data-"+ index} style={rowStyle}>
                    {this.state.headers.map(val => [
                    <td colSpan={2} style = {{width:"inherit", textAlign:"center", margin:"2px", "borderBottom": "1px solid black", "borderTop": "1px solid black", "borderLeft": "1px solid black", "borderRight": "1px solid black", "overflow": "hidden"}}>
                        {/* eslint-disable-next-line */}
                        <a style={{cursor: "pointer", "text-decoration": "none", color: "black"}} href="javascript:void(0)" onClick={()=> this.expandRows(item[val.key], item)}>
                            {item[val.key]} 
                        </a>
                    </td> 
                    ])}
                </tr>)
                
            })
            return rows;
        }
    }

    expandRows(key, value){
        let childRow = [];
        let childRowStyle = {"borderBottom": "1px solid black", hight: "35px"};
        let headers = Object.keys(value.childObj);

        childRow.push(<tr key={"row-data-"+ 0} style={childRowStyle}>
            {
                headers.forEach((item, index) => 
                    <div>
                        <th colSpan={2} style={{textAlign:"center", width: item.width, "borderBottom": "1px solid black", "borderTop": "1px solid black", "borderLeft": "1px solid black", "borderRight": "1px solid black"}}>{item}</th>
                        <td colSpan={2} style = {{width:"inherit", textAlign:"center", margin:"2px", "borderBottom": "1px solid black", "borderTop": "1px solid black", "borderLeft": "1px solid black", "borderRight": "1px solid black", "overflow": "hidden"}}>
                            {/* eslint-disable-next-line */}
                            {value.childObj[item]}
                        </td>
                    </div>
                )
            }
        </tr>);
        this.setState({childRow});
        console.log("Expandable rows======", key, value, childRow);
    }


    render(){
        return(
            <table style={style.tableStyle}> 
                <thead style = {style.tableHeader}>
                    <tr key={"rowHeader"} style = {{height: "40px"}}>{this.renderHeader()}</tr>
                </thead>
                <tbody>{this.renderRows()}</tbody>
            </table>
        )
    }
}