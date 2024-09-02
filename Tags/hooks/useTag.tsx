import { useState } from "react";
import { ITag } from "@fluentui/react/lib/Pickers";

export const useTag = (tagsDelimitor: string, onNotifyOutput: (tags?: string) => void, previousTags?: ITag[]) => {
    const [tagList, setTags] = useState<ITag[]>(previousTags ?? [])

    const onResolveSuggestions = async (filter: string, selectedItems: ITag[] | undefined): Promise<ITag[]> => {
        return [];
    };
    
    const onTagChanged = (items?: ITag[] | undefined) => {
        const uniqueItems = items?.filter((item, pos) => items.indexOf(item) == pos);
        uniqueItems && setTags(uniqueItems)

        const tagsInline = uniqueItems?.map(i => i.name).join(`${tagsDelimitor} `);
        onNotifyOutput(tagsInline);
    };

    const listContainsTag = (tag: ITag) => {
        if (!tagList || !tagList.length || tagList.length === 0) {
            return false;
        }

        return tagList.some(compareTag => compareTag.key.toString().toLowerCase() === tag.key.toString().toLowerCase());
    };

    return {
        tagList,
        onResolveSuggestions,
        onTagChanged,
        listContainsTag
    }
}