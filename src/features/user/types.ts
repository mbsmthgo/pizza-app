export type BirthDate = {
    day: number
    month: {
        name: string
        order: number
    }
    year: number
}

export type User = {
    email: string
    code: string
    name: string
    birthDate: BirthDate
}