import { useEffect, useMemo, useState } from 'react';
import { FaClock } from 'react-icons/fa6';

import type { TimeItem } from '../../types';
import Dropdown from '../ui/Dropdown';
import DatetimeField from './DatetimeField';

interface TimePickerProps
  extends Pick<
      React.ComponentPropsWithoutRef<typeof DatetimeField>,
      'isDisabled'
    >,
    Omit<
      React.ComponentPropsWithoutRef<typeof Dropdown>,
      'isOpen' | 'trigger' | 'onClose'
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
    isDisabled = false,
    isLoading = false,
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
  const hourItems = useMemo(
    () =>
      Array.from({ length: max.hour - min.hour + 1 }, (_, i) => ({
        id: crypto.randomUUID(),
        content: min.hour + i,
      })),
    [min.hour, max.hour],
  );
  const minuteItems = useMemo(
    () =>
      Array.from(
        {
          length:
            pickedTime.hour === min.hour
              ? 59 - min.minute + 1
              : pickedTime.hour === max.hour
                ? max.minute + 1
                : 60,
        },
        (_, i) => ({
          id: crypto.randomUUID(),
          content: pickedTime.hour === min.hour ? min.minute + i : i,
        }),
      ),
    [max, min, pickedTime.hour],
  );

  useEffect(() => {
    const targetId =
      hourItems.find(item => item.content === pickedTime.hour)?.id ?? '';

    const delay = setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      clearTimeout(delay);
    }, 10);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickedTime.hour, isOpen]);

  useEffect(() => {
    const targetId =
      minuteItems.find(item => item.content === pickedTime.minute)?.id ?? '';
    const delay = setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      clearTimeout(delay);
    }, 10);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickedTime.minute, isOpen]);

  return (
    <Dropdown
      {...restProps}
      isLoading={isLoading}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      className="only:*:last:*:flex only:*:last:*:space-y-0"
      trigger={
        <DatetimeField
          type="time"
          readOnly
          isDisabled={isDisabled}
          onClick={() => setIsOpen(prev => !prev)}
          autoFocus={isOpen}
          value={`${pickedTime.hour.toString().padStart(2, '0')}:${pickedTime.minute.toString().padStart(2, '0')}`}
          className="cursor-pointer"
          fieldIcon={FaClock}
        />
      }
    >
      <Dropdown.TextGroup className="px-1 text-center scrollbar-hide">
        {hourItems.map(({ id, content }) => (
          <Dropdown.Text
            key={id}
            id={id}
            isSelected={content === pickedTime.hour}
            className={`rounded-ms !border-0 ${content === pickedTime.hour ? '!bg-light-blue text-dark dark:!bg-dark-blue' : ''}`}
            onClick={() =>
              setPickedTime(prev => ({
                ...prev,
                hour: content,
              }))
            }
          >
            {content}
          </Dropdown.Text>
        ))}
      </Dropdown.TextGroup>
      <Dropdown.TextGroup className="px-1 text-center scrollbar-hide">
        {minuteItems.map(({ id, content }) => (
          <Dropdown.Text
            key={id}
            id={id}
            isSelected={content === pickedTime.minute}
            className={`rounded-ms !border-0 ${content === pickedTime.minute ? '!bg-light-blue text-dark dark:!bg-dark-blue' : ''}`}
            onClick={() =>
              setPickedTime(prev => ({
                ...prev,
                minute: content,
              }))
            }
          >
            {`${content}`.padStart(2, '0')}
          </Dropdown.Text>
        ))}
      </Dropdown.TextGroup>
    </Dropdown>
  );
}
