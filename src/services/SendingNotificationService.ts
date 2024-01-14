// src/services/OneTimeTaskService.ts
import { handlerMessage } from '../utils';
import { EmailService } from "./EmailService";
class OneTimeScheduleService {
    public async runOneTimeTask(value: any, event?: string): Promise<void> {
      console.log('Executing the event task... ' + event + JSON.stringify(value));
      const sendingEmail = new EmailService();
      await sendingEmail.sendEmail({
        "email": value.email,
        "message": handlerMessage(value),
        payload: value
      })
    }
}

export default OneTimeScheduleService