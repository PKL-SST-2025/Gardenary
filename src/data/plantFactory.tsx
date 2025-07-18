import type { Plant } from "../data/plant";
import { getTodayDate } from "../data/date";

export function createPlant(name: string, type: string, image?: string): Plant {
  return {
    id: Date.now(),
    name,
    type,
    age: 0,
    plantedDate: new Date(),
    image,
    status: {
      [getTodayDate()]: {
        watered: false,
        fertilized: false,
        harvested: false,
      },
    },
  };
}
