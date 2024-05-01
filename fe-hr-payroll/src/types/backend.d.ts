export interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: T;
}

export interface IModelPaginate<T> {
    meta: {
        current: number;
        pageSize: number;
        pages: number;
        total: number;
    },
    result: T[]
}

export interface IAccount {
    access_token: string;
    user: {
        _id: string;
        email: string;
        name: string;
        role: {
            _id: string;
            name: string;
        }
    }
}


export interface IGetAccount extends Omit<IAccount, access_token> { }

export interface IUser {
    _id?: string;
    name: string;
    email: string;
    password?: string;
    age: number;
    gender: string;
    address: string;
    role: string;
    createdBy?: string;
    isDeleted?: boolean;
    deletedAt?: boolean | null;
    createdAt?: string;
    updatedAt?: string;
}

export interface IPeople {
    Employee_ID?: number;
    First_Name: string;
    Last_Name: string;
    Gender: any;
    Email: string;
    Phone_Number: string;
    City: string;
    Shareholder_Status: any;
    Employment_Status: string;
    Ethnicity?: string;
    SSN?: number;
}
export interface IBenefit {
    Benefit_Plan_ID: number;
    Plan_Name: string;
    Deductable: number;
    Percentage_CoPay: number
    Employee?: {
        Employee_ID: number,
        Last_Name: string,
        First_Name: string,
        Email: string,
        Phone_Number: string,
        City: string,
        Gender: boolean,
        Ethnicity: string,
        Shareholder_Status: boolean,
        Benefit_Plans: number
    }
}

export interface IJob {
    ID: number,
    Department: string,
    Departmen_Code: number,
    Employee_ID: number,
    Division: string;
    Start_Date: Date;
    End_Date: Date
    Job_Title: string;
    Job_Category: string;
    Supervisor: string;
    Location: string;
    Salary_Type: number;
    Pay_Period
    Hours_per_Week: number;
    Hazardous_Training: boolean;
    Employee?: {
        Employee_ID: number,
        Last_Name: string,
        First_Name: string,
        Email: string,
        Phone_Number: string,
        City: string,
        Gender: boolean,
        Ethnicity: string,
        Shareholder_Status: boolean,
        Benefit_Plans: number
    }
}

export interface IPayrate {
    _id?: string;
    Pay_Rate_Name: string;
    Value: number;
    Tax_Percentage: number;
    Pay_Type: number;
    Pay_Amount: number
    PT_Level_C: number;
}

export interface IProduct {
    _id?: string;
    name: string;
    category: string;
    price: number;
    imgURL: string;
}