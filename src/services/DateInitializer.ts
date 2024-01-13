import moment from 'moment';

class DateInitializer {
    protected _currentDate: moment.Moment;
    protected _tomorrow: moment.Moment;
  
    constructor() {
      this._currentDate = moment();
      this._tomorrow = this._currentDate.clone().add(1, 'day');
    }
}

export default DateInitializer;