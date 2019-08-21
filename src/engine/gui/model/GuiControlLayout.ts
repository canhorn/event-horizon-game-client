export interface GuiControlLayout {
    id: string;
    sort: number;
    layer?: number;
    controlList?: GuiControlLayout[];
}
