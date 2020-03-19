const initialState = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: -1,
    fetched:false,
    fetchedMobile:false,
    cells:[],
    cellsMobile:[],
    created:{
        index: -1,
    },
    deleted:{
        cellIndex: -1,
        taskIndex: -1,
    },
    edited:{
        cellIndex: -1,
        taskIndex: -1,
    }
}

const scheduleReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_SCHEDULE_CELLS":{
            return {...state,cells:action.payload,fetched: true}
        }
        case "SET_SCHEDULE_CELLS_MOBILE":{
            return {...state,cellsMobile:action.payload,fetchedMobile: true}
        }
        case "SET_SCHEDULE_DAY":{
            return {...state,day: action.payload};
        }
        case "ADD_SCHEDULE_TASK_TO_CELL":{
            if(window.innerWidth > 1090){ //desktop
                if(state.cells[action.payload.index].props.tasks)
                    state.cells[action.payload.index].props.tasks.push(action.payload.task);
            }
            else{
                state.cellsMobile[action.payload.index].props.tasks.push(action.payload.task);
            }
            return {...state,created:{
                index: action.payload.index,
            }};
        }
        case "CONFIRM_SCHEDULE_TASK_TO_CELL_CREATED":{
            return {...state,created:{
                index: -1,
                task:null
            }};
        }
        case "REMOVE_SCHEDULE_TASK_FROM_CELL":{
            let cells = state.cells;
            if(state.cells[action.payload.cellIndex].props.tasks){
                cells = [...state.cells];
                cells[action.payload.cellIndex].props.tasks.splice(action.payload.taskIndex,1);
            }
            return {...state,cells,deleted:{
                cellIndex: action.payload.cellIndex,
                taskIndex: action.payload.taskIndex
            }};
        }
        case "CONFIRM_SCHEDULE_TASK_FROM_CELL_DELETED":{
            return {...state,deleted:{
                cellIndex: -1,
                taskIndex: -1,
            }};
        }

        case "EDIT_SCHEDULE_TASK_FROM_CELL":{
            let cells = state.cells;
            if(state.cells[action.payload.cellIndex].props.tasks){
                cells = [...state.cells];
                cells[action.payload.cellIndex].props.tasks[action.payload.taskIndex].description = action.payload.newData.description;
            }
            return {...state,cells,edited:{
                cellIndex: action.payload.cellIndex,
                taskIndex: action.payload.taskIndex
            }};
        }

        case "CONFIRM_SCHEDULE_TASK_FROM_CELL_EDITED":{
            return {...state,edited:{
                cellIndex: -1,
                taskIndex: -1,
            }};
        }

        case "INCREMENT_SCHEDULE_YEAR":{
            return {...state,year:++state.year};   
        }

        case "DECREMENT_SCHEDULE_YEAR":{
            return {...state,year:--state.year};   
        }
        
        case "INCREMENT_SCHEDULE_MONTH":{
            return {...state,month:++state.month > 12 ? 12 : state.month};   
        }

        case "DECREMENT_SCHEDULE_MONTH":{
            return {...state,month:--state.month < 1 ? 1 : state.month};   
        }

        default: {
            return {...state};
        }
    }
}

export default scheduleReducer;