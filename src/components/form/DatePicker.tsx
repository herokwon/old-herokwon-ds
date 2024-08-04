import { useEffect, useMemo, useState } from 'react';
import { FaCalendarDays } from 'react-icons/fa6';

import type { ElementStatus } from '../../types';
import Calendar from '../ui/Calendar';
import Dropdown from '../ui/Dropdown';
import DatetimeField from './DatetimeField';

type DatePickerProps = Pick<ElementStatus, 'isDisabled'> &
  Pick<
    React.ComponentPropsWithoutRef<typeof Calendar>,
    'today' | 'pickedDate' | 'setPickedDate'
  > &
  React.ComponentPropsWithoutRef<typeof Dropdown>;

export default function DatePicker({
  today,
  pickedDate,
  setPickedDate,
  ...props
}: DatePickerProps) {
  const { isDisabled = false, isLoading = false, ...restProps } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pickedDateValue = useMemo(
    () =>
      isDisabled
        ? ''
        : `${pickedDate.year}-${pickedDate.month.toString().padStart(2, '0')}-${pickedDate.date.toString().padStart(2, '0')}`,
    [isDisabled, pickedDate],
  );

  useEffect(() => {
    setIsOpen(false);
  }, [pickedDate]);

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
          value={pickedDateValue}
          onClick={() => setIsOpen(prev => !prev)}
          fieldIcon={FaCalendarDays}
        />
      }
    >
      <Calendar
        form="monthly"
        today={today}
        pickedDate={pickedDate}
        setPickedDate={setPickedDate}
        className="p-4"
      />
    </Dropdown>
  );
}
