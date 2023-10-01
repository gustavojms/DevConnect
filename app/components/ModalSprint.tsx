import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useState } from 'react';
import { submitSprint } from '../services/ApiService';

interface ModalSprintProps {
  isvisible: boolean;
  onClose: () => void;
}

const ModalSprint: React.FC<ModalSprintProps> = ({ isvisible, onClose }) => {
  const agora = new Date();
  const dataHoraISO = agora.toISOString();

  console.log(dataHoraISO);
  const [formData, setFormData] = useState({
    title: '',
    term: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    const formattedDate = formatDateToISO(selectedDate);
    const updatedFormData = { ...formData, term: formattedDate };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await submitSprint(formData);
      console.log('Sprint enviada com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao enviar a sprint:', error);
    }
  };

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
    const formattedDate = formatDateToISO(date);
    setFormData({
      ...formData,
      term: formattedDate,
    });
  };

  const formatDateToISO = (date: any) => {
    if (date) {
      return date.toISOString();
    }
    return '';
  };

  if (!isvisible) return null;
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center">
      <div className="w-[600px] flex flex-col">
        <span
          className="text-white text-xl place-self-end cursor-pointer"
          onClick={onClose}
        >
          X
        </span>
        <div className="bg-slate-950 p-2 rounded text-white">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-ba font-semibold mb-2"
              >
                Título
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="w-full text-black p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                placeholder="Título"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="term"
                className="block text-gray-ba font-semibold mb-2"
              >
                Prazo
              </label>
              <DatePicker
                className="w-full text-black cursor-pointer p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                selected={selectedDate}
                onChange={handleDateChange}
                value={formData.term}
                dateFormat="dd/MM/yyyy"
                placeholderText="dd/mm/yyyy"
              />
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

export default ModalSprint;
