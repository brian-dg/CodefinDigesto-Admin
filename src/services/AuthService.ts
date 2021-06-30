import axiosClient from '../config/axios'

export const Signin = async(data:object) => await axiosClient.post('/signin', data) 



