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

interface ModalProps {
  isvisible: boolean;
  onClose: () => void;
}

export default function Team({ isvisible, onClose }: ModalProps) {
  const form = useForm();
  const roleOptions = ['desenvolvedor', 'testador', 'DBA'];
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  // const [userCount, setUserCount] = useState(1);
  // const [usersToSend, setUsersToSend] = useState([]);

  const handleSelectChange = (e: any) => {
    const selectedUserId = e.target.value || users[0].userId;
    setSelectedUser(selectedUserId);
    const selectedValue = e.target.value;
    setSelectedRole(selectedValue);
  };

  // const handleAddUser = () => {
  //   setUserCount(userCount + 1);
  //   const user = {
  //     memberId: parseInt(selectedUser, 10),
  //     roleName: selectedRole || roleOptions[0],
  //   }

  //   setUsersToSend([...usersToSend, user]);
  //   console.log(usersToSend)
  // };

  useEffect(() => {
    async function fetchUsers() {
      const response = await getUser();
      setUsers(response);
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
      const userMemberId = parseInt(selectedUser, 10);
      const dataMember = {
        memberId: userMemberId,
        teamId: response.teamId,
      };

      const dataMemberRole = {
        roleName: selectedRole || roleOptions[0],
        userId: 1,
      };

      console.log(dataMemberRole);

      await submitRole(dataMemberRole);
      await submitTeamMember(dataMember.teamId, dataMember);
    }
    return response;
  }

  if (!isvisible) return null;
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-20">
      <div className="w-[600px] flex flex-col">
        <Button
          className="text-white text-xl place-self-end cursor-pointer"
          onClick={onClose}
        >
          X
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
                <div className="flex flex-col text-gray-250">
                  {/* <Button
                  type="button"
                  className="mx-auto mr-4 
                bg-blue-violet-500 hover:bg-blue-600 text-white 
                py-2 px-4 rounded-md transition duration-300 ease-in-out"
                  onClick={handleAddUser}
                >
                  +
                </Button> */}

                  <p>Usuário</p>

                  {Array.from({ length: userCount }).map((_, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={index} className="flex flex-row">
                      <select
                        className="w-56 p-1 h-10 mt-2 mb-4 rounded-sm"
                        id={`selectUser${index}`}
                        value={users[index] ? users[index].username : ''}
                        onChange={(e) => {
                          const updatedUsers = [...users];
                          updatedUsers[index] = {
                            ...updatedUsers[index],
                            username: e.target.value,
                          };
                          setUsers(updatedUsers);
                        }}
                      >
                        {users.map((user: any) => (
                          <option key={user.userId} value={user.username}>
                            {user.username}
                          </option>
                        ))}
                      </select>
                      <select
                        className="w-56 p-1 mt-2 mb-4 ml-5 rounded-sm"
                        id={`selectRole${index}`}
                        value={selectedRole}
                        onChange={handleSelectChange}
                      >
                        <option value="desenvolvedor">Desenvolvedor</option>
                        <option value="testador">Testador</option>
                        <option value="DBA">DBA</option>
                      </select>
                    </div>
                  ))}
                </div>

                {/* <div className="flex flex-col text-gray-250">
                Funções
                
              </div> */}

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
