export type RequestMethod = {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  url: string;
  data?: any;
};
