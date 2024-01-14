import moment from 'moment-timezone';
import { MESSAGE_DELIVERY_TIME, SERVER_TIMEZONE } from '../config';
import { MessageTemplate } from "../types";


const isTimeZoneValid = (timeZone: string): boolean => {
    try {
      Intl.DateTimeFormat(undefined, { timeZone });
      return true;
    } catch (error) {
      return false;
    }
  }

export const TimezoneConverter = (timezone: string): string => {
  
    if(!isTimeZoneValid(timezone)){
      return moment().tz(SERVER_TIMEZONE.ID).add(1, 'day').startOf('day').add(8, 'hours').format('YYYY-MM-DD HH:mm:ss');
    }
    
    // getToday from other timezone
    const currentLocalDateTime: moment.Moment = moment().tz(timezone);

    // make it Tomorrow based timezone
    const tomorrowAt8AM: moment.Moment = currentLocalDateTime.clone().add(1, 'day').startOf('day').add(MESSAGE_DELIVERY_TIME, 'hours');
    
    // const tomorrowAt8AM: moment.Moment = currentLocalDateTime.clone().add(10, 'seconds');

    const serverDateTime: moment.Moment = tomorrowAt8AM.clone().tz(SERVER_TIMEZONE.ID);

    console.log('Local Date and Time in Other Time Zone:', tomorrowAt8AM.format('YYYY-MM-DD HH:mm:ss'));

    console.log('Server Date and Time:', serverDateTime.format('YYYY-MM-DD HH:mm:ss'));

    return serverDateTime.format('YYYY-MM-DD HH:mm:ss')
}


export const handlerMessage = (value: any): string => {
  const { firstName, lastName } = value;
  const originalText = MessageTemplate.BIRTHDAY_TEMPLATE;
  const newText = originalText.replace(/\{full_name\}/g, `${firstName} ${lastName}`);
  return newText
}
