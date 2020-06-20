import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentRepository from '../repositories/AppointmentRepositorys';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentRouter = Router();
const appointmentRepository = new AppointmentRepository();

appointmentRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const parseDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(
      appointmentRepository,
    );

    const appointment = createAppointment.execut({ provider, date: parseDate });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

appointmentRouter.get('/', (request, response) => {
  const appointments = appointmentRepository.lisAppointments();

  return response.json(appointments);
});

export default appointmentRouter;
