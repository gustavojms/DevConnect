export type TaskType = {
  taskId: number;
  title: string;
  description: string;
  priority: string;
  status: string;
  hoursTaken: number;
  userId: number;
  responsibleId: number;
  projectId: number;
  sprintId: number;
  createdAt: Date;
  updatedAt: Date;
};
