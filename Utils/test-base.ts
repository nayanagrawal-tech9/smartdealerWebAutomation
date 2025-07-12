import {test as baseTest} from '@playwright/test';
interface TestDataForStoreSelection{

    url : string;
    userName : string;
    password : string;
    storeName : string;
    listOfStores : string[];
};

interface TestDataForEmployeeCreationFromSuperAdmin{

    url : string;
    userName : string;
    password : string;
    storeName : string;
    listOfStores : string[];
    

};

interface TestDataForEmployeeCreationFromPrimaryAdmin{

    url : string;
    userName : string;
    password : string;
    storeName : string;
    listOfStores : string[];
    employeeName : string
    employeePassword : string;
};

interface TestDataForScheduling{

    url : string;
    userName : string;
    password : string;
    storeName : string;
    groupName : string;
}

interface TestDataForGroupReports{

    url : string;
    userName : string;
    password : string;
    listOfStores : string[];

}



export const customTest = baseTest.extend<{
    testDataForStoreSelection:TestDataForStoreSelection;
    testDataForEmployeeCreationFromSuperAdmin:TestDataForEmployeeCreationFromSuperAdmin;
    testDataForEmployeeCreationFromPrimaryAdmin:TestDataForEmployeeCreationFromPrimaryAdmin;
    testDataForScheduling:TestDataForScheduling;
    testDataForGroupReports: TestDataForGroupReports;


}>(
    {
        testDataForStoreSelection : {
            url : "https://dev.gosmartdealer.com/login",
            userName : "dev-superadmin.dgs@yopmail.com",
            password : "Hello1234",
            storeName : "Young Wholesale",
            listOfStores : ["Clawson Motorsports", "Cycle City - Maui", "Fay Myers Motorcycle World", "Young Burley"]
      
        },

        testDataForEmployeeCreationFromSuperAdmin : {
            url : "https://dev.gosmartdealer.com/login",
            userName : "dev-superadmin.dgs@yopmail.com",
            password : "Hello1234",
            storeName : "Young Wholesale",
            listOfStores : ["Clawson Motorsports", "Cycle City - Maui", "Fay Myers Motorcycle World", "Young Burley"]
      
        },

        testDataForEmployeeCreationFromPrimaryAdmin : {
            url : "https://dev.gosmartdealer.com/login",
            userName : "Clawson.Motorsports@yopmail.com",
            password : "Hello1234",
            storeName : "Young Wholesale",
            listOfStores : ["Clawson Motorsports", "Cycle City - Maui", "Fay Myers Motorcycle World", "Young Burley"],
            employeeName : 'TestAutomation',
            employeePassword : 'Hello1234'
      
        },

        testDataForScheduling : {
            url : "https://dev.gosmartdealer.com/login",
            userName : "dev-superadmin.dgs@yopmail.com",
            password : "Hello1234",
            groupName : "Cycle City",
            storeName : "Cycle City Ltd"      
        },

        testDataForGroupReports : {
            url : "https://dev.gosmartdealer.com/login",
            userName : "dev-superadmin.dgs@yopmail.com",
            password : "Hello1234",
            listOfStores : ["Clawson Motorsports", "Cycle City - Maui", "Fay Myers Motorcycle World", "Young Burley"]     
        }
    }
)
