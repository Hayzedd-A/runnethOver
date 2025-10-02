import { Outlet } from 'react-router-dom';
import Nav from '../shared/Nav.jsx';
import { useState } from 'react';
import WaitlistModal from '../components/WaitlistModal.jsx';

export default function PublicLayout() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="overflow-hidden main-container min-h-screen text-[#2C1810] flex justify-between flex-col">
      <Nav />
      <main className="grid place-content-center">
        <Outlet />
      </main>
      <footer className="text-center">
        <button onClick={openModal} className="btn-join w-fit">
          Join the Waitlist!
        </button>
      </footer>
      {isModalOpen && <WaitlistModal onClose={closeModal} />}
    </div>
  );
}
