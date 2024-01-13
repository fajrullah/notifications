// src/services/OneTimeTaskService.ts
import { EmailService } from "./EmailService";
class OneTimeScheduleService {
    public async runOneTimeTask(): Promise<void> {
      console.log('Executing one-time task...');
      const sendingEmail = new EmailService();
      await sendingEmail.sendEmail()
    }
}

export default OneTimeScheduleService