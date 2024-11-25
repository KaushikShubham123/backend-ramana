const express = require('express')
const router = express.Router();
var userCtrl = require('../controllers/attendanceController')

router.post('/attendance', async (req, res) => {
  const { photoUrl, longitude, latitude, status, factoryName, id } = req.body;


  if (!(photoUrl && longitude && latitude && factoryName && id && status)) {
    return res.status(400).json({ error: 'Please provide all required details' });
  }

  try {

    const result = await userCtrl.attendance(
      { photoUrl, longitude, status, latitude, factoryName, id }
    );
    res.status(200).json({ message: 'Attendance recorded', id: result });
  }
  catch (error) {
    res.status(400).send(error.message);
  }
});


// router.post('/attendance/out', async (req, res) => {
//   const { outPhotoUrl, outLongitude, outLatitude, factoryName, id } = req.body;

//   try {

//     const result = await userCtrl.outAttendance(
//       { outPhotoUrl, outLongitude, outLatitude, factoryName, id }
//     );
//     res.status(200).json({ message: 'Out-time Attendance recorded', id: result });
//   }
//   catch (error) {
//     res.status(400).send(error.message);
//   }
// });


router.get('/employee/attendancedata', userCtrl.getEmployeeAttendance)
module.exports = router;