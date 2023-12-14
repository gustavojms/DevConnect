export const roleOptions = [
  {
    value: 'Desenvolvedor',
    label: 'Desenvolvedor',
  },
  {
    value: 'QA',
    label: 'QA',
  },
  {
    value: 'Líder Técnico',
    label: 'Líder Técnico',
  },

  {
    value: 'Gerente de Projeto',
    label: 'Gerente de Projeto',
  },
];

export const usersOptions = (users: any) => {
  console.log(users);
  const r = users.map((user: any) => ({
    value: user.userId,
    label: user.username,
  }));

  return r;
};

export const teamMemberOptions = (members: any) => {
  const r = members.map((member: any) => ({
    value: member.member.userId,
    label: member.member.username,
  }));

  return r;
};
