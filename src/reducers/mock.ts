import {DataField} from "@/types/generator";
import {DataType} from "@/constants/enums";

export const mockFields: DataField[] = [
    {
        id:"1",
        fieldName: 'name',
        isDraft: false,
        dataType: DataType.PERSON_NAME,
        emptyRate:0,
    },
    {
        id:"2",
        fieldName: 'phone',
        isDraft: false,
        dataType: DataType.NUMBER,
        emptyRate:0,
    },
    {
        id:"3",
        fieldName: 'email',
        isDraft: false,
        dataType: DataType.ACCOUNT_NUMBER,
        emptyRate:0,
    },
    {
        id:"4",
        fieldName: 'dob',
        isDraft: false,
        dataType: DataType.DATE_TIME,
        emptyRate:0,
    },
    {
        id:"5",
        fieldName: 'company',
        isDraft: false,
        dataType: DataType.PERSON_NAME,
        emptyRate:50,
    },
    {
        id:"6",
        fieldName: 'isActive',
        isDraft: false,
        dataType:DataType.BOOLEAN,
        emptyRate:0,
    }
]

export const mockData: any[] = [
    {
        "name": "Kylynn Santana",
        "phone": "(636) 163-2171",
        "email": "nibh@aol.ca",
        "dob": "Mar 21, 2023",
        "company": "Justo Faucibus Incorporated",
        "isActive": "Yes"
    },
    {
        "name": "Mallory Estes",
        "phone": "1-420-111-1466",
        "email": "quis.urna@icloud.couk",
        "dob": "May 15, 2023",
        "company": "Tincidunt Vehicula Risus Inc.",
        "isActive": "Yes"
    },
    {
        "name": "Catherine Lowe",
        "phone": "(737) 391-4016",
        "email": "pede.ac@outlook.org",
        "dob": "Oct 25, 2022",
        "company": "Et Euismod Et LLC",
        "isActive": "No"
    },
    {
        "name": "Kirsten Ratliff",
        "phone": "(792) 426-2883",
        "email": "augue.id@yahoo.com",
        "dob": "Dec 28, 2022",
        "company": "Vel Sapien Imperdiet Limited",
        "isActive": "Yes"
    },
    {
        "name": "Jolene Guzman",
        "phone": "(883) 895-5219",
        "email": "neque.venenatis@protonmail.edu",
        "dob": "Aug 17, 2022",
        "company": "Enim Non Nisi Associates",
        "isActive": "Yes"
    },
    {
        "name": "Dennis Donovan",
        "phone": "(256) 412-7198",
        "email": "aliquam.eros@outlook.edu",
        "dob": "Mar 6, 2023",
        "company": "Felis Nulla Institute",
        "isActive": "No"
    },
    {
        "name": "Gareth Lyons",
        "phone": "(779) 645-3337",
        "email": "congue.turpis@hotmail.edu",
        "dob": "Dec 12, 2023",
        "company": "Pede Ltd",
        "isActive": "Yes"
    },
    {
        "name": "Ariel Villarreal",
        "phone": "1-335-445-8517",
        "email": "sagittis.duis.gravida@aol.net",
        "dob": "Nov 24, 2023",
        "company": "Egestas Corporation",
        "isActive": "No"
    },
    {
        "name": "Quintessa Vang",
        "phone": "(959) 644-2386",
        "email": "dictum@google.com",
        "dob": "May 7, 2024",
        "company": "Hymenaeos Mauris Ltd",
        "isActive": "No"
    },
    {
        "name": "Kelsie Durham",
        "phone": "1-641-704-0894",
        "email": "volutpat.nulla.facilisis@hotmail.net",
        "dob": "Oct 23, 2022",
        "company": "Sapien Cursus In Foundation",
        "isActive": "No"
    },
    {
        "name": "Anastasia Mcintosh",
        "phone": "1-731-182-4154",
        "email": "facilisis.facilisis@aol.com",
        "dob": "Sep 21, 2023",
        "company": "Morbi LLP",
        "isActive": "Yes"
    },
    {
        "name": "Aristotle Mccormick",
        "phone": "(741) 832-4133",
        "email": "amet.risus.donec@yahoo.net",
        "dob": "May 3, 2023",
        "company": "In Dolor Fusce Incorporated",
        "isActive": "Yes"
    },
    {
        "name": "Katell Peters",
        "phone": "1-257-419-1557",
        "email": "eleifend.cras.sed@icloud.edu",
        "dob": "Nov 17, 2023",
        "company": "Erat Vivamus Industries",
        "isActive": "Yes"
    },
    {
        "name": "Coby Alvarez",
        "phone": "(254) 474-5582",
        "email": "lobortis@outlook.com",
        "dob": "Nov 1, 2022",
        "company": "Purus Gravida LLC",
        "isActive": "No"
    },
    {
        "name": "Gillian Becker",
        "phone": "(579) 616-4843",
        "email": "phasellus.dapibus.quam@hotmail.couk",
        "dob": "Apr 19, 2023",
        "company": "Fusce Fermentum Inc.",
        "isActive": "No"
    },
    {
        "name": "Silas Franklin",
        "phone": "(615) 386-3159",
        "email": "enim@aol.net",
        "dob": "Dec 14, 2022",
        "company": "Habitant Morbi Institute",
        "isActive": "No"
    },
    {
        "name": "Ruth Lowe",
        "phone": "(938) 235-9539",
        "email": "cras.lorem.lorem@icloud.net",
        "dob": "Jan 23, 2024",
        "company": "Nec Eleifend PC",
        "isActive": "No"
    },
    {
        "name": "Deanna Silva",
        "phone": "(231) 416-5635",
        "email": "curae@aol.net",
        "dob": "Feb 21, 2023",
        "company": "Mollis Non LLP",
        "isActive": "No"
    },
    {
        "name": "Finn Chase",
        "phone": "(186) 319-2319",
        "email": "elit@hotmail.edu",
        "dob": "Jan 16, 2023",
        "company": "Felis Ullamcorper LLC",
        "isActive": "No"
    },
    {
        "name": "Urielle Cruz",
        "phone": "1-468-437-5856",
        "email": "convallis@yahoo.edu",
        "dob": "Jan 20, 2024",
        "company": "Dapibus Consulting",
        "isActive": "Yes"
    }
]

