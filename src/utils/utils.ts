import type {Ingredient} from "../menu.ts";

export type OrderResIngredient = {
    allowedOptions: string[]
    id: number
    name: string
    photo: string
    price: number
    type: string
}

export type OrderResPizzaItem = {
    id: number
    name: string
    photo: string
    price: number
    options: OrderResIngredient[]
    size: string
    type: string
}

export type OrderResponse = {
    id: number
    name: string
    phone: string
    address: string
    comment: string
    pizzas: OrderResPizzaItem[]
    price: number
    createdAt: string
    deliveredAt: string
    status: string
}

export type OrderPizza = {
    id: number
    options: number[]
    size: string
    type?: string
}

export type OrderObj = {
    name: string
    phone: string
    address: string
    comment?: string
    pizzas: OrderPizza[]
}

export const steps: string[] = ["Accepted", "Cooking",
    "Packing", "Delivering", "Delivered"]
export type AboutFact = {
    id: number
    factName: string
    factDescription: string
}
export const aboutFacts: AboutFact[] = [
    {
        id: 1,
        factName: "Cheese dominance",
        factDescription: "We travel the world to bring the most amazing cheeses to our pizzeria: from classic Italian mozzarella to bold French dorblu..."
    },
    {
        id: 2,
        factName: "Premium quality ingredients",
        factDescription: "Savory pepperoni, the freshest shrimp, selected tomatoes and herbs are worthy partners for our main character..."
    },
    {
        id: 3,
        factName: "Available to everyone",
        factDescription: "From early morning to late evening, our deliverers are ready to give you pleasure in every slice at a very attractive price..."
    }
]
export const months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export function chooseDeliveryTime(): string[] {
    const now = new Date()
    const deliveryIntervals: string[] = []
    const deliveryDuration = 45
    const startHour = 9
    const endHour = 23

    const startTime: Date = new Date(now)
    startTime.setMinutes(startTime.getMinutes() + deliveryDuration)

    const totalMinutes: number = startTime.getHours() * 60 + startTime.getMinutes()
    const roundedMinutes: number = Math.ceil(totalMinutes / deliveryDuration) * deliveryDuration

    startTime.setHours(Math.floor(roundedMinutes / 60))
    startTime.setMinutes(roundedMinutes % 60)

    if (startTime.getHours() < startHour) {
        const minStartMinutes: number = Math.ceil(startHour * 60 / deliveryDuration) * deliveryDuration
        startTime.setHours(Math.floor(minStartMinutes / 60))
        startTime.setMinutes(minStartMinutes % 60)
    }

    while (startTime.getHours() < endHour || (startTime.getHours() === endHour && startTime.getMinutes() === 0)) {
        const endTime: Date = new Date(startTime)
        endTime.setMinutes(endTime.getMinutes() + deliveryDuration)
        if (endTime.getHours() > endHour || (endTime.getHours() === endHour && endTime.getMinutes() > 0)) {
            break
        }

        const formatTime = (time: Date): string => {
            return `${time.getHours().toString().padStart(2, "0")}:${time.getMinutes().toString().padStart(2, "0")}`
        }

        deliveryIntervals.push(`${formatTime(startTime)}-${formatTime(endTime)}`)
        startTime.setMinutes(startTime.getMinutes() + deliveryDuration)
    }
    return deliveryIntervals
}

export function handleAddExtra(arrayOfExtras: Ingredient[], ingredient: Ingredient,
                               saveArray: (value: Ingredient[] | ((prev: Ingredient[]) => Ingredient[])) => void
): void {
    const existingIndex: number = arrayOfExtras.findIndex((item: Ingredient): boolean => item.id === ingredient.id)
    if (existingIndex === -1) {
        saveArray((prev: Ingredient[]): Ingredient[] => [...prev, ingredient])
    } else if (existingIndex !== -1) {
        saveArray((prev: Ingredient[]): Ingredient[] => prev.filter((item: Ingredient): boolean => item.id !== ingredient.id))
    }
}

