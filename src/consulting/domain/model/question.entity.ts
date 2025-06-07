export interface Question {
    id: string;
    title: string;
    content: string; // Cambio de 'description' a 'content' para consistencia
    status: string; // Cambio de 'question_status' a 'status' con tipos específicos
    created_at: Date; // Agregado para tracking de fecha
    updated_at?: Date; // Agregado para tracking de actualizaciones
    user_id: string; // Cambio de 'userId' a 'user_id' para consistencia con backend
    plant_id?: string; // Cambio de 'plantId' a 'plant_id' para consistencia con backend
    diagnostic_images?: string[]; // URLs de imágenes ya subidas
}