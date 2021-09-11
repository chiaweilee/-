export const getPropsFromChildren = (children: string): any[] => {
  if (typeof children === 'string') {
    return children.split('\n');
  }
  return [];
};

export const getPropsFromInline = (props: string): any => {
  if (typeof props === 'string') {
    const propsResult = {};
    const propsList = props.split(';');
    propsList.forEach((prop) => {
      if (typeof prop === 'string') {
        const [key, value] = prop.split(':');
        if (key) {
          propsResult[key] = typeof value === 'undefined' ? true : value;
        }
      }
    });
    return propsResult;
  }
  return {};
};

export const getListFromInline = (inline: string): any[] => {
  if (typeof inline === 'string') {
    return inline.split('|');
  }
  return [];
};
