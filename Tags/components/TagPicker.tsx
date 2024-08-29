import * as React from 'react';
import { createRef } from 'react';
import TagSuggestionButton from './TagSuggestionButton';
import { inputProps, toggleStyles } from './styles';
import { useTag } from '../hooks/useTag';
import Tag from './Tag';
import { IBasePicker, IBasePickerSuggestionsProps, IPickerItemProps, ITag, TagPicker, ValidationState } from '@fluentui/react/lib/Pickers';

export interface ITagPickerProps {
    tags: ITag[] | undefined,
    tagsLimit?: number,
    tagBackgroundColor: string
    setOutput: (tags?: string) => void
}

const tagPickerRef = createRef<IBasePicker<ITag>>();

const TagsPicker = ({ tags, tagsLimit, tagBackgroundColor, setOutput } : ITagPickerProps) => {
  const { tagList, onTagChanged, onResolveSuggestions, listContainsTag } = useTag(setOutput, tags);

  const onRenderItem = (props: IPickerItemProps<ITag>) => {
    return <Tag key={props.key} {...props} backgroundColor={tagBackgroundColor} />
  }

  const pickerSuggestionsProps: IBasePickerSuggestionsProps = {
    onRenderNoResultFound: () => <TagSuggestionButton onAdd={() => tagPickerRef.current?.completeSuggestion(true)} />,
  };

  const onItemSelected = (item?: ITag | undefined): ITag | PromiseLike<ITag> | null => {
    if(!item || listContainsTag(item))
      return null;

    return item;
  }

  const onValidateInput = (input: string) => {
    return input ? ValidationState.valid : ValidationState.invalid
  }
  
  return (
    <TagPicker
      defaultSelectedItems={tagList}
      itemLimit={tagsLimit}
      styles={toggleStyles}
      componentRef={tagPickerRef}
      inputProps={inputProps}
      pickerSuggestionsProps={pickerSuggestionsProps}
      onResolveSuggestions={onResolveSuggestions}
      onRenderItem={onRenderItem}
      onChange={onTagChanged}
      onValidateInput={onValidateInput}
      getTextFromItem={(item: ITag) => item.name}
      createGenericItem={(input: string) => ({ key: input, name: input } as ITag) }
      onItemSelected={onItemSelected}
    />
  );
};

export default TagsPicker;