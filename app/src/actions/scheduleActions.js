const setCells = (cells) => {
	return {
		type: "SET_SCHEDULE_CELLS",
		payload: cells
	}
}

const setCellsMobile = (cells) => {
	return {
		type: "SET_SCHEDULE_CELLS_MOBILE",
		payload: cells
	}
}

const setDay = (day) => {
	return {
		type: "SET_SCHEDULE_DAY",
		payload: day
	}
}

const addTaskToCell = (index, task) => {
	return {
		type: "ADD_SCHEDULE_TASK_TO_CELL",
		payload: {
			index,
			task
		}
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

const confirmEdited = () => {
	return {
		type: "CONFIRM_SCHEDULE_TASK_FROM_CELL_EDITED"
	}
}

const removeTaskFromCell = (cellIndex, taskIndex) => {
	return {
		type: "REMOVE_SCHEDULE_TASK_FROM_CELL",
		payload: {
			cellIndex,
			taskIndex
		}
	}
}

const editTaskFromCell = (newData, cellIndex, taskIndex) => {
	return {
		type: "EDIT_SCHEDULE_TASK_FROM_CELL",
		payload: {
			cellIndex,
			taskIndex,
			newData
		}
	}
}

const incrementYear = () => {
	return {
		type: "INCREMENT_SCHEDULE_YEAR"
	}
}

const decrementYear = () => {
	return {
		type: "DECREMENT_SCHEDULE_YEAR"
	}
}

const incrementMonth = () => {
	return {
		type: "INCREMENT_SCHEDULE_MONTH"
	}
}

const decrementMonth = () => {
	return {
		type: "DECREMENT_SCHEDULE_MONTH"
	}
}

export {
	setDay,
	setCells,
	setCellsMobile,
	addTaskToCell,
	confirmCreated,
	removeTaskFromCell,
	confirmDeleted,
	editTaskFromCell,
	confirmEdited,
	incrementYear,
	incrementMonth,
	decrementYear,
	decrementMonth,
};