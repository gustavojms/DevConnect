import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useState } from 'react';
import { submitSprint } from '../services/ApiService';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

interface ModalSprintProps {
  isvisible: boolean;
  onClose: () => void;
}

const ModalSprint: React.FC<ModalSprintProps> = ({ isvisible, onClose }) => {
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await submitSprint(formData);
      toast({
        className: 'bg-green-300 text-green-700 font-bold border-none',
        description: 'Sprint criada com sucesso!',
      });
      onClose();
    } catch (error) {
      console.error('Erro ao enviar a sprint:', error);
      toast({
        className: 'bg-red-300 text-white font-bold border-none',
        description: 'Erro ao criar Sprint!',
      });
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
      date.setHours(23, 59, 59, 999);
      return date.toISOString();
    }
    return '';
  };

  if (!isvisible) return null;
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center">
      <div className="w-[600px] flex flex-col">
        <Button
          className="text-white text-xl place-self-end cursor-pointer bg-transparent"
          onClick={onClose}
        >
          x
        </Button>
        <div className="bg-midnight-blue p-6 rounded-lg shadow-md w-[600px] mx-auto flex-col">
          <h1 className="text-center mb-5 justify-center items-center text-3xl flex bg-inherit text-pale-blue font-semibold ">
            <span>Nova Sprint</span>
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 flex flex-col justify-center items-center">
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
                className="w-72 text-center text-black p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                placeholder="Título"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4 flex flex-col justify-center items-center">
              <label
                htmlFor="term"
                className="block text-gray-ba font-semibold mb-2 text-left"
              >
                Prazo
              </label>
              <DatePicker
                className=" w-72 text-center text-black cursor-pointer p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                placeholderText="Selecione uma data"
              />
            </div>

            <button
              type="submit"
              className="mx-auto w-3/4 bg-gradient-to-r mb-4 from-blue-violet-500 to-lilac hover.bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out justify-center flex"
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
