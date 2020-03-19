import React from "react";
import { Component } from "react";
import MenuTask from '../../components/MenuTask/MenuTask';
import {toast} from 'react-toastify';
import TaskHandler from '../../handlers/task';

class Task extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            index:this.props.index,
            id:this.props.task._id,
            importantcyLevel:this.props.task.importantcyLevel,
            description:this.props.task.description,
            date:this.props.task.date,
            menuVisible:false,
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleClose(e){
        e.stopPropagation(); //do not call handle Click
        this.setState({menuVisible:false});
    }

    async handleEdit(e,newDesc){
        e.stopPropagation(); //do not call handle Click
        let res = await TaskHandler.editTask(newDesc,this.state.id,this.props.cookies.get("token"));
        if(res.success){
            toast.success(res.message);
            //update the global state
            this.setState({menuVisible:false},() => {
                this.props.editTaskFromCell({description:newDesc},this.state.index);
            });
        }
        else{
            toast.error("The task no longer exists.");
        }
    }

    async handleDelete(e){
        e.stopPropagation(); //do not call handle Click
        let res = await TaskHandler.deleteTask(this.state.id,this.props.cookies.get("token"));
        if(res.success){
            toast.success(res.message);
            //update the global state
            this.setState({menuVisible:false},() => {
                this.props.removeTaskFromCell(this.state.index);
            });
        }
        else{
            toast.error("The task no longer exists.");
        }
    }

    handleClick(){
        this.setState({menuVisible:true})
    }

    render(){
        let menu = <MenuTask handleEdit={this.handleEdit} handleDelete={this.handleDelete} handleClose={this.handleClose} visible={this.state.menuVisible} cookies={this.props.cookies} description={this.state.description} />
        switch(this.state.importantcyLevel){
            default:{
                return <div className="blue" onClick={this.handleClick}>{menu}</div>
            }

            case 1:{
                return <div className="blue" onClick={this.handleClick}>{menu}</div>
            }
            case 2:{
                return <div className="yellow" onClick={this.handleClick}>{menu}</div>
            }
            case 3:{
                return <div className="red" onClick={this.handleClick}>{menu}</div>
            }
        }
    }
}

export default Task;