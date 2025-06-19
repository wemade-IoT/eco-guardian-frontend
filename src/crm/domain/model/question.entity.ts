export interface Question {
    id: number;
    title: string;
    content: string; // Cambio de 'description' a 'content' para consistencia
    status: string; // Cambio de 'question_status' a 'status' con tipos específicos
    created_at: Date; // Agregado para tracking de fecha
    updated_at?: Date; // Agregado para tracking de actualizaciones
    user_id: number; // Cambio de 'userId' a 'user_id' para consistencia con backend
    plant_id?: number; // Cambio de 'plantId' a 'plant_id' para consistencia con backend
    image_urls?: string[]; // URLs de imágenes ya subidas
}