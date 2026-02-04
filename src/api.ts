import type {Drink, Ingredient, Pizza} from "./menu.ts"
import type {OrderObj} from "./utils/utils.ts";
import type {User} from "./features/user/types.ts";
import {CustomEventSource} from "extended-eventsource";
const delay = (ms : number) => new Promise(resolve => setTimeout(resolve, ms))
const baseUrl: string = import.meta.env.VITE_BASE_URL

export async function getPizzas(): Promise<Pizza[]> {
    const res: Response = await fetch(`${baseUrl}/pizza`)
    await delay(3000)
    return await res.json()
}

export async function getDrinks(): Promise<Drink[]> {
    const res: Response = await fetch(`${baseUrl}/drink`)
    await delay(3000)
    return await res.json()
}

export async function getIngredients(type: "PIZZA" | "DRINK", options: string[]): Promise<Ingredient[]> {
    const res: Response = await fetch(`${baseUrl}/ingredient/${type}?options=${options.join(",")}`)
    return await res.json()
}

export function sendCodeToEmail(email: string): void {
    fetch(`${baseUrl}/api/auth/send-ttp?email=${email}`, {method: "POST"})
        .then((res: Response) => res.json())
}

export async function verifyCode(email: string, code: string) {
    const res: Response = await fetch(`${baseUrl}/api/auth/verify-ttp?email=${email}&ttp=${code}`, {method: "POST"})
    return await res.json()
}

export function placeOrder(orderObj: OrderObj, user: User) {
    const auth: string = btoa(`${user.email}:${user.code}`)
    return fetch(`${baseUrl}/api/orders`, {
        method: "POST",
        headers: {"Content-Type": "application/json", "Authorization": `Basic ${auth}`},
        body: JSON.stringify(orderObj)
    }).then((res: Response) => res.json())
}

export async function getOrder(orderId: string | undefined, user: User) {
    const auth: string = btoa(`${user.email}:${user.code}`)
    const res: Response = await fetch(`${baseUrl}/api/orders/${orderId}`, {
        headers: {"Authorization": `Basic ${auth}`}
    })
    return await res.json()
}

export async function getAllOrders(user: User) {
    const auth: string = btoa(`${user.email}:${user.code}`)
    const res: Response = await fetch(`${baseUrl}/api/orders`, {
        headers: {"Authorization": `Basic ${auth}`}
    })
    await delay(3000)
    return await res.json()
}

export function getOrderEvents(orderId: string | undefined, user: User) {
    const auth: string = btoa(`${user.email}:${user.code}`)
    const source = new CustomEventSource(`${baseUrl}/api/orders/${orderId}/events`, {
        headers: {"Authorization": `Basic ${auth}`}})
    return source
}