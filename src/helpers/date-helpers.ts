export const parseDateString = (string: string): Date => {
  const date = new Date(string)
  date.setHours(0, 0, 0, 0)
  return date
}

export const getDateString = (date: Date): string => {
  return date.toISOString().slice(0, 10)
}

export const getTomorrowsDate = (): Date => {
  const date = new Date()
  date.setDate(date.getDate() + 1)
  date.setHours(0, 0, 0, 0)
  return date
}

export const getCountdown = (endDate: Date): string => {
  const currentTimestamp = Date.now()

  let difference = (endDate.getTime() - currentTimestamp) / 1000

  if (difference < 0) {
    return 'Event is already finished'
  }

  const days = Math.floor(difference / (3600 * 24))
  difference -= days * 3600 * 24

  const hours = Math.floor(difference / 3600) % 24
  difference -= hours * 3600

  const minutes = Math.floor(difference / 60) % 60
  difference -= minutes * 60

  const seconds = Math.floor(difference % 60)

  return `${days} days, ${hours} h, ${minutes}m, ${seconds}s`
}
