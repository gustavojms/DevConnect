export const roleOptions = [
  {
    value: 'Developer',
    label: 'Developer',
  },
  {
    value: 'DBA',
    label: 'DBA',
  },
  {
    value: 'Designer',
    label: 'Designer',
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
