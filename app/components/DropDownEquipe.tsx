'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BiGroup } from 'react-icons/bi';
import Modal from '@/app/(project)/equipe/page';
import { IoMdArrowDropdown } from 'react-icons/io';
import { MdAddCircleOutline } from 'react-icons/md';
import { HiOutlineEye } from 'react-icons/hi';
import { type } from 'os';
import Link from 'next/link';

type DropdownProps = {
  campo1: string;
  campo2: string;
};

export default function Dropdown({ campo1, campo2 }: DropdownProps) {
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
          <BiGroup className="mr-2 h-6 w-6" />
          Equipes
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
                  {campo1}
                  <MdAddCircleOutline className="ml-auto h-6 w-6" />
                </span>
              </li>
              <li>
                <Link
                  href="/equipe/listagem"
                  className="flex py-1 bg-inherit text-pale-blue font-semibold cursor-pointer"
                >
                  {campo2}
                  <HiOutlineEye className="ml-auto h-6 w-6" />
                </Link>
              </li>
            </ul>
            <Modal isvisible={showModal} onClose={handleCloseModal} />
          </div>
        )}
      </div>
    </div>
  );
}
