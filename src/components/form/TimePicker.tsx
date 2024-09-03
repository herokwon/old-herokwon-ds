import { useEffect, useMemo, useState } from 'react';
import { FaClock } from 'react-icons/fa6';

import type { ElementStatus, TimeItem } from '../../types';

import Dropdown from '../ui/Dropdown';
import DatetimeField from './DatetimeField';

interface TimePickerProps
  extends Pick<ElementStatus, 'isDisabled'>,
    Omit<
      React.ComponentPropsWithoutRef<typeof Dropdown>,
      'isOpen' | 'direction' | 'trigger' | 'onClose'
    > {
  min?: TimeItem;
  max?: TimeItem;
  defaultPickedTimeItem?: TimeItem;
  onChangePickedTimeItem?: (pickedTimeItemItem: TimeItem) => void;
}

export default function TimePicker({
  min = {
    hour: 0,
    minute: 0,
  },
  max = {
    hour: 23,
    minute: 59,
  },
  defaultPickedTimeItem,
  onChangePickedTimeItem,
  ...props
}: TimePickerProps) {
  const today = new Date();
  const { isDisabled = false, isLoading = false, ...restProps } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [pickedTimeItem, setPickedTimeItem] = useState<TimeItem>(
    defaultPickedTimeItem ?? {
      hour: today.getHours(),
      minute: today.getMinutes(),
    },
  );
  const hourItems = Array.from({ length: max.hour - min.hour + 1 }, (_, i) => ({
    id: crypto.randomUUID(),
    content: min.hour + i,
  }));
  const minuteItems = useMemo(
    () =>
      Array.from(
        {
          length:
            pickedTimeItem.hour === min.hour
              ? 59 - min.minute + 1
              : pickedTimeItem.hour === max.hour
                ? max.minute + 1
                : 60,
        },
        (_, i) => ({
          id: crypto.randomUUID(),
          content: pickedTimeItem.hour === min.hour ? min.minute + i : i,
        }),
      ),
    [max, min, pickedTimeItem.hour],
  );

  useEffect(() => {
    onChangePickedTimeItem?.(pickedTimeItem);
  }, [pickedTimeItem, onChangePickedTimeItem]);

  useEffect(() => {
    const targetHourId =
      hourItems.find(item => item.content === pickedTimeItem.hour)?.id ?? '';
    const targetMinuteId =
      minuteItems.find(item => item.content === pickedTimeItem.minute)?.id ??
      '';

    const hourDelay = setTimeout(() => {
      document.getElementById(targetHourId)?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      clearTimeout(hourDelay);
    }, 100);
    const minuteDelay = setTimeout(() => {
      document.getElementById(targetMinuteId)?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      clearTimeout(minuteDelay);
    }, 200);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    const targetId =
      hourItems.find(item => item.content === pickedTimeItem.hour)?.id ?? '';

    const delay = setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      clearTimeout(delay);
    }, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickedTimeItem.hour]);

  useEffect(() => {
    const targetId =
      minuteItems.find(item => item.content === pickedTimeItem.minute)?.id ??
      '';

    const delay = setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      clearTimeout(delay);
    }, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickedTimeItem.minute]);

  return (
    <Dropdown
      {...restProps}
      isLoading={isLoading}
      isOpen={isOpen}
      direction="horizontal"
      onClose={() => setIsOpen(false)}
      className={`${
        isLoading
          ? '*:first:*:only:*:last:*:overflow-y-auto first:*:only:*:last:*:px-2'
          : '*:only:*:last:*:overflow-y-auto only:*:last:*:px-2'
      } ${restProps.className ?? ''}`}
      trigger={
        <DatetimeField
          readOnly
          type="time"
          isDisabled={isDisabled}
          autoFocus={isOpen}
          fieldIcon={FaClock}
          value={`${pickedTimeItem.hour.toString().padStart(2, '0')}:${pickedTimeItem.minute.toString().padStart(2, '0')}`}
          className="cursor-pointer"
          onClick={() => setIsOpen(prev => !prev)}
        />
      }
    >
      <Dropdown.TextGroup className="text-center scrollbar-hide">
        {hourItems.map(({ id, content }) => (
          <Dropdown.Text
            key={id}
            id={id}
            isSelected={content === pickedTimeItem.hour}
            className={`rounded-ms !border-0 ${content === pickedTimeItem.hour ? '!bg-light-blue text-dark dark:!bg-dark-blue' : ''}`}
            onClick={() =>
              setPickedTimeItem(prev => ({
                ...prev,
                hour: content,
              }))
            }
          >
            {content}
          </Dropdown.Text>
        ))}
      </Dropdown.TextGroup>
      <Dropdown.TextGroup className="text-center scrollbar-hide">
        {minuteItems.map(({ id, content }) => (
          <Dropdown.Text
            key={id}
            id={id}
            isSelected={content === pickedTimeItem.minute}
            className={`rounded-ms !border-0 ${content === pickedTimeItem.minute ? '!bg-light-blue text-dark dark:!bg-dark-blue' : ''}`}
            onClick={() =>
              setPickedTimeItem(prev => ({
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
