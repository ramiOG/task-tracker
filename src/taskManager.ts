import { table } from "console";
import { stat } from "fs";
import { readFile, writeFile } from "fs/promises";
import { dateFormatter } from "./utils";

const PATH_FILE = "./tasks.json";

type Task = {
    id: number;
    description: string;
    status: "todo" | "done" | "in-progress";
    createdAt: string;
    updatedAt: string;
}

class TaskManager {
    private tasks: Task[] = [];

    constructor() {
        this.init();
    }
    async init() {
        try {
            const data = await readFile(PATH_FILE, "utf-8");
            this.tasks = JSON.parse(data) || [];
        } catch (error) {
            console.error("Initializing with empty task list due to error:", error);
            this.tasks = [];
        }
    }

    private async loadTasks() {
        try {
            const data = await readFile(PATH_FILE, "utf-8");
            this.tasks = JSON.parse(data) || [];
        } catch (error) {
            console.error("Error loading tasks:", error);
            throw new Error("Could not load tasks. Make sure the file exists and is accessible.");
        }
    }

    async saveTasks() {
        try {
            await writeFile(PATH_FILE, JSON.stringify(this.tasks, null, 2));
        } catch (error) {
            console.error("Error saving tasks:", error);
        }
    }

    async addTask(description: string) {
        await this.loadTasks();
        let idCalculated = this.tasks.length ? this.tasks[this.tasks.length - 1].id + 1 : 1;

        const newTask: Task = {
            id: idCalculated,
            description,
            status: "todo",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        console.log(`Task added successfully (ID: ${idCalculated})`);

        this.tasks.push(newTask);
        await this.saveTasks();
    }

    async listTasks(status?: string) {
        if (this.tasks.length === 0) {
            console.log("No tasks available.");
            return;
        }

        // Map tasks and format the dates
        const tasksByStatus = status
            ? this.tasks.filter((task) => task.status === status)
            : this.tasks;

        if (tasksByStatus.length === 0) {
            console.log(`No tasks available with status: ${status}`);
            return;
        }

        const tableData = tasksByStatus.map(({ id, description, status, createdAt, updatedAt }) => ({
            ID: id,
            Description: description,
            Status: status,
            "Created At": dateFormatter.format(new Date(createdAt)),
            "Updated At": dateFormatter.format(new Date(updatedAt)),
        }));

        // Specify the columns to show, omitting the index column
        console.table(tableData, ["ID", "Description", "Status", "Created At", "Updated At"]);
    }




    async updateTask(idTask: number, description: string) {
        const taskIndex = this.tasks.findIndex((task) => task.id === idTask);
        if (taskIndex === -1) {
            console.log(`Task with ID ${idTask} not found`);
            return;
        }
        this.tasks[taskIndex].description = description;
        await this.saveTasks();
        console.log(`Task with ID ${idTask} updated!`);

    }

    async deleteTask(idTask: number) {
        const taskIndex = this.tasks.findIndex((task) => task.id === idTask);
        if (taskIndex === -1) {
            console.log(`Task with ID ${idTask} not found`);
            return;
        }
        this.tasks.splice(taskIndex, 1);
        await this.saveTasks();
        console.log(`Task with ID ${idTask} deleted!`);
    }
    async markTask(status: "todo" | "done" | "in-progress", idTask: number) {
        const taskIndex = this.tasks.findIndex((task) => task.id === idTask);
        if (taskIndex === -1) {
            console.log(`Task with ID ${idTask} not found`);
            return;
        }
        const now = new Date().toISOString;
        this.tasks[taskIndex].status = status;
        this.tasks[taskIndex].updatedAt = new Date().toISOString(); ;
        
        await this.saveTasks();
        console.log(`Task with ID ${idTask} was changed to ${status}`);

    }
}

export default TaskManager;