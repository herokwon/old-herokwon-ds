import { useEffect, useState } from 'react';
import { FaCalendarDays } from 'react-icons/fa6';

import type { DateItem, ElementStatus } from '../../types';

import { MONTHS } from '../../data/constants';

import Calendar from '../ui/Calendar';
import Dropdown from '../ui/Dropdown';
import DatetimeField from './DatetimeField';

type DatePickerProps = Pick<ElementStatus, 'isDisabled'> &
  Pick<
    React.ComponentPropsWithoutRef<typeof Calendar>,
    'defaultViewedDate' | 'defaultPickedDateItem' | 'onChangePickedDateItem'
  > &
  Omit<
    React.ComponentPropsWithoutRef<typeof Dropdown>,
    'children' | 'isOpen' | 'trigger' | 'onClose'
  >;

export default function DatePicker({
  defaultViewedDate,
  defaultPickedDateItem,
  onChangePickedDateItem,
  ...props
}: DatePickerProps) {
  const today = new Date();
  const { isDisabled = false, isLoading = false, ...restProps } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [pickedDateItem, setPickedDateItem] = useState<DateItem>(
    defaultPickedDateItem ?? {
      year: today.getFullYear(),
      month: MONTHS[today.getMonth()],
      date: today.getDate(),
    },
  );

  useEffect(() => {
    setIsOpen(false);
    onChangePickedDateItem?.(pickedDateItem);
  }, [pickedDateItem, onChangePickedDateItem]);

  return (
    <Dropdown
      {...restProps}
      isLoading={isLoading}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      trigger={
        <DatetimeField
          readOnly
          autoFocus={isOpen}
          isDisabled={isDisabled}
          fieldIcon={FaCalendarDays}
          value={
            isDisabled
              ? undefined
              : `${pickedDateItem.year}-${pickedDateItem.month.toString().padStart(2, '0')}-${pickedDateItem.date.toString().padStart(2, '0')}`
          }
          onClick={() => setIsOpen(prev => !prev)}
        />
      }
    >
      <Calendar
        variant="monthly"
        defaultViewedDate={defaultViewedDate}
        defaultPickedDateItem={defaultPickedDateItem}
        onChangePickedDateItem={pickedDateItem =>
          setPickedDateItem(pickedDateItem)
        }
        className="p-4 dark:*:*:last:*:bg-dark-secondary dark:hover:[&[data-selected='false']]:*:*:last:*:!bg-dark-tertiary"
      />
    </Dropdown>
  );
}
