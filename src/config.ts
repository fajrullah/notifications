export const MESSAGE_DELIVERY_TIME = 8 // every 8am using 24
// export const COLLECT_DATA_TIME = '0 9 * * *' // every 9am collect tomorrow birthday, server timezone
export const COLLECT_DATA_TIME = '*/30 * * * * *' // every 30 seconds

export const SERVER_TIMEZONE = {
    US: 'America/New_York',
    ID: 'Asia/Jakarta'
}