import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentRepository from '../repositories/AppointmentRepositorys';

const appointmentRouter = Router();
const appointmentRepository = new AppointmentRepository();

appointmentRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parseDate = startOfHour(parseISO(date));

  const findAppointmentSameDate = appointmentRepository.findByDate(parseDate);

  if (findAppointmentSameDate) {
    return response.status(400).json({
      message: 'Horário já reservado',
    });
  }

  const appointment = appointmentRepository.create({
    provider,
    date: parseDate,
  });

  return response.json(appointment);
});

appointmentRouter.get('/', (request, response) => {
  const appointments = appointmentRepository.lisAppointments();

  return response.json(appointments);
});

export default appointmentRouter;
