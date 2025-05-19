import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import localeData from 'dayjs/plugin/localeData'

// Extend dayjs with plugins
dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(localeData)

export default dayjs
