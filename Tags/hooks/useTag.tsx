import { useState } from "react";
import { ITag } from "@fluentui/react/lib/Pickers";

export const useTag = (previousTags?: ITag[], tagsLimit?: number, ) => {
    const [tagList, setTags] = useState<ITag[]>(previousTags ?? [])

    const onCreateTag = (ev: React.KeyboardEvent<HTMLInputElement>): string | undefined => {
        const userInput = ev.currentTarget.value;
        
        if (ev.key != "Enter" || userInput.trim().length <= 0 || (tagsLimit && tagList.length >= tagsLimit))
            return;
        
        ev.preventDefault();
        const tag = { key: userInput, name: userInput };

        if(listContainsTag(tag))
            return;

        const updatedTags = [...tagList, tag];
        setTags(updatedTags);
        ev.currentTarget.value = "";
        return updatedTags.map((t) => t.key).join(',');
    };

    const onTagsUpdated = (items?: ITag[]): string | undefined => {
        if (!items) {
            return;
        }
            
        setTags(items);
        return items.map((t) => t.key).join(',');
    };
    
    const onResolveSuggestions = (filter: string): ITag[] => {
        return [];
    };

    const listContainsTag = (tag: ITag) => {
        if (!tagList || !tagList.length || tagList.length === 0) {
            return false;
        }

        return tagList.some(compareTag => compareTag.key.toString().toLowerCase() === tag.key.toString().toLowerCase());
    };

    return {
        tagList,
        onCreateTag,
        onTagsUpdated,
        onResolveSuggestions,
    }
}