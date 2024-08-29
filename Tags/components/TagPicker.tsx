import * as React from "react";
import { useTag } from "../hooks/useTag";
import { IPickerItemProps, ITag, TagPicker } from "@fluentui/react/lib/Pickers";
import { useState } from "react";
import Tag from "./Tag";

export interface ITagProps {
    tags: ITag[] | undefined,
    tagsLimit?: number,
    tagBackgroundColor: string
    onTagsChanged: (tags: string) => void
}

const TagPickerComponent = ({ tags, tagsLimit, tagBackgroundColor, onTagsChanged }: ITagProps) => {
    const { tagList, onCreateTag, onTagsUpdated, onResolveSuggestions } = useTag(tags, tagsLimit);
    
    const onInputChanged = (ev: React.KeyboardEvent<HTMLInputElement>) => {
        const tags = onCreateTag(ev);
        tags && onTagsChanged(tags)
    }

    const onChange = (items?: ITag[]) => {
        const tags = onTagsUpdated(items);
        tags && onTagsChanged(tags)
    };

    return (
        <TagPicker
            selectedItems={tagList}
            onChange={onChange}
            onResolveSuggestions={onResolveSuggestions}
            getTextFromItem={(item: ITag) => item.name}
            onRenderItem={(props: IPickerItemProps<ITag>) => <Tag key={props.key} {...props} backgroundColor={tagBackgroundColor} />}
            pickerSuggestionsProps={{ suggestionsHeaderText: '', noResultsFoundText: '' }}
            inputProps={{
                placeholder: "Type and press Enter to add a tag",
                onKeyDown: onInputChanged,
            }}
        />
    );
}

export default TagPickerComponent;