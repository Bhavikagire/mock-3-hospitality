const express = require('express')
const router = express.Router()
const appointmentcontroller = require('../controllers/appoinmentcontroller');

router.post('/create', appointmentcontroller.createappointment)

router.get('/list', appointmentcontroller.listappointments)

router.put('/:id/update', appointmentcontroller.updateappointment)

router.delete('/:id/delete', appointmentcontroller.deleteappointment)

router.get('/filter/:specialization', appointmentcontroller.filterAppointmentsBySpecialization);

router.get('/sort/date', appointmentcontroller.sortbydate);

router.get('/search/:name', appointmentcontroller.searchappobyname);


module.exports = router;
