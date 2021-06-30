import axiosClient from '../config/axios'

// Servicios para la entidad TipoNormativas
export const getTipoNormativa = async() => await axiosClient.get('/tiponormativas') ;
export const getOneTipoNormativa = async(codigoNormativa:  string) => await axiosClient.get(`/tiponormativas/${codigoNormativa}`) ;
export const createTipoNormativa = async(data:object) => await axiosClient.post('/tiponormativas', data);
export const deleteTipoNormativa = async(codigoNormativa: string) => await axiosClient.delete(`/tiponormativas/${codigoNormativa}`) ;
export const updateTipoNormativa = async(codigoNormativa: string, data:object) => await axiosClient.put(`/tiponormativas/${codigoNormativa}`, data) ;

// Servicios para la entidad OrigenNormativas
export const getOrigenNormativa = async() => await axiosClient.get('/origennormativas');
export const getOneOrigenNormativa = async(codigoOrigen:string) => await axiosClient.get(`/origennormativas/${codigoOrigen}`) ;
export const createOrigenNormativa = async(data:object) => await axiosClient.post('/origennormativas', data);
export const deleteOrigenNormativa = async(codigoOrigen: string) => await axiosClient.delete(`/origennormativas/${codigoOrigen}`) ;
export const updateOrigenNormativa = async(codigoOrigen: string, data:object) => await axiosClient.put(`/origennormativas/${codigoOrigen}`, data) ;


// Servicios para la entidad Normativas
export const getDocumento = async() => await axiosClient.get('/normativas');
export const getOneDocumento = async(id:number) => await axiosClient.get(`/normativas/${id}`) ;
export const createDocumento = async(data:object) => await axiosClient.post('/normativas', data);
export const deleteDocumento = async(id: number) => await axiosClient.delete(`/normativas/${id}`) ;
export const updateDocumento = async(id: number, data:object) => await axiosClient.put(`/normativas/${id}`, data) ;
