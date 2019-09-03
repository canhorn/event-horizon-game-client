export interface IGui {
    guiId: string;
    layoutId: string;
    dispose(): void;
    activate(): void;
    hide(): void;
    show(): void;
    /**
     * This is used to connect a GUI to a world elements, ie Mesh
     * @param obj The object that this GUi should be "linked" to.
     */
    linkWith(obj: any): void;
}
