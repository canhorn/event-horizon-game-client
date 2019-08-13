export interface ILightSettings {
    name: string;
    tags: string[];
    enableDayNightCycle: boolean;
    type: "point" | "hemispheric";
}
