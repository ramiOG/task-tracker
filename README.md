# Task Tracker CLI

A simple command-line interface (CLI) tool for managing tasks.

## Features
- Add, delete, update tasks.
- Mark tasks as `todo`, `in-progress`, or `done`.
- List tasks by status.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/task-tracker.git

2. Install dependencies:

   ```bash
    npm install

3. Link the CLI globally:
   ```bash
    npm link

## Usage

Run commands using the ``` task-tracker ``` keyword:

* Add a task
    ```bash
    task-tracker add "New task description"
* List tasks:
    ```bash
    task-tracker list todo
* Update a task:
     ```bash
    task-tracker update 1 "Updated description"
* Delete a task:
     ```bash
    task-tracker delete 1
* Mark a task as "in-progress":
     ```bash
    task-tracker mark-in-progress 1
* Mark a task as "done":
     ```bash
    task-tracker mark-done 1

### Project page URL
    https://roadmap.sh/projects/task-tracker  
