'use client';

import LoadingAnimation from '@/app/components/LoadingAnimation';
import {
  fetchTeamMembers,
  getUser,
  updateTeam,
} from '@/app/services/ApiService';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { usersOptions } from '../../util';

type TeamIdProps = {
  params: {
    id: any;
  };
};

export default function EditTeamForm({ params }: TeamIdProps) {
  const [team, setTeam] = useState([] as any);
  const [allMembers, setAllMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const form = useForm();

  useEffect(() => {
    async function getTeamData() {
      try {
        const response = await fetchTeamMembers(params.id);
        setTeam(response);
        const o = usersOptions(response);
        setSelectedMembers(o);
      } catch (error) {
        console.error(error);
      }
    }

    const getAllUsers = async () => {
      const response = await getUser();
      setAllMembers(usersOptions(response));
    };

    getAllUsers();

    getTeamData();
  }, [params.id]);

  const onSubmit = async (data: any) => {
    const teamData = {
      teamName: data.teamName || team[0].team.teamName,
      description: data.description || team[0].team.description,
    };

    console.log(teamData);
    await updateTeam(params.id, data);
  };

  return (
    <div>
      {team[0] === undefined ? (
        <div className="mt-52">
          <LoadingAnimation />
        </div>
      ) : (
        // team[0].team.members.map((member: any) => (
        //   <h1 className="text-white">{member.member.username}</h1>
        // ))
        <div>
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
                      <Input
                        {...field}
                        type="text"
                        className="w-56"
                        defaultValue={team[0].team.teamName}
                      />
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
                      <Input
                        {...field}
                        type="text"
                        className="w-56"
                        defaultValue={team[0].team.description}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormLabel className="text-gray-250 text-opacity-70">
                Membros
              </FormLabel>

              <Select
                options={allMembers}
                isMulti
                className="basic-multi-select mb-2"
                classNamePrefix="select"
                value={selectedMembers}
              />

              <Button
                type="submit"
                className="mx-auto bg-gradient-to-r from-blue-violet-500 to-lilac hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out"
              >
                Atualizar
              </Button>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
}
