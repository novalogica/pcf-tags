import * as React from "react";
import * as ReactDOM from 'react-dom';
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import TagPickerComponent, { ITagProps } from "./components/TagPicker";
import { ITag } from "@fluentui/react";

export class TagControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private container: HTMLDivElement;
    private notifyOutputChanged: () => void;
    private tags: string;

    constructor()
    {
    }

    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void
    {
        this.container = container;
        this.notifyOutputChanged = notifyOutputChanged;
        this.renderControl(context);
    }


    public updateView(context: ComponentFramework.Context<IInputs>): void
    {
        this.renderControl(context);
    }

    private renderControl(context: ComponentFramework.Context<IInputs>): void {
        const props: ITagProps  = {
            tags: this.handlePreviousTags(context.parameters.tags.raw ?? ""),
            onTagsChanged: this.handleTagsUpdate
        }

        ReactDOM.render(React.createElement(TagPickerComponent, props), this.container);
    }

    private handlePreviousTags(tags: string): ITag[] | undefined {
        if(!tags)
            return;

        return tags.split(',').map((tag) => ({ key: tag, name: tag}))
    }

    private handleTagsUpdate(tags: string): void {
        this.tags = tags;
        this.notifyOutputChanged();
    }

    public getOutputs(): IOutputs
    {
        return { tags: this.tags  };
    }

    public destroy(): void
    {
    }
}
