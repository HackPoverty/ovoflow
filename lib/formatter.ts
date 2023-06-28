export const enShortDate = new Intl.DateTimeFormat('en', {
  month: 'short',
  day: 'numeric',
});

export const ptShortDate = new Intl.DateTimeFormat('pt', {
  month: 'short',
  day: 'numeric',
});

export const enFullDate = new Intl.DateTimeFormat('en', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

export const ptFullDate = new Intl.DateTimeFormat('pt', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

export const enRelativeTime = new Intl.RelativeTimeFormat('en', {
  numeric: 'auto',
});

export const ptRelativeTime = new Intl.RelativeTimeFormat('pt', {
  numeric: 'auto',
});

const DIVISIONS = [
  { amount: 60, name: "seconds" },
  { amount: 60, name: "minutes" },
  { amount: 24, name: "hours" },
  { amount: 7, name: "days" },
  { amount: 4.34524, name: "weeks" },
  { amount: 12, name: "months" },
  { amount: Number.POSITIVE_INFINITY, name: "years" },
] satisfies { amount: number, name: Intl.RelativeTimeFormatUnit }[]

export function formatTime(date: Date, compareWith: Date, formatter: Intl.RelativeTimeFormat = enRelativeTime) {
  let duration = (+date - +compareWith) / 1000

  for (let i = 0; i < DIVISIONS.length; i++) {
    const division = DIVISIONS[i]
    if (Math.abs(duration) < division.amount) {
      return formatter.format(Math.round(duration), division.name)
    }
    duration /= division.amount
  }
}