import React, { useState } from 'react'
import { Modal } from '../../context/Modal'
import DeleteBookComponent from './DelBooking.js'

function DeleteBookingModal({ booking }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
        <div className='cancel-button' onClick={() => setShowModal(true)}>Cancel Reservation</div>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <DeleteBookComponent booking={booking} onClick={() => setShowModal(false)} />
            </Modal>
        )}
        </>
    )
}

export default DeleteBookingModal;
