import type {Drink, Ingredient, Pizza} from "./menu.ts"

const baseUrl: string = import.meta.env.VITE_BASE_URL

export async function getPizzas(): Promise<Pizza[]> {
    const res: Response = await fetch(`${baseUrl}/pizza`)
    return await res.json()
}
export async function getDrinks(): Promise<Drink[]> {
    const res: Response = await fetch(`${baseUrl}/drink`)
    return await res.json()
}
export async function getIngredients(type: "PIZZA" | "DRINK", options: string[]): Promise<Ingredient[]> {
    const res: Response = await fetch(`${baseUrl}/ingredient/${type}?options=${options.join(",")}`)
    return await res.json()
}

export function sendCodeToEmail(email: string): void {
    fetch(`${baseUrl}/api/auth/send-ttp?email=${email}`, {method: "POST"})
        .then(res => res.json()).then(data => console.log(data))
}

export async function verifyCode(email: string, code: string) {
    const res: Response = await fetch(`${baseUrl}/api/auth/verify-ttp?email=${email}&ttp=${code}`, {method: "POST"})
    return await res.json()
}