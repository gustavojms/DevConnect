'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RiHome5Fill, RiCodeSSlashFill } from 'react-icons/ri';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="">
      <div className="p-0">
        <span
          className="flex py-4 bg-transparent text-gray-ba font-semibold text-lg cursor-pointer"
          onClick={toggleDropdown}
        >
          <RiCodeSSlashFill className="mr-2 h-6 w-6" />
          Projetos
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#e5e5e5"
            className="w-6 h-6 mt-0 ml-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </span>

        {isOpen && (
          <div className="">
            <ul>
              <li>
                <span className="flex py-1 bg-inherit text-violet-900 font-semibold cursor-pointer">
                  Criar Projetos
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
              </li>
              <li>
                <span className="flex py-1 bg-inherit text-violet-900 font-semibold cursor-pointer">
                  Ver Projetos
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
