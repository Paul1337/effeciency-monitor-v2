import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from '@chakra-ui/react';
import React, { FC, ReactNode } from 'react';

interface IBasicModalProps {
    action: string;
    isOpen: boolean;
    onClose?: () => void;
    onAction: () => void;
    children: ReactNode;
    title: string;
}

export const BasicModal: FC<IBasicModalProps> = props => {
    const { action, isOpen, title, onClose, children, onAction } = props;
    return (
        <Modal isOpen={isOpen} onClose={() => onClose?.()} size={'xl'}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>{children}</ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onAction}>
                        {action}
                    </Button>
                    <Button variant='ghost' onClick={() => onClose?.()}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
