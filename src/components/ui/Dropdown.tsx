import type { Children, ElementStatus } from '../../types';

import Checkbox from '../form/Checkbox';
import ListItem from './ListItem';
import Popup from './Popup';

type DropdownProps = Pick<ElementStatus, 'isLoading'> &
  React.ComponentPropsWithoutRef<typeof Popup>;

interface DropdownItemGroupProps extends React.ComponentPropsWithoutRef<'ul'> {
  heading?: Children;
}

const Dropdown = ({
  children,
  position = 'bottom-center',
  direction = 'vertical',
  trigger,
  onClose,
  ...props
}: DropdownProps) => {
  const { isLoading = false, isOpen, ...restProps } = props;

  return (
    <Popup
      {...restProps}
      isLoading={isLoading}
      isOpen={isOpen}
      position={position}
      direction={direction}
      trigger={trigger}
      onClose={onClose}
      className={`${
        direction === 'vertical'
          ? ''
          : isLoading
            ? 'first:*:only:*:last:*:flex-row'
            : 'only:*:last:*:flex-row'
      } ${restProps.className ?? ''}`}
    >
      {children}
    </Popup>
  );
};

const DropdownItemGroup = ({
  children,
  heading,
  ...props
}: DropdownItemGroupProps) => {
  return !heading ? (
    <ListItem
      {...props}
      variant="unordered"
      className={`space-y-1 ${props.className ?? ''}`}
    >
      {children}
    </ListItem>
  ) : (
    <div className="w-full space-y-2 py-2">
      <strong className="block w-full whitespace-pre px-[calc(0.75rem+2px)] text-sm font-[900] opacity-bold">
        {heading}
      </strong>
      <hr className="w-full border-light-tertiary dark:border-dark-tertiary" />
      <ListItem
        {...props}
        variant="unordered"
        className={`space-y-1 ${props.className ?? ''}`}
      >
        {children}
      </ListItem>
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
