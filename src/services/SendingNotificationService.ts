// src/services/OneTimeTaskService.ts
import { MessageTemplate } from "../types";
import { EmailService } from "./EmailService";
class OneTimeScheduleService {
    public async runOneTimeTask(value: any, event?: string): Promise<void> {
      console.log('Executing the event task... ' + event + JSON.stringify(value));
      const sendingEmail = new EmailService();
      await sendingEmail.sendEmail({
        "email": value.email,
        "message": this.handlerMessage(value),
        payload: value
      })
    }

    private handlerMessage(value: any): string {
      const { firstName, lastName } = value;
      const originalText = MessageTemplate.BIRTHDAY_TEMPLATE;
      const newText = originalText.replace(/\{full_name\}/g, `${firstName} ${lastName}`);
      return newText
    }
}

export default OneTimeScheduleService