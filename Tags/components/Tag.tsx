import * as React from 'react';
import { IconButton, IPickerItemProps, ITag } from "@fluentui/react";

interface ITagProps extends IPickerItemProps<ITag>{
  backgroundColor: string
}

const Tag = (props: ITagProps) => {
  return ( 
    <div style={{ 
        display: 'flex', 
        flexDirection: 'row', 
        backgroundColor: props.backgroundColor, 
        alignItems: 'center',
        borderRadius: 8, 
        marginRight: 8 ,
        cursor: 'pointer'
      }}>
        <span style={{ textAlign: 'center', paddingLeft: 8, paddingRight: 8 }}>{props.item.name}</span>
        <IconButton onClick={props.onRemoveItem} iconProps={{ iconName: 'Cancel' }} color='white'/>
    </div> 
  );
}

export default Tag;