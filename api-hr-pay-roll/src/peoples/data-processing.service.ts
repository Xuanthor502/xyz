export interface PayrollData {
    _id: string;
    employeeId: number;
    firstName: string;
    lastName: string;
    SSN: number;
    birthDay: Date;
    payRate: string;
    vacationDays: number;
    paidToDate: number;
    paidLastYear: number;
    payRateId: {
        _id: string,
        Pay_Rate_Name: string,
        Value: number,
        Tax_Percentage: number,
        Pay_Type: number,
        Pay_Amount: number,
        PT_Level_C: number;
    };
}
export interface HRData {
    Employee_ID: number;
    Gender: boolean;
    Email: string;
    Phone_Number: string;
    City: string;
    Ethnicity: string;
    Shareholder_Status: boolean;

    Employment_Status: string;
    First_Name: string;
    Last_Name: string;
    benefit_plan: {
        Benefit_Plan_ID: number;
        Plan_Name: string;
        Deductable: number;
        Percentage_CoPay: number;
    };
    jobHistory: [{
        ID: number,
        Department: string,
        Departmen_Code: number
    }];
    employeeHR: {
        Employee_ID: number,
        Employment_Status: string;
    };
}
export class DataProcessingService {


    mixOneDataPersonalHREmployeePayRoll(hrData: HRData, payrollData: PayrollData) {

        let Gender = null;
        if (hrData.Gender === true) {
            Gender = 'Male';
        } else if (hrData.Gender === false) {
            Gender = 'Female';
        }

        let Shareholder_Status = null;
        if (hrData.Shareholder_Status === true) {
            Shareholder_Status = "Full-time";
        } else if (hrData.Shareholder_Status === false) {
            Shareholder_Status = "Pass-time";
        }
        if (payrollData.employeeId === hrData.Employee_ID) {
            return {
                Employee_ID: hrData.Employee_ID,
                First_Name: hrData.First_Name || null,
                Last_Name: hrData.Last_Name || null,
                Gender,
                Email: hrData.Email || null,
                Phone_Number: hrData.Phone_Number || null,
                City: hrData.City || null,
                Shareholder_Status,
            }
        }
        else {
            return {
                Employee_ID: payrollData.employeeId,
                First_Name: payrollData.firstName,
                Last_Name: payrollData.lastName,
                Gender: null,
                Email: null,
                Phone_Number: null,
                City: null,
                Shareholder_Status: null,
                Employment_Status: null
            }
        }
    }

    removeAccents(str) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }
    mixDataPersonalHREmployeePayRoll(hrDataArray: HRData[], payrollDataArray: PayrollData[]): any[] {
        const combinedData = [];
        const payrollDataMap = new Map(payrollDataArray.map(payroll => [this.removeAccents(`${payroll.employeeId}-${payroll.firstName}-${payroll.lastName}`), payroll]));
        hrDataArray.forEach(hrData => {
            const key = this.removeAccents(`${hrData.Employee_ID}-${hrData.First_Name}-${hrData.Last_Name}`);
            const payrollData = payrollDataMap.get(key);
            let combinedEntry = {
                Employee_ID: hrData.Employee_ID,
                First_Name: hrData.First_Name,
                Last_Name: hrData.Last_Name,
                Gender: hrData.Gender ? 'Male' : hrData.Gender === false ? 'Female' : null,
                Email: hrData.Email || null,
                Phone_Number: hrData.Phone_Number || null,
                City: hrData.City || null,
                Shareholder_Status: hrData.Shareholder_Status ? "Full-time" : hrData.Shareholder_Status === false ? "Part-time" : null,
                Employment_Status: hrData.employeeHR ? hrData.employeeHR.Employment_Status : null,
                VacationDays: payrollData?.vacationDays || null
            };

            combinedData.push(combinedEntry);
        });

        payrollDataArray.forEach(payroll => {
            const key = `${payroll.employeeId}-${payroll.firstName}-${payroll.lastName}`;
            if (!combinedData.some(entry => `${entry.Employee_ID}-${entry.First_Name}-${entry.Last_Name}` === key)) {
                combinedData.push({
                    Employee_ID: payroll.employeeId,
                    First_Name: payroll.firstName,
                    Last_Name: payroll.lastName,
                    Gender: null,
                    Email: null,
                    Phone_Number: null,
                    City: null,
                    Shareholder_Status: null,
                    Employment_Status: null,
                    VacationDays: payroll.vacationDays || null
                });
            }
        });

        return combinedData;
    }

}

