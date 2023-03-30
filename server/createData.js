const db = require("./database/db")
const Facility = require("./database/models/facility");
const Activity = require("./database/models/activity");
const Classes = require("./database/models/classes");

const facilities = [
    { facilityName: "Studio", capacity: 25, startTime: "08:00:00", endTime: "22:00:00" },
    { facilityName: "Swimming pool", capacity: 30, startTime: "08:00:00", endTime: "20:00:00" },
    { facilityName: "Fitness room", capacity: 35, startTime: "08:00:00", endTime: "22:00:00" },
    { facilityName: "Sports hall", capacity: 45, startTime: "08:00:00", endTime: "22:00:00" },
    { facilityName: "Squash court", capacity: 4, startTime: "08:00:00", endTime: "22:00:00" },
    { facilityName: "Climbing wall", capacity: 22, startTime: "10:00:00", endTime: "20:00:00" }
];

const activities = [
    { activityName: "General use", price: "8", facilityName: "Swimming pool" },
    { activityName: "Lane swimming", price: "8", facilityName: "Swimming pool" },
    { activityName: "Lessons", price: "10", facilityName: "Swimming pool" },
    { activityName: "Team events", day: "Friday", startTime: "08:00:00", endTime: "10:00:00", price: "20", facilityName: "Swimming pool" },
    { activityName: "General use", price: "8", facilityName: "Fitness room" },
    { activityName: "1-hour sessions", price: "8", facilityName: "Squash court" },
    { activityName: "1-hour sessions", price: "8", facilityName: "Sports hall" },
    { activityName: "Team events", day: "Thurdsay", startTime: "19:00:00", endTime: "21:00:00", price: "20", facilityName: "Sports hall" },
    { activityName: "General use", price: "8", facilityName: "Climbing wall" }
];

const classes = [
    { className: "Pilates", day: "Monday", startTime: "18:00:00", endTime: "19:00:00", price: "10", facilityName: "Studio" },
    { className: "Aerobics", day: "Tuesday", startTime: "10:00:00", endTime: "11:00:00", price: "10", facilityName: "Studio" },
    { className: "Aerobics", day: "Thursday", startTime: "19:00:00", endTime: "20:00:00", price: "10", facilityName: "Studio" },
    { className: "Aerobics", day: "Saturday", startTime: "10:00:00", endTime: "11:00:00", price: "10", facilityName: "Studio" },
    { className: "Yoga", day: "Friday", startTime: "19:00:00", endTime: "20:00:00", price: "10", facilityName: "Studio" },
    { className: "Yoga", day: "Sunday", startTime: "09:00:00", endTime: "10:00:00", price: "10", facilityName: "Studio" }
];

(async () => {
  try {
    await db.sync({ force: true });
    const createdFacilities = await Facility.bulkCreate(facilities);
    const createdActivities = await Activity.bulkCreate(activities);
    const createdClasses = await Classes.bulkCreate(classes);
    console.log("Models created");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();












