import dayjs from '@/plugins/dayjs'
import { ref } from 'vue'

const datetimeFormat = ref('YYYY-MM-DD, HH:mm:ss')
export const OneMinute = 60
export const OneHour = OneMinute * 60
export const OneDay = OneHour * 24

export const isInvalidTime = (time: Date | string | number) =>
  !time || !dayjs(time).isValid()

// format LocalTime
export const formatTime = (time: Date | string, format?: string) => {
  if (isInvalidTime(time)) return time as string
  return dayjs(time).format(format || datetimeFormat.value)
}

// get LocalTime
export const getCurrDate = (format?: string) => {
  return dayjs().format(format || datetimeFormat.value)
}

// get time with timezone
export const getCurrDateWithTimezone = (tz: string, format?: string) => {
  return dayjs()
    .tz(tz)
    .format(format || datetimeFormat.value)
}

export const formatTimeWithTimezone = (
  time: Date | string,
  tz: string,
  format?: string,
) => {
  if (isInvalidTime(time)) return time as string
  return dayjs.tz(time, tz).format(format || datetimeFormat.value)
}

export const convertTimeFromNow = (
  time: Date | string | number,
  withoutSuffix?: boolean,
): string => {
  if (isInvalidTime(time)) return time as string
  return dayjs(time).fromNow(withoutSuffix)
}

export function getDurationNumber(
  start?: string | number | Date | null,
  end?: string | number | Date | null,
  showMilliseconds: boolean = false,
) {
  if (!start || !end) {
    return
  }

  try {
    const startTime = dayjs.utc(start).valueOf()
    const endTime = dayjs.utc(end).valueOf()
    const durationTime = Math.round((endTime - startTime) / 1000)
    if (durationTime < 0 && !showMilliseconds) {
      return
    }
    if (showMilliseconds) {
      return endTime - startTime
    }
    return durationTime
  }
  catch (error) {
    console.error(error)
  }
}

export function getDuration(
  start?: string | number | Date | null,
  end?: string | number | Date | null,
) {
  try {
    let durationTime = getDurationNumber(start, end)
    if ((!durationTime && durationTime !== 0) || durationTime < 0) {
      return
    }

    const days = Math.floor(durationTime / OneDay)
    durationTime %= OneDay

    const hours = Math.floor(durationTime / OneHour)
    durationTime %= OneHour

    const minutes = Math.floor(durationTime / OneMinute)
    const seconds = durationTime % OneMinute

    return {
      days,
      hours,
      minutes,
      seconds,
    }
  }
  catch (error) {
    console.error(error)
  }
}

export function getDateRange(gap: number) {
  const start = dayjs()
    .subtract(gap - 1, 'day')
    .startOf('day')
  const end = dayjs().endOf('day')

  return [start, end]
}
