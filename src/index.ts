#!/usr/bin/env node

import path from "path";
import TaskManager from "./taskManager";

//with the third element of array argv you can take the action
//of task-tracker, that would be an add, delete, update, list
const inputs = process.argv;

//this would be : add, delete, update or list
const command = inputs[2];

const taskManager = new TaskManager();

(async () => {
    await taskManager.init();
    switch (command) {
        case "add": {
            const addDescription = inputs[3];
            await taskManager.addTask(addDescription);
            break;
        }
        case "list": {
            const status = inputs[3];
            await taskManager.listTasks(status);
            break;
        }
        case "delete": {
            const idToDelete = parseInt(inputs[3]);
            await taskManager.deleteTask(idToDelete);
            break;
        }
        case "update": {
            const idToUpdate = parseInt(inputs[3]);
            const updateDescription = inputs[4];
            await taskManager.updateTask(idToUpdate, updateDescription);
            break;
        }
        case "mark-in-progress": {
            const idToMark = parseInt(inputs[3]);
            await taskManager.markTask("in-progress", idToMark);
            break;
        }
        case "mark-todo": {
            const idToMark = parseInt(inputs[3]);
            await taskManager.markTask("todo", idToMark);
            break;
        }
        case "mark-done": {
            const idToMark = parseInt(inputs[3]);
            await taskManager.markTask("done", idToMark);
            break;
        }
        default:
            console.log(`Not a valid operation for Task-Tracker`);
    }
})();

