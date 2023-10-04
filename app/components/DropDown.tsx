'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RiHome5Fill, RiCodeSSlashFill } from 'react-icons/ri';
import Modal from '@/app/components/Modal';
import { IoMdArrowDropdown } from 'react-icons/io';
import { MdAddCircleOutline } from 'react-icons/md';
import { HiOutlineEye } from 'react-icons/hi';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="">
      <div className="p-0">
        <span
          className="flex py-4 bg-transparent text-gray-ba font-semibold text-lg cursor-pointer items-center"
          onClick={toggleDropdown}
        >
          <RiCodeSSlashFill className="mr-2 h-6 w-6" />
          Projetos
          <IoMdArrowDropdown className="ml-auto h-6 w-6" />
        </span>

        {isOpen && (
          <div className="">
            <ul>
              <li>
                <span
                  className="flex py-1 bg-inherit text-pale-blue font-semibold cursor-pointer"
                  onClick={() => setShowModal(true)}
                >
                  Crie um projeto
                  <MdAddCircleOutline className="ml-auto h-6 w-6" />
                </span>
              </li>
              <li>
                <span className="flex py-1 bg-inherit text-pale-blue font-semibold cursor-pointer">
                  Ver Projetos
                  <HiOutlineEye className="ml-auto h-6 w-6" />
                </span>
              </li>
            </ul>
            <Modal isvisible={showModal} onClose={handleCloseModal} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
