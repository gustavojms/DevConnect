'use client';

import {
  getUser,
  submitRole,
  submitTeam,
  submitTeamMember,
} from '@/app/services/ApiService';
import { useForm } from 'react-hook-form';
import { getSession } from 'next-auth/react';
import { SessionInterface } from '@/app/types/SessionType';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { roleOptions, usersOptions } from './util';

interface ModalProps {
  isvisible: boolean;
  onClose: () => void;
}

export default function Team({ isvisible, onClose }: ModalProps) {
  const form = useForm();
  const [users, setUsers] = useState([]);
  const [selectedUserOption, setSelectedUserOption] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState({});

  const userOptionListener = (selectedOption: any) => {
    setSelectedUserOption(selectedOption);
    console.log(selectedRoles);
  };

  useEffect(() => {
    async function fetchUsers() {
      const response = await getUser();
      setUsers(usersOptions(response));
      console.log(response);
    }

    fetchUsers();
  }, []);

  async function onSubmit(data: any) {
    const userId = (await getSession()) as SessionInterface;
    const response = await submitTeam({
      teamName: data.teamName,
      description: data.description,
      leaderId: userId.payload.sub,
    });

    if (response != null) {
      // eslint-disable-next-line no-restricted-syntax
      for (const user of selectedUserOption) {
        const dataMember = {
          memberId: user.value,
          teamId: response.teamId,
        };

        const roleMember = {
          userId: user.value,
          roleName: selectedRoles[user.value].value,
        };
        // eslint-disable-next-line no-await-in-loop
        await submitTeamMember(dataMember.teamId, dataMember);
        // eslint-disable-next-line no-await-in-loop
        await submitRole(roleMember);
      }
    }
    return response;
  }

  if (!isvisible) return null;
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-20">
      <div className="w-[600px] flex flex-col">
        <Button
          className="text-white text-xl place-self-end cursor-pointer bg-transparent"
          onClick={onClose}
        >
          x
        </Button>
        <div className="bg-midnight-blue p-6 rounded-lg shadow-md w-[600px] mx-auto flex-col ">
          <div>
            <h1 className="text-bold mb-5 text-gray-ba ">
              Crie a sua equipe e melhore a comunicação entre os membros
            </h1>
          </div>
          <div className="flex-none">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="teamName"
                  render={({ field }) => (
                    <FormItem className="mb-2">
                      <FormLabel className="text-gray-250 text-opacity-70">
                        Nome da equipe
                      </FormLabel>
                      <FormControl>
                        <Input {...field} type="text" className="w-56" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="mb-2">
                      <FormLabel className="text-gray-250 text-opacity-70">
                        Descrição
                      </FormLabel>
                      <FormControl>
                        <Input {...field} type="text" className="w-56" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormLabel className="text-gray-250 text-opacity-70">
                  Membros
                </FormLabel>

                <Select
                  options={users}
                  isMulti
                  className="basic-multi-select mb-2"
                  classNamePrefix="select"
                  value={selectedUserOption}
                  onChange={userOptionListener}
                />

                <FormLabel className=" text-gray-250 text-opacity-70">
                  Funções
                </FormLabel>

                {selectedUserOption.map((user) => (
                  <div key={user.value}>
                    <p className=" my-2 text-gray-250 text-opacity-70 mr-2">
                      {user.label}
                    </p>
                    <Select
                      options={roleOptions}
                      className="basic-multi-select mb-4 w-56"
                      classNamePrefix="select"
                      value={selectedRoles[user.value] || null}
                      onChange={(selectedOption) => {
                        setSelectedRoles({
                          ...selectedRoles,
                          [user.value]: selectedOption,
                        });
                      }}
                    />
                  </div>
                ))}

                <Button
                  type="submit"
                  className="mx-auto bg-gradient-to-r from-blue-violet-500 to-lilac hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out"
                >
                  Criar
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
