export interface User {
    id: string;
    email: string;
    password: string;
}

export interface Movie {
    id: string;
    title: string;
    year: number;
    image: string;
    createdBy?: string;
}
