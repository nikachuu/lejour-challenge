import { Injectable } from '@angular/core';
import { Invoice } from '../models/invoice.model';
import { Chart } from '../models/chart.model';
import { Months } from '../enum/months.enum';
import { Appointment } from '../models/appointment.model';


@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  public chartBartData: Chart;

  constructor() { }

  // Filter Sales By Months
  filterTotalSalesByMonths(invoices: Invoice[], year: number): Chart {
    // Get Months list
    const cat = invoices.filter((x) => new Date(x.CREATED_AT).getFullYear() === year);
    const months = cat.map((m) => new Date(m.CREATED_AT).getMonth());
    const monthsMerged = months.filter((x, i) => months.indexOf(x) === i);
    const labelMonths = monthsMerged.map((k) => Months[k]);


    const amountTotal = monthsMerged.map((m) => (
      invoices.filter((i) => new Date(i.CREATED_AT).getMonth() === m)
      .map((x) => x.AMOUNT).reduce((total, num) => Math.round(total + num))
    ));

    return {
      data: amountTotal,
      labels: labelMonths,
    };
  }

  // Filter Sales By Year
  filterTotalSalesByYear(invoices: Invoice[]): Chart {
    // Get Years list
    const cat = invoices.map((x) => new Date(x.CREATED_AT).getFullYear());
    const years = cat.filter((x, i) => cat.indexOf(x) === i);

    const amountTotal = years.map((y) => (
      invoices.filter((i) => new Date(i.CREATED_AT).getFullYear() === y)
      .map((x) => x.AMOUNT).reduce((total, num) => Math.round(total + num))
    ));

    return {
      data: amountTotal,
      labels: years,
    };
  }

  // Get total appointments by status
  getTotalAppointmentsByStatus(appointments: Appointment[]): Chart {
    const labels = {
      CREATED: 'Criado',
      CANCELED: 'Cancelado',
      CONFIRMED: 'Confirmado',
      VISITED: 'Visitado'
    }
    // Get Status
    const status = appointments.map((a) => a.STATUS);
    const appointmentsStatus = status.filter((x, i) => status.indexOf(x) === i);

    const totalAppointment = appointmentsStatus.map((a) => (
      appointments.filter((p) => p.STATUS === a).length
    ));

    const translatedLabel = appointmentsStatus.map((k) => labels[k]);

    return {
      data: totalAppointment,
      labels: translatedLabel,
    };
  }
}
