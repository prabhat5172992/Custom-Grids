import React, { Component}  from 'react';
import If from './conditional';
import { CSSTransitionGroup } from 'react-transition-group';

export default class Toaster extends Component {

    constructor(props){
        super(props);
        this.toasterBody = this.toasterBody.bind(this);
    }

    toasterBody(){
        const style= (customColor) =>{
            return {width:"100%", height:"50px", "-webkit-animation": "fadein 1s", padding:"15px", paddingLeft:"50px", position: 'fixed', fontSize: 'large', zIndex: 2000, color:"white", backgroundColor: customColor}
        };
        return (<div>
            <If condition={this.props.status==="SUCCESS"}>
                <div style={style("green")}>
                    {this.props.message}
                </div>
            </If>
            <If condition={this.props.status==="ERROR"}>
                <div style={style("red")}>
                    {this.props.message}
                </div>
            </If>
            <If condition={this.props.status==="INFO"}>
                <div style={style("grey")}>
                    {this.props.message}
                </div>
            </If>
            <If condition={this.props.status==="WARNING"}>
                <div style={style("orange")}>
                    {this.props.message}
                </div>
            </If>
        </div>)
        };

    render(){
       setTimeout(()=>{
            document.getElementById("display").innerHTML = '';
       }, this.props.timeout)
        return (
            <CSSTransitionGroup
                transitionName="example"
                transitionEnterTimeout={200}
                transitionLeaveTimeout={200}
            >
                {<div id="display">{this.toasterBody()}</div>}
            </CSSTransitionGroup>
        );
    }
}