import * as moment from 'moment-timezone';
import * as schedule from 'node-schedule';

// Function to send birthday messages
const sendBirthdayMessage = (userId: string) => {
  // Replace this with your actual logic to send messages
  console.log(`Sending birthday message to user ${userId}`);
};

// Schedule a task to check for birthdays every day at midnight UTC
schedule.scheduleJob('0 0 * * *', () => {
  // Fetch users with birthdays on the current day from the database
  const usersWithBirthdays = getUsersWithBirthdays();

  // Iterate over users and check if it's 9 am in their local time
  usersWithBirthdays.forEach((user) => {
    const userTimeZone = user.timeZone || 'UTC'; // Default to UTC if time zone is not set
    const userLocalTime = moment().tz(userTimeZone);

    // Check if it's 9 am in the user's local time
    if (userLocalTime.hours() === 9 && userLocalTime.minutes() === 0) {
      sendBirthdayMessage(user.id);
    }
  });
});

// Function to fetch users with birthdays on the current day (dummy function, replace with your logic)
function getUsersWithBirthdays(): Array<{ id: string; timeZone?: string }> {
  // Replace this with your actual logic to fetch users from the database
  // Example: return users with birthdays today
  return [
    { id: 'user1', timeZone: 'America/New_York' },
    { id: 'user2', timeZone: 'Australia/Melbourne' },
  ];
}

console.log('Birthday scheduler is running. Press Ctrl+C to stop.');
