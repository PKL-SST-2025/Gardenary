import { createSignal } from "solid-js"
import type { Plant } from "../data/plant";
import paprika from "../assets/paprika.png";
import { getTodayDate } from "../data/date";

const initialPlants: Plant[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: "Paprika",
  type: "Vegetable",
  age: 110,
  image: paprika,
  status: {
    [getTodayDate()]: {
      watered: false,
      fertilized: false,
      harvested: false,
    },
  },
}));

const [plants, setPlants] = createSignal<Plant[]>(initialPlants);

export { plants, setPlants };
