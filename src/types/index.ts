
export enum LogStatus {
    PENDING = 'PENDING',
    SENT = 'SENT',
    FAILED = 'FAILED',
    CAN_NOT_PROCEED = 'CAN_NOT_PROCEED',
    RETRY = 'RETRY'
}

export enum MessageTemplate {
    BIRTHDAY_TEMPLATE = 'Hey, {full_name} it’s your birthday',
}