'use client';
import Modal from '../Modals/Modal';
import Link from 'next/link';
import { useDeviceConnection } from '../../contexts/WebSocketContext';
import { useRouter } from 'next/navigation';
import { stateSystemOff } from '../../constants';

const ConnectionLostModal = ({ }) => {

    const { pingFailed } = useDeviceConnection()!;
    const router = useRouter();

    return (
        <Modal
            // trash - check Modal definition and behaviour
            name={"trash_ConnectionLost"}
            onClose={() => { }}
            isOpen={pingFailed}
            counter={0}
            sx={{
                left: '50%',
                transform: 'translateX(-50%)',
                 top: '20% !important',
                position: 'absolute',
            }}
        >
            {stateSystemOff}
            <div className="ModalButtons">
                <Link
                    style={{
                        textDecoration: 'none',
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    href={'launch-stopped'}
                    className="ModalButton1"
                    onClick={() => {
                        router.back()
                    }}
                >
                    ОК
                </Link>
            </div>
        </Modal>
    );
};

export default ConnectionLostModal;