import { useEffect, useMemo, useState } from "react";
import { FaCalendarDays } from "react-icons/fa6";

import type { ElementStates } from "@/types";
import Dropdown from "../ui/Dropdown";
import Calendar from "../ui/Calendar";
import DatetimeField from "./DatetimeField";

type DatePickerProps =
    Pick<ElementStates, 'isDisabled'> &
    Omit<React.ComponentProps<typeof Dropdown>, 'children' | 'isOpen' | 'setIsOpen'> &
    Pick<React.ComponentProps<typeof Calendar>, 'today' | 'pickedDate' | 'setPickedDate'>;

export default function DatePicker({ today, pickedDate, setPickedDate, ...props }: DatePickerProps) {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const pickedDateValue = useMemo(() => props.isDisabled ?
        '' :
        `${pickedDate.year}-${pickedDate.month.toString().padStart(2, '0')}-${pickedDate.date.toString().padStart(2, '0')}`, [props.isDisabled, pickedDate]);

    useEffect(() => {
        setIsOpen(false);
    }, [pickedDate]);

    return (
        <Dropdown
            {...props}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            triggerItem={
                <DatetimeField
                    readOnly
                    value={pickedDateValue}
                    fieldIcon={FaCalendarDays} />}>
            <Calendar
                form='monthly'
                today={today}
                pickedDate={pickedDate}
                setPickedDate={setPickedDate} />
        </Dropdown>
    );
}