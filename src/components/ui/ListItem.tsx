import type {
  ElementBaseSize,
  ElementStatus,
  PropsWithChildren,
} from '../../types';

import type { FloatingItem } from '../../types/ui';

import Box from '../Box';
import Checkbox from '../form/Checkbox';
import Radio from '../form/Radio';

type ListItemProps = PropsWithChildren<
  Omit<
    Omit<ElementStatus, 'isLoading'> &
      Omit<FloatingItem, 'id' | 'content'> &
      React.ComponentPropsWithoutRef<'li'>,
    'children'
  >
>;

interface ListItemTextProps extends ListItemProps {
  id: string;
  size?: ElementBaseSize;
}

interface ListItemInputProps extends Omit<ListItemTextProps, 'onChange'> {
  onChange?: (checked: boolean) => void;
}

const ListItemWrapper = ({
  children,
  id,
  elemBefore,
  elemAfter,
  ...props
}: ListItemProps) => {
  const { isDisabled = false, isSelected = false, ...restProps } = props;

  return (
    <li
      {...restProps}
      id={id}
      onClick={e => !isDisabled && restProps.onClick?.(e)}
      className={`flex w-full gap-x-2 border-l-2 px-3 py-1.5 transition-colors group ${
        isDisabled
          ? 'disabled'
          : `${
              isSelected
                ? 'border-light-blue bg-light-secondary dark:border-dark-blue dark:bg-dark-tertiary'
                : 'border-transparent'
            } cursor-pointer hover:border-light-blue hover:bg-light-secondary dark:hover:border-dark-blue dark:hover:bg-dark-tertiary`
      } ${restProps.className ?? ''}`}
    >
      {elemBefore}
      {children}
      {elemAfter}
    </li>
  );
};

const ListItemOrderedGroup = ({
  children,
  ...props
}: React.ComponentPropsWithoutRef<'ol'>) => {
  return (
    <ol {...props} className={`w-full ${props.className ?? ''}`}>
      {children}
    </ol>
  );
};

const ListItemUnorderedGroup = ({
  children,
  ...props
}: React.ComponentPropsWithoutRef<'ul'>) => {
  return (
    <ul {...props} className={`w-full ${props.className ?? ''}`}>
      {children}
    </ul>
  );
};

const ListItemText = ({
  children,
  id,
  size = 'md',
  description,
  ...props
}: ListItemTextProps) => {
  const { isDisabled = false, ...restProps } = props;

  return (
    <ListItemWrapper {...restProps} isDisabled={isDisabled} id={id}>
      {!description || description.length === 0 ? (
        <Box
          as={typeof children === 'string' ? 'p' : 'div'}
          className={`w-full whitespace-pre ${
            size === 'lg' ? 'text-base' : size === 'sm' ? 'text-xs' : 'text-sm'
          }`}
        >
          {children}
        </Box>
      ) : (
        <div className="w-full">
          <Box
            as={typeof children === 'string' ? 'p' : 'div'}
            className={`w-full whitespace-pre ${
              size === 'lg'
                ? 'text-base'
                : size === 'sm'
                  ? 'text-xs'
                  : 'text-sm'
            }`}
          >
            {children}
          </Box>
          <p
            className={`w-full whitespace-pre ${
              size === 'lg'
                ? 'text-sm'
                : size === 'sm'
                  ? 'text-[0.625rem] leading-[0.75rem]'
                  : 'text-xs'
            } opacity-off`}
          >
            {description}
          </p>
        </div>
      )}
    </ListItemWrapper>
  );
};

const ListItemRadio = ({
  children,
  id,
  size = 'md',
  description,
  onChange,
  ...props
}: ListItemInputProps) => {
  const { isDisabled = false, isSelected = false, ...restProps } = props;

  return (
    <ListItemWrapper
      {...restProps}
      isDisabled={isDisabled}
      isSelected={isSelected}
      className={isSelected ? 'border-transparent bg-transparent' : ''}
      onClick={e => {
        const label = e.currentTarget.querySelector('label');
        !label?.contains(e.target as Node | null) && label?.click();
      }}
    >
      <Radio
        isDisabled={isDisabled}
        isChecked={isSelected}
        id={id}
        size={size}
        label={children}
        description={description}
        onChange={onChange}
      />
    </ListItemWrapper>
  );
};

const ListItemCheckbox = ({
  children,
  id,
  size = 'md',
  description,
  onChange,
  ...props
}: ListItemInputProps) => {
  const { isDisabled = false, isSelected = false, ...restProps } = props;

  return (
    <ListItemWrapper
      {...restProps}
      isDisabled={isDisabled}
      isSelected={isSelected}
      className={isSelected ? 'border-transparent bg-transparent' : ''}
      onClick={e => {
        const label = e.currentTarget.querySelector('label');
        !label?.contains(e.target as Node | null) && label?.click();
      }}
    >
      <Checkbox
        isDisabled={isDisabled}
        isChecked={isSelected}
        id={id}
        size={size}
        label={children}
        description={description}
        onChange={onChange}
      />
    </ListItemWrapper>
  );
};

const ListItem = {
  OrderedGroup: ListItemOrderedGroup,
  UnorderedGroup: ListItemUnorderedGroup,
  Text: ListItemText,
  Radio: ListItemRadio,
  Checkbox: ListItemCheckbox,
};

export default ListItem;
