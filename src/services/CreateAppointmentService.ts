import { startOfHour } from 'date-fns';
import Appointment from '../models/appointments';
import AppointmentRepository from '../repositories/AppointmentRepositorys';

interface RequestDTO {
  provider: string;
  date: Date;
}

export default class CreateAppointmentService {
  private appointmentRepository: AppointmentRepository;

  constructor(appointmentRepository: AppointmentRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  public execut({ date, provider }: RequestDTO): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppointmentSameDate = this.appointmentRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentSameDate) {
      throw Error('Horário já reservado');
    }

    const appointment = this.appointmentRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}
