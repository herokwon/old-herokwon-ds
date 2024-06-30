import { useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Modal from "./Modal";
import TextButton from "./TextButton";
import InlineMessage from "./InlineMessage";

const meta = {
    title: 'Components/Modal',
    tags: ['autodocs'],
    component: Modal.Container,
} satisfies Meta<typeof Modal.Container>;
export default meta;

type Story = StoryObj<typeof Modal.Container>;

const ModalRender = ({ ...props }: React.ComponentProps<typeof Modal.Container>) => {
    const [isOpenModal, setIsOpenModal] = useState<boolean>(props.isActive ?? false);

    useEffect(() => {
        setIsOpenModal(props.isActive ?? false);
    }, [props.isActive]);

    return (
        <Modal.Wrapper isActive={isOpenModal}>
            <TextButton
                label='Open Modal'
                variant='primary'
                onClick={() => setIsOpenModal((prev) => !prev)} />
            <Modal.Container {...props}>
                <InlineMessage message='This is a modal.' />
            </Modal.Container>
        </Modal.Wrapper>
    );
};

export const Default: Story = {
    args: {
        id: crypto.randomUUID(),
    },
    render: ({ ...props }) =>
        <ModalRender {...props} />
};