import * as React from "react";
import { PrimaryButton } from "@fluentui/react/lib/Button";

interface ITagSuggestionButtonProps {
  onAdd: () => void
}

const TagSuggestionButton = ({ onAdd }: ITagSuggestionButtonProps) => {
  return ( 
    <PrimaryButton 
      iconProps={{ iconName: 'Add' }}
      styles={{
        root: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'start',
          gap: 8,
          height: 30,
          width: '100%'
        }
      }} 
      text="Add new tag" 
      onClick={onAdd} />
  );
}

export default TagSuggestionButton;