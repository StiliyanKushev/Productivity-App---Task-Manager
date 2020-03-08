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

export {
    setDay,
    setCells,
    addTaskToCell,
    confirmCreated
};