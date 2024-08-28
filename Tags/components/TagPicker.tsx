import * as React from "react";
import { useTag } from "../hooks/useTag";
import { IBasePickerSuggestionsProps, ITag, TagPicker } from "@fluentui/react/lib/Pickers";
import { useMemo } from "react";

export interface ITagProps {
    tags: ITag[] | undefined,
    onTagsChanged: (tags: string) => void
}

const suggestionProps: IBasePickerSuggestionsProps = {
    suggestionsHeaderText: 'Suggested tags',
    noResultsFoundText: 'No color tags found',
};


const TagPickerComponent = ({ tags, onTagsChanged }: ITagProps) => {
    const { tagList, onTagsUpdated, onResolveSuggestions } = useTag(tags);
    
    const onKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
        if (ev.key != "Enter")
            return;

        ev.preventDefault();
        const userInput = ev.currentTarget.value;

        if (userInput.trim().length > 0) {
            const newItem = { key: userInput, name: userInput };
            const updatedItems = [...tagList, newItem];
            onTagsUpdated(updatedItems);
            handleTagsUpdate(updatedItems);
        }
    };

    const handleTagsUpdate = (tags: ITag[]) => {
        var mappedTags = tags.map((t) => t.key).join(',');
        onTagsChanged(mappedTags);
    }

    return (
        <TagPicker
            selectedItems={tagList}
            onChange={onTagsUpdated}
            onResolveSuggestions={onResolveSuggestions}
            getTextFromItem={(item: ITag) => item.name}
            pickerSuggestionsProps={suggestionProps}
            inputProps={{
                placeholder: "Type and press Enter to add a tag",
                onKeyDown: onKeyDown,
            }}
            removeButtonAriaLabel="Remove"
        />
    );
}
 
export default TagPickerComponent;