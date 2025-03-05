import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { Appointment } from '../../models/appointment';
import { Modal } from 'bootstrap';
@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css'
})
export class AppointmentListComponent implements OnInit {
  doctorsName = '';
  patientsName = '';
  appointmentDateTime = '';
  appointments: Appointment[] = [];
  deleteIndex: number | null = null;

  ngOnInit() {
    window.bootstrap = window.bootstrap || {};
    const storedAppointments = localStorage.getItem('appointments');
    this.appointments = storedAppointments ? JSON.parse(storedAppointments) : [];
  }

  updateDateTime(value: string) {
    if (!value) {
      this.appointmentDateTime = '';
      return;
    }

    const selectedDate = new Date(value);
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      alert('Selected appointment date must be in the future.');
      this.appointmentDateTime = '';
    } else {
      this.appointmentDateTime = value;
    }
  }

  addAppointment(event: Event, form: NgForm) {
    event.preventDefault();

    if (form.invalid) {
      alert('Please fill out all fields and select a valid date before adding an appointment.');
      return;
    }

    const newAppointment: Appointment = {
      id: uuidv4(),
      doctorsName: this.doctorsName,
      patientsName: this.patientsName,
      appointmentDateTime: new Date(this.appointmentDateTime)
    };

    this.appointments.push(newAppointment);
    this.saveToLocalStorage();
    form.reset();
    this.showSuccessModal();
  }

  deleteAppointment(index: number) {
    if (confirm('Are you sure you want to delete this appointment?')) {
      this.appointments.splice(index, 1);
      this.saveToLocalStorage();
    }
  }

  private saveToLocalStorage() {
    localStorage.setItem('appointments', JSON.stringify(this.appointments));
  }

  openDeleteModal(index: number) {
    this.deleteIndex = index;
    const modalElement = document.getElementById('deleteModal') as HTMLElement;
    if (modalElement) {
      const deleteModal = new Modal(modalElement);
      deleteModal.show();
    }
  }

  confirmDelete() {
    if (this.deleteIndex !== null) {
      this.appointments.splice(this.deleteIndex, 1);
      this.deleteIndex = null; // Reset delete index
    }
  }

  showSuccessModal() {
    const modalElement = document.getElementById('successModal') as HTMLElement;
    if (modalElement) {
      const successModal = new Modal(modalElement);
      successModal.show();
    }
  }
}
