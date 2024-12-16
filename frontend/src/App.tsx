import { useEffect, useState } from "react";
import "./App.css";
import { Task, TaskStatus } from "./App.type";
import { addNewTask, getTaskList, updateTask } from "./api";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskName, setNewTaskName] = useState<string>("");
  const [activeListId, setActiveListId] = useState<number>(1);

  useEffect(() => {
    const fetchTasksByListId = async () => {
      const tasksInList = await getTaskList(activeListId);
      setTasks(tasksInList);
    };
    fetchTasksByListId();
  }, [activeListId]);

  const addTask = async (name: string, listId: number) => {
    if (!newTaskName) {
      return;
    }
    const newTask = await addNewTask(name, listId);
    setTasks([...tasks, newTask]);
    setNewTaskName("");
  };

  const markAsDone = async (id: number) => {
    const updatedTask = await updateTask(id, TaskStatus.Done);
    setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
  };

  const markAsUndone = async (id: number) => {
    const updatedTask = await updateTask(id, TaskStatus.Todo);
    setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
  };

  return (
    <div>
      <h2>ToDo App</h2>
      <select
        name="list"
        id="list"
        onChange={(e) => setActiveListId(Number(e.target.value))}
      >
        <option value="1">List 1</option>
        <option value="2">List 2</option>
        <option value="3">List 3</option>
      </select>
      <div className="addNewTask">
        <input
          type="text"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          placeholder="Add new task"
        />
        <button onClick={() => addTask(newTaskName, activeListId)}>Add</button>
      </div>
      <h3>Tasks</h3>
      <table className="taskItems">
        <tbody>
          {tasks
            .filter((task) => task.status === TaskStatus.Todo)
            .map((task) => (
              <tr key={task.id}>
                <td>{task.name}</td>
                <td>
                  <button onClick={() => markAsDone(task.id)}>
                    Mark as done
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <h3>Done</h3>
      <table className="taskItems">
        <tbody>
          {tasks
            .filter((task) => task.status === TaskStatus.Done)
            .map((task) => (
              <tr key={task.id}>
                <td>{task.name}</td>
                <td>
                  <button onClick={() => markAsUndone(task.id)}>
                    Mark as undone
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
