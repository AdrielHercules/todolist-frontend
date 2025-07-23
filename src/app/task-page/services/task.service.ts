import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private taskList: Task[] = [
    // 🟨 Mis Tareas (0)
    {
      id: '0',
      text: 'Crear tareas',
      completed: false,
      listId: '0',
    },
    {
      id: '1',
      text: 'Crear lista de tareas',
      completed: false,
      listId: '0',
    },
    {
      id: '2',
      text: 'Responder mensajes',
      completed: false,
      listId: '0',
    },
    {
      id: '3',
      text: 'Leer un capítulo',
      completed: false,
      listId: '0',
    },
    {
      id: '4',
      text: 'Programar alarma',
      completed: false,
      listId: '0',
    },
    {
      id: '5',
      text: 'Revisar correos',
      completed: true,
      listId: '0',
    },
    {
      id: '6',
      text: 'Revisar ruta',
      completed: true,
      listId: '0',
    },
    {
      id: '7',
      text: 'Tomar apuntes',
      completed: false,
      listId: '0',
    },
    {
      id: '8',
      text: 'Dar feedback positivo',
      completed: true,
      listId: '0',
    },
    {
      id: '9',
      text: 'Marcar favoritos',
      completed: false,
      listId: '0',
    },

    // 🛒 Compra (1)
    {
      id: '10',
      text: 'Preparar desayuno',
      completed: false,
      listId: '1',
    },
    {
      id: '11',
      text: 'Comprar leche',
      completed: false,
      listId: '1',
    },
    {
      id: '12',
      text: 'Comprar refrescos',
      completed: false,
      listId: '1',
    },
    {
      id: '13',
      text: 'Comprar pastel',
      completed: false,
      listId: '1',
    },
    {
      id: '14',
      text: 'Ir al mercado',
      completed: false,
      listId: '1',
    },
    {
      id: '15',
      text: 'Planificar menú semanal',
      completed: false,
      listId: '1',
    },
    {
      id: '16',
      text: 'Comprar verduras',
      completed: false,
      listId: '1',
    },
    {
      id: '17',
      text: 'Pagar la factura',
      completed: true,
      listId: '1',
    },

    // 🧼 Limpieza (2)
    {
      id: '18',
      text: 'Sacar la basura',
      completed: false,
      listId: '2',
    },
    {
      id: '19',
      text: 'Lavar el baño',
      completed: false,
      listId: '2',
    },
    {
      id: '20',
      text: 'Limpiar pizarra',
      completed: false,
      listId: '2',
    },
    {
      id: '21',
      text: 'Limpiar teclado',
      completed: false,
      listId: '2',
    },
    {
      id: '22',
      text: 'Medir estante',
      completed: false,
      listId: '2',
    },
    {
      id: '23',
      text: 'Revisar conexiones',
      completed: false,
      listId: '2',
    },
    {
      id: '24',
      text: 'Revisar herramientas',
      completed: false,
      listId: '2',
    },
    {
      id: '25',
      text: 'Organizar carpetas',
      completed: false,
      listId: '2',
    },

    // 💼 Trabajo (3)
    {
      id: '26',
      text: 'Reunión con el equipo',
      completed: false,
      listId: '3',
    },
    {
      id: '27',
      text: 'Actualizar software',
      completed: true,
      listId: '3',
    },
    {
      id: '28',
      text: 'Revisar alertas del sistema',
      completed: false,
      listId: '3',
    },
    {
      id: '29',
      text: 'Eliminar usuarios inactivos',
      completed: false,
      listId: '3',
    },
    {
      id: '30',
      text: 'Formatear documento',
      completed: true,
      listId: '3',
    },
    {
      id: '31',
      text: 'Subir archivos a la nube',
      completed: false,
      listId: '3',
    },
    {
      id: '32',
      text: 'Revisar configuración',
      completed: false,
      listId: '3',
    },
    {
      id: '33',
      text: 'Tomar fotos del producto',
      completed: false,
      listId: '3',
    },
    {
      id: '34',
      text: 'Revisar periféricos',
      completed: false,
      listId: '3',
    },
    {
      id: '35',
      text: 'Llamar a soporte',
      completed: false,
      listId: '3',
    },
    {
      id: '36',
      text: 'Preparar maletín',
      completed: true,
      listId: '3',
    },
    {
      id: '37',
      text: 'Editar video',
      completed: false,
      listId: '3',
    },
    {
      id: '38',
      text: 'Imprimir boletines',
      completed: false,
      listId: '3',
    },
    {
      id: '39',
      text: 'Hacer pruebas QA',
      completed: false,
      listId: '3',
    },
    {
      id: '40',
      text: 'Escribir reporte',
      completed: false,
      listId: '3',
    },

    // 💊 Salud (4)
    {
      id: '41',
      text: 'Tomar presión',
      completed: false,
      listId: '4',
    },
    {
      id: '42',
      text: 'Leer documentación',
      completed: true,
      listId: '4',
    },
    {
      id: '43',
      text: 'Guardar respaldo',
      completed: true,
      listId: '4',
    },

    // 🎮 Ocio (5)
    {
      id: '44',
      text: 'Sesión de videojuegos',
      completed: true,
      listId: '5',
    },
    {
      id: '45',
      text: 'Revisar grabación',
      completed: false,
      listId: '5',
    },
    {
      id: '46',
      text: 'Reproducir presentación',
      completed: true,
      listId: '5',
    },
    {
      id: '47',
      text: 'Escuchar música',
      completed: false,
      listId: '5',
    },
    {
      id: '48',
      text: 'Revisar portátil',
      completed: false,
      listId: '5',
    },
    {
      id: '49',
      text: 'Configurar Smart TV',
      completed: false,
      listId: '5',
    },
    {
      id: '50',
      text: 'Subir informe',
      completed: true,
      listId: '5',
    },
  ];

  getTasksByListId(id: string) {
    return this.taskList.filter((t) => t.listId === id);
  }

  pushTask(task: Partial<Task>) {
    if (!task.text || !task.listId) throw new Error('No se puede añadir una tarea sin texto ni listId');
    this.taskList.push({
      id: String(this.taskList.length),
      text: task.text,
      listId: task.listId,
      completed: false,
    });
  }

  getTasks() {
    return this.taskList;
  }
}
