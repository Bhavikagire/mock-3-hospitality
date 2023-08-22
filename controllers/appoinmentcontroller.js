const appointment = require('../models/Appointment');

exports.createappointment = async (req, res) => {
  try {
   
    const {name,imageUrl,specialization,experience,location,date,slots,fee,} = req.body


    const newappointment = new appointment({
      name,imageUrl,specialization,experience,location,date,slots,fee,
    });

    await newappointment.save();
    res.status(201).json({ message: 'appointment created successfully' })
  } catch (error) {
    console.log(error)

    res.status(500).json({ message: 'Internal error' });
  }
};

exports.listappointments = async (req, res) => {
  try {
    const appointments = await appointment.find()
    res.status(200).json(appointments)

  } catch (error) {
    console.error(error)

    res.status(500).json({ message: 'Internal error' });
  }
};


exports.updateappointment = async (req, res) => {
  try {
    const {name,imageUrl,specialization,experience,location,date,slots,fee,} = req.body;

    await appointment.findByIdAndUpdate(req.params.id, {
      name,imageUrl,specialization,experience,location,date,slots,fee,
    });

    res.status(200).json({ message: 'appointment updated successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'error' , "error":error});
  }
};

exports.deleteappointment = async (req, res) => {
  try {
    await appointment.findByIdAndDelete(req.params.id)

    res.status(200).json({ message: 'appointment deleted' })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal error', "error":error });
  }
};

exports.filterAppointmentsBySpecialization = async (req, res) => {
    try {
      const { specialization } = req.params
      const appointments = await appointment.find({specialization});

      res.json(appointments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'internal error' });
    }
  };

exports.sortbydate = async(req, res) => {

    try {
      const appointments = await appointment.find().sort({ date: 1 })
      res.json(appointments)

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'internal error' })
    }

  };

  exports.searchappobyname=async (req, res)=>{
    try {
      const { name } = req.params

      const appointments = await appointment.find({name}); 

      res.json(appointments)
    } catch (error) {
      console.error(error)

      res.status(500).json({ message: 'internal error' });
    }
  };