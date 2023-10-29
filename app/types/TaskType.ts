export type TaskType = {
  taskId: number;
  title: string;
  description: string;
  priority: string;
  status: string;
  hoursTaken: number;
  userId: number;
  responsibleId: number;
  responsible: {
    userId: number;
    username: string;
  };
  author: {
    username: string;
  };
  projectId: number;
  sprintId: number;
  createdAt: Date;
  updatedAt: Date;
  startedAt: Date;
  endedAt: Date;
};
