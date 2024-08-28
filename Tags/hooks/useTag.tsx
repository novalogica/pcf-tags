import { useState } from "react";
import { ITag } from "@fluentui/react/lib/Pickers";

export const useTag = (previousTags?: ITag[]) => {
    const [tagList, setTags] = useState<ITag[]>(previousTags ?? [])

    const onTagsUpdated = (items?: ITag[]) => {
        if (items) {
            setTags(items);
        }
    };
    
    const onResolveSuggestions = (filter: string): ITag[] => {
        return tagList;
    };

    const listContainsTagList = (tag: ITag, tagList?: ITag[]) => {
        if (!tagList || !tagList.length || tagList.length === 0) {
          return false;
        }

        return tagList.some(compareTag => compareTag.key === tag.key);
      };

    return {
        tagList,
        onTagsUpdated,
        onResolveSuggestions,
    }
}