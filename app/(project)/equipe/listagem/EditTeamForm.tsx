import { fetchTeamMembers } from '@/app/services/ApiService';
import React, { Component } from 'react';

interface EditTeamFormProps {
  teamId: number;
}

export default class EditTeamForm extends Component<EditTeamFormProps> {
  getTeamData = async () => {
    const response = await fetchTeamMembers(this.props.teamId);
    // eslint-disable-next-line spaced-comment
    console.log(response);
  };

  render() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { teamId } = this.props;
    this.getTeamData();
    return (
      <div>
        <h1 className="text-white">Cheguei aqui</h1>
      </div>
    );
  }
}
