async function getTasks(year,month,token){
    const raw = await fetch(`http://192.168.1.132:8080/feed/tasks/get/${year}/${month}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': token
        },
        // body: JSON.stringify(data)
    });

    let res = await raw.json();
    
    return res;
}

async function createTask(date,importantcyLevel,description,token){
    const raw = await fetch(`http://192.168.1.132:8080/feed/tasks/create/`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': token
        },
        body: JSON.stringify({
            date,
            importantcyLevel,
            description
        })
    });

    let res = await raw.json();
    return res;
}


const TaskHandler = {
    getTasks,
    createTask,
};

export default TaskHandler;