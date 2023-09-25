import { Button } from '@/components/ui/button';
import React from 'react';

interface ModalProps {
  isvisible: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isvisible, onClose }) => {
  if (!isvisible) return null;
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[600px] flex flex-col">
        <span
          className="text-white text-xl place-self-end cursor-pointer"
          onClick={onClose}
        >
          X
        </span>
        <div className="bg-slate-950 p-2 rounded text-white">
          <form>
            <div className="mb-4">
              <label
                htmlFor="Título"
                className="block text-gray-ba font-semibold mb-2"
              >
                Título
              </label>
              <input
                type="text"
                id="titulo"
                name="titulo"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-ba font-semibold mb-2"
              >
                Descrição
              </label>
              <textarea
                name="description"
                id="description"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                placeholder="O que a sua equipe faz?"
              />
              <label
                htmlFor="Time"
                className="block text-gray-ba font-semibold mb-2"
              >
                Time
              </label>
              <select
                name="time"
                id="time"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              >
                <option value="" className="bg-slate-950 border rounder-md">
                  Time 1
                </option>
                <option value="" className="bg-slate-950 border rounder-md">
                  Time 2
                </option>
                <option value="" className="bg-slate-950 border rounder-md">
                  Time 3
                </option>
              </select>
            </div>

            <button
              type="submit"
              className="mx-auto w-full bg-gradient-to-r from-blue-violet-500 to-lilac hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out"
            >
              Criar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
