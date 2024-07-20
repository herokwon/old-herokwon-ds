import type { Children, ElementStatus } from '../../types';
import LoadableElement from '../LoadableElement';
import Popup from './Popup';
import Empty from './Empty';
import ListItem from './ListItem';
import Checkbox from '../form/Checkbox';

type DropdownProps = Pick<ElementStatus, 'isLoading'> &
  React.ComponentPropsWithoutRef<typeof Popup>;

interface DropdownItemGroupProps extends React.ComponentPropsWithoutRef<'ul'> {
  heading?: Children;
}

const Dropdown = ({
  children,
  position = 'bottom-center',
  trigger,
  onClose,
  ...props
}: DropdownProps) => {
  const { isLoading = false, isOpen, ...restProps } = props;

  return (
    <Popup
      {...restProps}
      isOpen={isOpen}
      position={position}
      onClose={onClose}
      trigger={trigger}
    >
      <LoadableElement isActive={isLoading}>
        {children ?? (!isLoading && <Empty />)}
      </LoadableElement>
    </Popup>
  );
};

const DropdownItemGroup = ({
  children,
  heading,
  ...props
}: DropdownItemGroupProps) => {
  return !heading ? (
    <ul
      {...props}
      className={`w-full space-y-1 overflow-y-auto ${props.className ?? ''}`}
    >
      {children}
    </ul>
  ) : (
    <div className="w-full space-y-2 overflow-y-auto py-2">
      <strong className="block w-full whitespace-pre px-[calc(0.75rem+2px)] text-sm font-[900] opacity-bold">
        {heading}
      </strong>
      <hr className="w-full border-light-tertiary dark:border-dark-tertiary" />
      <ul {...props} className={`w-full space-y-1 ${props.className ?? ''}`}>
        {children}
      </ul>
    </div>
  );
};

const DropdownItemCheckboxGroup = ({
  children,
  heading,
  onChange,
  ...props
}: DropdownItemGroupProps &
  Pick<ElementStatus, 'isSelected'> &
  Pick<React.ComponentPropsWithoutRef<typeof Checkbox>, 'onChange'>) => {
  const { isSelected = false, ...restProps } = props;

  return (
    <DropdownItemGroup
      {...restProps}
      heading={
        heading && (
          <Checkbox
            isChecked={isSelected}
            id={crypto.randomUUID()}
            label={heading}
            onChange={onChange}
          />
        )
      }
    >
      {children}
    </DropdownItemGroup>
  );
};

Dropdown.Text = ListItem.Text;
Dropdown.Radio = ListItem.Radio;
Dropdown.Checkbox = ListItem.Checkbox;
Dropdown.TextGroup = DropdownItemGroup;
Dropdown.RadioGroup = DropdownItemGroup;
Dropdown.CheckboxGroup = DropdownItemCheckboxGroup;

export default Dropdown;
