import { createSignal } from "solid-js";
import { getUserTasks, createTask, completeTask, getCalendarTasks } from "../services/api";

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

// Ambil semua task user
export const fetchUserTasks = async (userId: string, token: string) => {
    try {
        const data = await getUserTasks(userId, token);
        setTasks(data.tasks);
    } catch (error) {
        console.error("Failed to fetch tasks:", error);
    }
};

// Tambah task baru
export const addTask = async (
    userId: string,
    token: string,
    taskData: Omit<Task, "id" | "userId" | "completed">
) => {
    try {
        const data = await createTask(userId, taskData, token);
        setTasks([...tasks(), data.task]);
    } catch (error) {
        console.error("Failed to add task:", error);
    }
};

// Tandai task selesai
export const markTaskComplete = async (taskId: string, token: string) => {
    try {
        await completeTask(taskId, token);
        setTasks(
            tasks().map((task) =>
                task.id === taskId ? { ...task, completed: true } : task
            )
        );
    } catch (error) {
        console.error("Failed to complete task:", error);
    }
};

// Ambil task untuk kalender
export const fetchCalendarTasks = async (userId: string, token: string) => {
    try {
        const data = await getCalendarTasks(userId, token);
        setCalendarTasks(data.tasks);
    } catch (error) {
        console.error("Failed to fetch calendar tasks:", error);
    }
};

export { tasks, calendarTasks };
