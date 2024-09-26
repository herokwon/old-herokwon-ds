import { useCallback, useEffect, useMemo, useState } from 'react';
import { FaCalendarDays } from 'react-icons/fa6';

import type { DateItem, ElementStatus } from '../../types';

import { MONTHS } from '../../data/constants';

import Calendar from '../ui/Calendar';
import Dropdown from '../ui/Dropdown';
import TextButton from '../ui/TextButton';
import DatetimeField from './DatetimeField';

type DatePickerProps = Pick<ElementStatus, 'isDisabled'> &
  Pick<
    React.ComponentPropsWithoutRef<typeof Calendar>,
    | 'defaultViewedDate'
    | 'defaultPickedDate'
    | 'onChangeViewedDate'
    | 'onChangePickedDate'
  > &
  Omit<
    React.ComponentPropsWithoutRef<typeof Dropdown>,
    'children' | 'isOpen' | 'direction' | 'trigger' | 'onClose'
  >;

export default function DatePicker({
  defaultViewedDate,
  defaultPickedDate,
  onChangeViewedDate,
  onChangePickedDate,
  ...props
}: DatePickerProps) {
  const { isDisabled = false, isLoading = false, ...restProps } = props;
  const today = useMemo(() => new Date(), []);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [pickedDateItem, setPickedDateItem] = useState<DateItem>(
    defaultPickedDate ?? {
      year: today.getFullYear(),
      month: MONTHS[today.getMonth()],
      date: today.getDate(),
    },
  );

  useEffect(() => {
    setIsOpen(false);
  }, [pickedDateItem]);

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
        defaultPickedDate={pickedDateItem}
        onChangeViewedDate={onChangeViewedDate}
        onChangePickedDate={useCallback((pickedDateItem: DateItem) => {
          setPickedDateItem(pickedDateItem);
        }, [])}
        className="p-4 dark:*:*:last:*:bg-dark-secondary dark:hover:[&[data-selected='false']]:*:*:last:*:!bg-dark-tertiary"
      />
      <div className="w-full px-4">
        <TextButton
          label="오늘"
          variant="primary"
          size="sm"
          className="w-full"
          onClick={() =>
            setPickedDateItem({
              year: today.getFullYear(),
              month: MONTHS[today.getMonth()],
              date: today.getDate(),
            })
          }
        />
      </div>
    </Dropdown>
  );
}
