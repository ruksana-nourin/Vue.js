export interface User{
    id: number;
    name: string;
    email: string;
    password?: string;
}
export const defaultUser: User ={
    id:0,
    name: '',
    email: '',
};