import { useEffect, useMemo, useState } from 'react';
import { FaClock } from 'react-icons/fa6';

import type { DropdownFlatItem, TimeItem } from '../../types';
import Dropdown from '../ui/Dropdown';
import DatetimeField from './DatetimeField';

interface TimePickerProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof Dropdown.Wrapper>,
    'children' | 'isOpen' | 'setIsOpen'
  > {
  min?: TimeItem;
  max?: TimeItem;
  pickedTime: TimeItem;
  setPickedTime: React.Dispatch<React.SetStateAction<TimeItem>>;
}

export default function TimePicker({
  pickedTime,
  setPickedTime,
  ...props
}: TimePickerProps) {
  const {
    min = {
      hour: 0,
      minute: 0,
    },
    max = {
      hour: 23,
      minute: 59,
    },
    ...restProps
  } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hourItems, setHourItems] = useState<DropdownFlatItem[]>([
    ...Array.from({ length: max.hour - min.hour + 1 }, (_, i) => ({
      isDisabled: false,
      isSelected: min.hour + i === pickedTime.hour,
      id: crypto.randomUUID(),
      heading: `${min.hour + i}`,
    })),
  ]);
  const [minuteItems, setMinuteItems] = useState<DropdownFlatItem[]>([
    ...Array.from({ length: max.minute - min.minute + 1 }, (_, i) => ({
      isDisabled: false,
      isSelected: min.minute + i === pickedTime.minute,
      id: crypto.randomUUID(),
      heading: `${min.minute + i}`.padStart(2, '0'),
    })),
  ]);
  const selectedHourItem = useMemo(
    () => hourItems.find(hourItem => hourItem.isSelected) ?? null,
    [hourItems],
  );
  const selectedMinuteItem = useMemo(
    () => minuteItems.find(minuteItem => minuteItem.isSelected) ?? null,
    [minuteItems],
  );

  useEffect(() => {
    document.getElementById(selectedHourItem?.id ?? '')?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }, [selectedHourItem]);

  useEffect(() => {
    document.getElementById(selectedMinuteItem?.id ?? '')?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }, [selectedMinuteItem]);

  useEffect(() => {
    setPickedTime({
      hour: !selectedHourItem ? 0 : parseInt(selectedHourItem.heading),
      minute: !selectedMinuteItem ? 0 : parseInt(selectedMinuteItem.heading),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedHourItem, selectedMinuteItem]);

  return (
    <Dropdown.Wrapper
      {...restProps}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      className="*:*:first:*:last:*:text-center"
      triggerItem={
        <DatetimeField
          readOnly
          autoFocus={isOpen}
          type="time"
          value={`${pickedTime.hour.toString().padStart(2, '0')}:${pickedTime.minute.toString().padStart(2, '0')}`}
          className="cursor-pointer"
          fieldIcon={FaClock}
        />
      }
    >
      <Dropdown.Container>
        <Dropdown.FlatItems
          selectingInput="text"
          items={hourItems}
          setItems={setHourItems}
        />
        <Dropdown.FlatItems
          selectingInput="text"
          items={minuteItems}
          setItems={setMinuteItems}
        />
      </Dropdown.Container>
    </Dropdown.Wrapper>
  );
}
