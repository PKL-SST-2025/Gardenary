import { createSignal } from "solid-js";

export const [selectedDate, setSelectedDate] = createSignal<string>(new Date().toISOString().split("T")[0]);
