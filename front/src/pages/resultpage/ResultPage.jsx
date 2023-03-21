import React, {useState} from 'react';
// import Modal from '../../components/Modal'
import ModalTwo from '../../components/ModalTwo'
import Slider from '../../components/Slider';


export default function Resultpage() {
  const [OpenModal, setOpenModal] = useState(false);

  const showModal = () => {
    setOpenModal(!OpenModal);
  };

  return (
    <div className='flex flex-auto p-7 m-5'>
      <button className="text-center p-7"onClick={showModal}> 모달 띄우기 </button>
      {/* {OpenModal && <Modal setOpenModal={showModal}/>} */}
      {OpenModal && <ModalTwo setOpenModal={showModal}/>}
      <Slider />
    </div>
  );
}
