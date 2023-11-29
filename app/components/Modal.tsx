import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import {
  findAllTeams,
  submitProject,
  updateTeam,
} from '@/app/services/ApiService';
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { getSession } from 'next-auth/react';
import { SessionInterface } from '../types/SessionType';
import { useToast } from '@/components/ui/use-toast';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

interface ModalProps {
  isvisible: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isvisible, onClose }) => {
  const form = useForm();
  const { toast } = useToast();
  const [teams, setTeams] = useState<any[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  let teamId: number = 0;
  useEffect(() => {
    async function getTeams() {
      try {
        const response = await findAllTeams();
        console.log(response);
        if (Array.isArray(response)) {
          setTeams(response);
        } else {
          // console.error('Resposta inesperada:', response);
        }
      } catch (error) {
        // console.error('Erro ao obter projetos:', error);
      }
    }

    getTeams();
  }, []);

  const handleTeamChange = (event: any) => {
    const selectedId = event.target.value;
    setSelectedTeamId(selectedId);
  };

  //console.log(selectedTeamId)

  if (selectedTeamId != null) {
    teamId = parseInt(selectedTeamId);
  }

  async function onSubmit(data: any) {
    if (data.isPublic === '1') {
      data.isPublic = true;
    } else {
      data.isPublic = false;
    }

    const userId = (await getSession()) as SessionInterface;

    try {
      const response = await submitProject({
        title: data.title,
        description: data.description,
        projectOwner: userId.payload.sub,
        isPublic: data.isPublic,
        team: selectedTeamId,
      });

      toast({
        className: 'bg-green-300 text-green-700 font-bold border-none',
        description: 'Projeto criado com sucesso!',
      });

      if (response != null) {
        const data: any = {
          teamId: teamId,
          projectId: response.projectId,
        };

        //console.log(teamId, "aqui está")
        try {
          await updateTeam(teamId, data);
          console.log('Time atualizado com sucesso!');
        } catch (error) {
          console.error('Erro ao atualizar time:', error);
        }
      }

      form.reset();

      return response;
    } catch (error) {
      console.error('Erro ao criar projeto:', error);
      // Trate o erro conforme necessário
    }
  }

  if (!isvisible) return null;
  return (
    <div className=" fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-20">
      <div className="w-[600px] flex flex-col">
        <Button
          className="text-white text-xl place-self-end cursor-pointer bg-transparent"
          onClick={onClose}
        >
          x
        </Button>
        <div className="bg-midnight-blue p-6 rounded-lg shadow-md w-[600px] mx-auto flex-col">
          <div>
            <h1 className="text-bold mb-5 text-gray-ba ">Crie seu projeto!</h1>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="mb-2">
                    <FormLabel className="text-gray-ba bg- text-opacity-70">
                      Nome Do Projeto
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        className="w-full text-black"
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
                    <FormLabel className="text-gray-ba text-opacity-70">
                      Descrição
                    </FormLabel>
                    <FormControl>
                      <Textarea {...field} className="w-full text-black" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isPublic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-ba">
                      Visibilidade do projeto
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">Público</SelectItem>
                        <SelectItem value="0">Privado</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col mt-2">
                <label className="text-gray-ba">Selecione um time</label>
                <select
                  className="mt-1 rounded-sm h-10"
                  onChange={handleTeamChange}
                >
                  {teams.map((team) => (
                    <option key={team.teamId} value={team.teamId}>
                      {team.teamName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="w-52 bg-gradient-to-r from-blue-violet-500 to-lilac hover:bg-blue-600 text-white py-2 px-4 mt-10 rounded-md transition duration-300 ease-in-out"
                >
                  Criar
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
