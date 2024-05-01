import axios from "config/axios"
import { IAccount, IBackendRes, IBenefit, IGetAccount, IJob, IModelPaginate, IPayrate, IPeople, IProduct, IUser } from "../types/backend"





/**
 * 
Module Auth
 */
export const callRegister = (name: string, email: string, password: string, age: number, gender: string, address: string) => {
    return axios.post<IBackendRes<IUser>>('/api/v1/auth/register', { name, email, password, age, gender, address })  as any
    
}

export const callLogin = (email: string, password: string) => {
    return axios.post<IBackendRes<IAccount>>('/api/auth/signin', { email, password }) 
}

export const callFetchAccount = () => {
    return axios.get<IBackendRes<IGetAccount>>('/api/auth/checkToken') 
}

export const callRefreshToken = () => {
    return axios.get<IBackendRes<IAccount>>('/api/v1/auth/refresh') 
}

export const callLogout = () => {
    return axios.get<IBackendRes<string>>('/api/auth/logout') 
}
/**
 * 
Module summarized information
 */
export const TotalEarnings = () => {
    return axios.post<IBackendRes<any>>('/api/v1/app3/TotalEarning')  
    
}

/**
 * 
Module User
 */
export const callCreateUser = (user: IPeople) => {
    return axios.post<IBackendRes<IPeople>>('/api/employee', { ...user }) 
}

export const callUpdateUser = (user: IPeople) => {
    return axios.patch<IBackendRes<IPeople>>(`/api/v1/app3/people`, { ...user }) 
}

export const callDeleteUser = (id: string) => {
    return axios.delete<IBackendRes<IPeople>>(`/api/employee/${id}`) 
}

export const callFetchUser = (query: string) => {
    return axios.get<IBackendRes<IModelPaginate<IPeople>>>(`/api/employee`) 
}
export const callFetchEmployees = () => {
    return axios.get<IBackendRes<IModelPaginate<IPeople>>>(`/api/v1/app3/people/all`) 
}
/**
 * 
Module jobhistoryapp3
 */
export const callCreateJob = (job: IJob) => {
    return axios.post<IBackendRes<IJob>>('/api/v1/app3/jobhistoryapp3', { ...job }) as any
}

export const callUpdateJob = (job: IJob) => {
    return axios.patch<IBackendRes<IJob>>(`/api/v1/app3/jobhistoryapp3`, { ...job }) as any
}

export const callDeleteJob = (id: number) => {
    return axios.delete<IBackendRes<IJob>>(`/api/v1/app3/jobhistoryapp3/${id}`) as any
}

export const callFetchJob = (query: string) => {
    return axios.get<IBackendRes<IModelPaginate<IJob>>>(`/api/v1/app3/jobhistoryapp3?${query}`) as any
}


/**
 * 
Module Benefit
 */
export const callCreateBenefit= (benefit: IBenefit) => {
    return  axios.post<IBackendRes<IBenefit>>('/api/v1/app3/benefitapp3', { ...benefit }) 
}

export const callUpdateBenefit= (benefit: IBenefit) => {
    return  axios.patch<IBackendRes<IBenefit>>(`/api/v1/app3/benefitapp3`, { ...benefit }) 
}

export const callDeleteBenefit = (id: number) => {
    return  axios.delete<IBackendRes<IBenefit>>(`/api/v1/app3/benefitapp3/${id}`) 
}

export const callFetchBenefit = (query: string) => {
    return axios.get<IBackendRes<IModelPaginate<IBenefit>>>(`/api/v1/app3/benefitapp3?${query}`)
}
/**
 * 
Module Payrate
 */
export const callCreatePayrate = (payrate: IPayrate) => {
    return axios.post<IBackendRes<IPayrate>>('/api/v1/app3/payRate', { ...payrate }) as any
}

export const callUpdatePayrate = (payrate: IPayrate) => {
    return axios.patch<IBackendRes<IPayrate>>(`/api/v1/app3/payRate`, { ...payrate }) as any
}

export const callDeletePayrate = (id: number) => {
    return axios.delete<IBackendRes<IPayrate>>(`/api/v1/app3/payRate/${id}`) as any
}

export const callFetchPayrate = (query: string) => {
    return axios.get<IBackendRes<IModelPaginate<IPayrate>>>(`/api/v1/app3/payRate?${query}`) as any
}

/**
 * 
Module product
 */
export const callCreateProduct = (Product: IProduct) => {
    return axios.post<IBackendRes<IPayrate>>('/api/products', { ...Product }) as any
}

export const callUpdateProduct = (Product: IProduct) => {
    return axios.patch<IBackendRes<IProduct>>(`/api/v1/app3/product`, { ...Product }) as any
}

export const callDeleteProduct = (id: number) => {
    return axios.delete<IBackendRes<IProduct>>(`/api/products/${id}`) as any
}

export const callFetchProduct= (query: string) => {
    return axios.get<IBackendRes<IModelPaginate<IProduct>>>(`/api/products`) as any
}