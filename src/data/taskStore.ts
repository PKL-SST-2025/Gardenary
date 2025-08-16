import { createSignal } from "solid-js";
import { getUserTasks, createTask, completeTask, getCalendarTasks } from "../services/api";
import { user } from "./authStore";

export interface Task {
    id: string;
    userId: string;
    plantId: string;
    type: string;
    description: string;
    dueDate: string;
    completed: boolean;
}

const [tasks, setTasks] = createSignal<Task[]>([]);
const [calendarTasks, setCalendarTasks] = createSignal<Record<string, any>>({});

export const fetchUserTasks = async () => {
    const currentUser = user();
    if (!currentUser) return;

    try {
        const data = await getUserTasks(currentUser.id, currentUser.token);
        setTasks(data.tasks);
    } catch (error) {
        console.error('Failed to fetch tasks:', error);
    }
};

export const addTask = async (taskData: Omit<Task, 'id' | 'userId' | 'completed'>) => {
    const currentUser = user();
    if (!currentUser) return;

    try {
        const data = await createTask(currentUser.id, taskData, currentUser.token);
        setTasks([...tasks(), data.task]);
    } catch (error) {
        console.error('Failed to add task:', error);
    }
};

export const markTaskComplete = async (taskId: string) => {
    const currentUser = user();
    if (!currentUser) return;

    try {
        await completeTask(taskId, currentUser.token);
        // Update local state
        setTasks(tasks().map(task => 
            task.id === taskId ? { ...task, completed: true } : task
        ));
    } catch (error) {
        console.error('Failed to complete task:', error);
    }
};

export const fetchCalendarTasks = async () => {
    const currentUser = user();
    if (!currentUser) return;

    try {
        const data = await getCalendarTasks(currentUser.id, currentUser.token);
        setCalendarTasks(data.tasks);
    } catch (error) {
        console.error('Failed to fetch calendar tasks:', error);
    }
};

export { tasks, calendarTasks };
