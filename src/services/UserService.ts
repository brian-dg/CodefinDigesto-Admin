import axiosClient from '../config/axios'

export const getUsers = async() => await axiosClient.get('/users') 
export const getOneUser = async(id:number) => await axiosClient.get(`/users/${id}`) 
export const createUser = async(data:object) => await axiosClient.post('/users', data) 
export const updateUsers = async(data:object, id:number) => await axiosClient.put(`/users/${id}`, data)
export const deleteUser = async(id:number) => await axiosClient.delete(`/users/${id}`)  