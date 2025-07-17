// models/Plant.ts
export type PlantStatus = {
  watered: boolean;
  fertilized: boolean;
  harvested: boolean;
};

export type Plant = {
  id: number;
  name: string;
  type: string;
  age: number;
  plantedDate: Date;
  image?: string;
  status: {
    [date: string]: {
      watered: boolean;
      fertilized: boolean;
      harvested: boolean;
    };
  };
};
