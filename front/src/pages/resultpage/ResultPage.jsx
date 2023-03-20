import React, {useState} from 'react';
// import Modal from '../../components/Modal'
import ModalTwo from '../../components/ModalTwo'


export default function Resultpage() {
  const [OpenModal, setOpenModal] = useState(false);

  const showModal = () => {
    setOpenModal(!OpenModal);
  };

  return (
    <div className='text-center pt-7'>
      <button onClick={showModal}> 모달 띄우기 </button>
      {/* {OpenModal && <Modal setOpenModal={showModal}/>} */}
      {OpenModal && <ModalTwo setOpenModal={showModal}/>}
    </div>
  );
}
