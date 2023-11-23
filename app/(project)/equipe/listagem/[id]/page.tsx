'use client';

import LoadingAnimation from '@/app/components/LoadingAnimation';
import {
  fetchTeamMembers,
  getUser,
  submitTeamMember,
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
import { Textarea } from '@/components/ui/textarea';
import { teamMemberOptions, usersOptions } from '../../util';

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
        const o = teamMemberOptions(response[0].team.members);
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

  const userOptionListener = (selectedOption: any) => {
    setSelectedMembers(selectedOption);
    console.log(selectedMembers);
  };

  const onSubmit = async (data: any) => {
    const teamData = {
      teamName: data.teamName || team[0].team.teamName,
      description: data.description || team[0].team.description,
    };

    console.log(teamData);
    const response = await updateTeam(Number(params.id), data);

    if (response != null) {
      // eslint-disable-next-line no-restricted-syntax
      for (const user of selectedMembers) {
        const memberData = {
          memberId: (user as any).value,
          teamId: Number(params.id),
        };

        try {
          // eslint-disable-next-line no-await-in-loop
          await submitTeamMember(memberData.teamId, memberData);
        } catch (error) {
          console.error(error);
        }
      }
    }
    window.location.href = '/equipe/listagem';
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
        <div className="bg-gray-1000 w-[800px] h-[455px] mt-10 p-6 rounded-md ">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormLabel className="text-gray-250 text-opacity-70 text-md">
                Atualize os dados da sua equipe
              </FormLabel>
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
                      <Textarea
                        {...field}
                        className="w-96 max-h-[150px]"
                        // default value
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
                className="basic-multi-select mb-2 "
                classNamePrefix="select"
                value={selectedMembers}
                onChange={userOptionListener}
              />

              <Button
                type="submit"
                className="mx-auto mt-4 bg-blue-violet-600 hover:bg-blue-violet-500 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out"
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
