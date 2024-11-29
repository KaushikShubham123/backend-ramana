var db = require('../models');
const AttendanceTable = db.attendanceTable;
const User = db.user;
const { Op } = require('sequelize');


const attendance = async (data) => {

  const { photoUrl, longitude, latitude, factoryName, id, status } = data;

  // if (!(photoUrl && longitude && latitude && factoryName && id && status)) {
  //   throw Error("Please provide all required details");
  // }


  // Step 1: Check if the employee exists
  const existingUser = await User.findOne({ where: { id } });
  if (!existingUser) {
    throw Error("Employee doesn't exist with the given ID");

  }

  // Step 2: Determine if the attendance is for "in" or "out"
  const todayDate = new Date().toISOString().slice(0, 10); // Get the date in YYYY-MM-DD format

  // Step 3: Handle the "in" action
  if (status === 'IN') {
    // Check if there's already an attendance for today (in)
    // Ensure Sequelize operators are imported

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0); // Start of today (midnight)

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999); // End of today

    const existingAttendance = await AttendanceTable.findOne({
      where: {
        employeeId: id,
        outTime: null, // If there's no out time, it's an "in" record
        createdAt: { [Op.gte]: todayDate } // Ensure it's for today
      }
    });

    if (existingAttendance) {
      throw Error("Employee has already clocked in today");
    }

    // Record the "in" attendance
    const inTimeStamp = new Date().toISOString().slice(0, 19).replace('T', ' '); // Get the current timestamp
    const newAttendance = await AttendanceTable.create({
      inPhotoUrl: photoUrl,
      inLongitude: longitude,
      inLatitude: latitude,
      factoryName,
      employeeId: id,
      inTime: inTimeStamp, // Record in_time
    });

    return newAttendance;
  }

  // Step 4: Handle the "out" action
  if (status === 'OUT') {
    // Check if the employee has clocked in today (i.e., there's no out time yet)
    const existingOutAttendance = await AttendanceTable.findOne({
      where: {
        employeeId: id,
        inTime: null,

        createdAt: { [Op.gte]: todayDate } // Ensure it's for today
      }
    });

    if (existingOutAttendance) {
      throw Error("Employee has already clocked Out today");
    }

    const attendance = await AttendanceTable.findOne({
      where: {
        employeeId: id,
        outTime: null, // Looking for the attendance without out time
        createdAt: { [Op.gte]: todayDate } // Ensure it's for today
      }
    });

    if (!attendance) {
      throw Error("Employee hasn't clocked in today")

    }

    // Record the "out" attendance
    const outTimeStamp = new Date().toISOString().slice(0, 19).replace('T', ' '); // Get the current timestamp
    attendance.outPhotoUrl = photoUrl;
    attendance.outLongitude = longitude;
    attendance.outLatitude = latitude;
    attendance.factoryName = factoryName;
    attendance.outTime = outTimeStamp; // Update out time

    await attendance.save();

    return outTimeStamp;
  }



};




var getEmployeeAttendance = async (req, res) => {

  const data = await AttendanceTable.findAll();

  res.status(200).json({ data: data });

}


module.exports = {
  attendance,
  getEmployeeAttendance

}
