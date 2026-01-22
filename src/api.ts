import type {Pizza} from "./menu.ts"

const baseUrl: string = import.meta.env.VITE_BASE_URL

export async function getPizzas(): Promise<Pizza[]> {
    const res: Response = await fetch(`${baseUrl}/pizza`)
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