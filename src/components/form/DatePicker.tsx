import { useEffect, useState } from "react";
import { FaCalendarDays } from "react-icons/fa6";

import type { ElementStates } from "@/types";
import Dropdown from "../ui/Dropdown";
import Calendar from "../ui/Calendar";
import DatetimeField from "./DatetimeField";

type DatePickerProps =
    Pick<ElementStates, 'isDisabled'> &
    Omit<React.ComponentProps<typeof Calendar>, 'form'>;

export default function DatePicker({ today, pickedDate, setPickedDate, ...props }: DatePickerProps) {
    const { isDisabled = false, ...restProps } = props;
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        setIsOpen(false);
    }, [pickedDate]);

    return (
        <Dropdown
            {...restProps}
            isDisabled={isDisabled}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            triggerItem={
                <DatetimeField
                    readOnly
                    value={`${pickedDate.year}-${pickedDate.month.toString().padStart(2, '0')}-${pickedDate.date.toString().padStart(2, '0')}`}
                    fieldIcon={FaCalendarDays} />}>
            <Calendar
                form='monthly'
                today={today}
                pickedDate={pickedDate}
                setPickedDate={setPickedDate} />
        </Dropdown>
    );
}