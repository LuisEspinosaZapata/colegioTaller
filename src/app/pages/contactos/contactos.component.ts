import { Component, OnInit } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Contact {
  id: string;
  nombre: string;
  apellido?: string;
  email: string;
  telefono?: string;
  grado?: string;
  mensaje?: string;
  fecha?: string;
}

@Component({
  selector: 'app-contactos',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css']
})
export class ContactosComponent implements OnInit {
  contactos: Contact[] = [];
  editMode = false;
  editId: string | null = null;
  search = '';
  model: Partial<Contact> = {};

  ngOnInit(): void {
    this.load();
  }

  private load() {
    const data = localStorage.getItem('colegio_contacts');
    this.contactos = data ? JSON.parse(data) : [];
  }

  private save() {
    localStorage.setItem('colegio_contacts', JSON.stringify(this.contactos));
  }

  submit(form: NgForm) {
    if (form.invalid) return;

    if (this.editMode && this.editId) {
      const index = this.contactos.findIndex(c => c.id === this.editId);
      if (index > -1) {
        this.contactos[index] = { ...this.contactos[index], ...this.model };
      }
      this.editMode = false;
      this.editId = null;
    } else {
      const nuevo: Contact = {
        ...(this.model as Contact),
        id: Date.now().toString(),
        fecha: new Date().toISOString()
      };
      this.contactos.push(nuevo);
    }

    this.save();
    form.resetForm();
    this.model = {};
    this.load();
  }

  edit(contacto: Contact) {
    this.editMode = true;
    this.editId = contacto.id;
    this.model = { ...contacto };
  }

  cancelEdit() {
    this.editMode = false;
    this.editId = null;
    this.model = {};
  }

  remove(id: string) {
    if (confirm('¿Eliminar este contacto?')) {
      this.contactos = this.contactos.filter(c => c.id !== id);
      this.save();
      this.load();
    }
  }

  filtered(): Contact[] {
    const q = this.search.trim().toLowerCase();
    if (!q) return this.contactos;
    return this.contactos.filter(c =>
      `${c.nombre} ${c.apellido} ${c.email} ${c.telefono} ${c.grado}`
        .toLowerCase().includes(q)
    );
  }
}
