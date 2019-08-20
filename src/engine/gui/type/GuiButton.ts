import { EventState, Mesh, Observer } from 'babylonjs';
import { Button, Rectangle, TextBlock, Vector2WithInfo } from 'babylonjs-gui';
import {
    isObjectDefined,
    returnIfDefined,
} from '../../../core/object/ObjectCheck';
import objectMerge from '../../../core/object/ObjectMerge';
import {
    GuiControl,
    GuiControlOptions,
    GuiControlType,
    GuiGridLocation,
} from '../model';

// TODO: Clean up create and update
export class GuiButton implements GuiControl {
    public id: string;
    public options: GuiButtonControlOptions;
    public control: Rectangle;
    public parentId?: string;
    public gridLocation?: GuiGridLocation;
    get type(): GuiControlType {
        return GuiControlType.Button;
    }
    get isVisible(): boolean {
        return this.control.isVisible;
    }
    set isVisible(value: boolean) {
        this.control.isVisible = value;
    }

    constructor(
        id: string,
        controlOptions: GuiControlOptions,
        gridLocation?: GuiGridLocation
    ) {
        this.id = id;
        const { background, options } = createControl(
            id,
            controlOptions as GuiButtonControlOptions
        );
        this.control = background;
        this.options = options;
        this.gridLocation = gridLocation;
    }
    public addControl(guiControl: GuiControl) {
        throw new Error('GuiButton does not support adding of child Controls.');
    }
    public update(options: GuiButtonControlOptions) {
        if (isObjectDefined(options.text)) {
            const text: TextBlock = (this.control.getChildByName(
                `${this.id}-Button`
            ) as Button).getChildByName(`${this.id}-Text`) as TextBlock;
            text.text = options.text;
        }
        if (isObjectDefined(options.onClick)) {
            const button = this.control.getChildByName(
                `${this.id}-Button`
            ) as Button;
            if (isObjectDefined(this.options.onClick)) {
                button.onPointerClickObservable.clear();
            }
            this.options.onClick = options.onClick;
            this.options.onClickObserver = button.onPointerClickObservable.add(
                options.onClick
            );
        }
        this.options = objectMerge(this.options, options);
        this.control = updateControl(
            this.id,
            this.control as Rectangle,
            this.options
        );
    }
    public linkWithMesh(mesh: Mesh) {
        this.control.linkWithMesh(mesh);
    }
    public dispose() {
        this.control.children.forEach(control => control.dispose());
        this.control.dispose();
    }
}

const updateControl = (
    idPrefix: string,
    background: Rectangle,
    options: GuiButtonControlOptions
): Rectangle => {
    background.isVisible = isObjectDefined(options.isVisible)
        ? options.isVisible
        : background.isVisible;
    const text: TextBlock = (background.getChildByName(
        `${idPrefix}-Button`
    ) as Button).getChildByName(`${idPrefix}-Text`) as TextBlock;

    text.text = returnIfDefined(options.text, text.text);
    text.color = returnIfDefined(options.textColor, text.color);
    text.fontSize = returnIfDefined(options.textSize, text.fontSize);
    text.textHorizontalAlignment = returnIfDefined(
        options.alignment,
        text.horizontalAlignment
    );
    text.textVerticalAlignment = returnIfDefined(
        options.vAlignment,
        text.textVerticalAlignment
    );

    text.paddingTop = returnIfDefined(options.paddingTop, text.paddingTop);
    text.paddingBottom = returnIfDefined(
        options.paddingBottom,
        text.paddingBottom
    );
    text.paddingLeft = returnIfDefined(options.paddingLeft, text.paddingLeft);
    text.paddingRight = returnIfDefined(
        options.paddingRight,
        text.paddingRight
    );

    const button: Button = background.getChildByName(
        `${idPrefix}-Button`
    ) as Button;

    button.horizontalAlignment =
        options.alignment || button.horizontalAlignment || 0;
    button.verticalAlignment =
        options.vAlignment || button.verticalAlignment || 0;
    button.height = options.height || button.height;
    button.width = options.width || button.width;
    button.isEnabled = isObjectDefined(options.isDisabled)
        ? !options.isDisabled
        : button.isEnabled;
    button.background = button.isEnabled
        ? options.backgroundColor || button.background
        : options.disabledColor || button.disabledColor;
    button.thickness = options.borderThickness;
    button.hoverCursor = button.isEnabled
        ? options.hoverCursor || button.hoverCursor || 'pointer'
        : options.disabledHoverCursor || button.hoverCursor || 'default';

    return background;
};

const createControl = (
    idPrefix: string,
    options: GuiButtonControlOptions
): { background: Rectangle; options: GuiButtonControlOptions } => {
    let background = new Rectangle(`${idPrefix}-Background`);
    background.adaptHeightToChildren = true;
    background.adaptWidthToChildren = true;
    background.thickness = 0;
    const button = new Button(`${idPrefix}-Button`);
    background.addControl(button);

    const text1 = new TextBlock(`${idPrefix}-Text`);
    text1.width = '100%';
    // text1.height = "100%";
    text1.text = options.text;
    text1.color = options.textColor;
    text1.fontSize = options.textSize;
    text1.textHorizontalAlignment =
        options.alignment || text1.horizontalAlignment || 0;
    text1.textVerticalAlignment =
        options.vAlignment || text1.textVerticalAlignment || 0;
    // text1.resizeToFit = true;
    text1.textWrapping = true;
    button.addControl(text1);

    background = updateControl(idPrefix, background, options);
    options.onClickObserver = button.onPointerClickObservable.add(
        options.onClick
    );

    return { background, options };
};
export interface GuiButtonControlOptions extends GuiControlOptions {
    text: string;
    textSize: number;
    textColor: string;
    height: number | string;
    backgroundColor: string;
    disabledColor: string;
    alignment: 0 | 1 | 2;
    onClick: (eventData: Vector2WithInfo, eventState: EventState) => void;
    onClickObserver: Observer<Vector2WithInfo> | null;

    isVisible?: boolean;
    isDisabled?: boolean;
    width?: number | string;
    paddingRight?: number | string;
    paddingLeft?: number | string;
    paddingBottom?: number | string;
    paddingTop?: number | string;
    hoverCursor?: string;
    disabledHoverCursor?: string;
    vAlignment?: 0 | 1 | 2;
    borderThickness: number;
    linkOffsetY?: number;
}
