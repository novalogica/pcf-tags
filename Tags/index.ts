import * as React from "react";
import * as ReactDOM from 'react-dom';
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { ITag } from "@fluentui/react";
import TagsPicker, { ITagPickerProps } from "./components/TagPicker";

export class TagControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private container: HTMLDivElement;
    private notifyOutputChanged: () => void;
    private _tags: string;

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
        const delimitor = context.parameters.tagsDelimitor.raw ?? ',';

        const props: ITagPickerProps  = {
            tags: this.handlePreviousTags(delimitor, context.parameters.tags.raw ?? ""),
            tagsLimit: context.parameters.tagsLimit.raw ? parseInt(context.parameters.tagsLimit.raw) : undefined,
            tagsDelimitor: context.parameters.tagsDelimitor.raw ?? ',',
            tagBackgroundColor: context.parameters.tagsColor.raw ?? "#0F6CBD",
            setOutput: this.handleTagsUpdate
        }

        this.handleTagsUpdate = this.handleTagsUpdate.bind(this);
        ReactDOM.render(React.createElement(TagsPicker, props), this.container);
    }

    private handlePreviousTags(delimitor: string, tags: string): ITag[] | undefined {
        if(!tags)
            return;

        this._tags = tags;
        return tags.split(`${delimitor} `).map((tag) => ({ key: tag, name: tag}))
    }

    public handleTagsUpdate(updatedsTags?: string): void {
        this._tags = updatedsTags ?? "";
        this.notifyOutputChanged();
    }

    public getOutputs(): IOutputs
    {
        return { tags: this._tags  };
    }

    public destroy(): void
    {
    }
}
