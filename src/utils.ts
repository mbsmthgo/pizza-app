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