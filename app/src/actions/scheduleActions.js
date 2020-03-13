const setCells = (cells) => {
    return {
        type: "SET_SCHEDULE_CELLS",
        payload: cells
    }
}

const setDay = (day) => {
    return {
        type: "SET_SCHEDULE_DAY",
        payload: day
    }
}

const addTaskToCell = (index,task) => {
    return {
        type: "ADD_SCHEDULE_TASK_TO_CELL",
        payload: {index,task}
    }
}

const confirmCreated = () => {
    return {
        type: "CONFIRM_SCHEDULE_TASK_TO_CELL_CREATED"
    }
}

const confirmDeleted = () => {
    return {
        type: "CONFIRM_SCHEDULE_TASK_FROM_CELL_DELETED"
    }
}

const removeTaskFromCell = (cellIndex,taskIndex) => {
    return {
        type: "REMOVE_SCHEDULE_TASK_FROM_CELL",
        payload: {
            cellIndex,
            taskIndex
        }
    }
}

export {
    setDay,
    setCells,
    addTaskToCell,
    confirmCreated,
    removeTaskFromCell,
    confirmDeleted
};