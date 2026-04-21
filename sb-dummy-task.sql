-- Insertar 40 tareas de ejemplo
INSERT INTO tasks (title, description, status, priority, user_id) VALUES
-- Tareas pendientes (todo)
('Planificar reunión semanal', 'Preparar agenda y objetivos para la reunión del equipo', 'todo', 'high', '53dd75c5-23c2-4cd4-8318-0191a739d9ff'),
('Actualizar documentación', 'Revisar y actualizar la documentación del proyecto', 'todo', 'medium', '53dd75c5-23c2-4cd4-8318-0191a739d9ff'),
('Investigar nuevas tecnologías', 'Buscar herramientas para mejorar el workflow', 'todo', 'low', '53dd75c5-23c2-4cd4-8318-0191a739d9ff'),
('Revisar pull requests', 'Evaluar los PRs pendientes en GitHub', 'todo', 'high', '53dd75c5-23c2-4cd4-8318-0191a739d9ff'),
('Crear presentación', 'Diseñar slides para la presentación del cliente', 'todo', 'medium', '53dd75c5-23c2-4cd4-8318-0191a739d9ff'),
('Organizar archivos', 'Clasificar y organizar documentos del proyecto', 'todo', 'low', '53dd75c5-23c2-4cd4-8318-0191a739d9ff'),
('Configurar entorno', 'Preparar entorno de desarrollo para nuevo feature', 'todo', 'high', '53dd75c5-23c2-4cd4-8318-0191a739d9ff'),
('Revisar bugs', 'Identificar bugs reportados en producción', 'todo', 'high', '53dd75c5-23c2-4cd4-8318-0191a739d9ff'),
('Escribir tests', 'Crear tests unitarios para módulo nuevo', 'todo', 'medium', '53dd75c5-23c2-4cd4-8318-0191a739d9ff'),
('Planificar sprint', 'Definir tareas y objetivos para el próximo sprint', 'todo', 'high', '53dd75c5-23c2-4cd4-8318-0191a739d9ff'),

-- Tareas en progreso (in-progress)
('Desarrollar feature de autenticación', 'Implementar sistema de login con JWT', 'in-progress', 'high', '53dd75c5-23c2-4cd4-8318-0191a739d9ff'),
('Diseñar interfaz dashboard', 'Crear wireframes y mockups del panel', 'in-progress', 'high', '53dd75c5-23c2-4cd4-8318-0191a739d9ff'),
('Optimizar consultas SQL', 'Mejorar rendimiento de consultas a la base de datos', 'in-progress', 'medium', '53dd75c5-23c2-4cd4-8318-0191a739d9ff'),
('Integrar API de terceros', 'Conectar con servicio de pagos externo', 'in-progress', 'high', '53dd75c5-23c2-4cd4-8318-0191a739d9ff'),
('Refactorizar código legacy', 'Mejorar estructura de módulo antiguo', 'in-progress', 'medium', '53dd75c5-23c2-4cd4-8318-0191a739d9ff'),
('Crear sistema de notificaciones', 'Implementar envío de emails y push notifications', 'in-progress', 'high', '53dd75c5-23c2-4cd4-8318-0191a739d9ff'),
('Configurar CI/CD', 'Automatizar despliegues con GitHub Actions', 'in-progress', 'medium', '53dd75c5-23c2-4cd4-8318-0191a739d9ff'),
('Desarrollar módulo de reportes', 'Crear generador de reportes en PDF', 'in-progress', 'high', '53dd75c5-23c2-4cd4-8318-0191a739d9ff'),
('Implementar buscador', 'Crear sistema de búsqueda con filtros', 'in-progress', 'medium', '53dd75c5-23c2-4cd4-8318-0191a739d9ff'),
('Crear API endpoints', 'Desarrollar endpoints REST para nuevo módulo', 'in-progress', 'high', '53dd75c5-23c2-4cd4-8318-0191a739d9ff'),

-- Tareas en revisión (review)
('Revisar implementación de cache', 'Evaluar sistema de cache implementado', 'review', 'high', '53dd75c5-23c2-4cd4-8318-0191a739d9ff'),
('Verificar seguridad endpoints', 'Auditar vulnerabilidades en API', 'review', 'high', '53dd75c5-23c2-4cd4-8318-0191a739d9ff'),
('Testear responsive design', 'Comprobar adaptabilidad en diferentes dispositivos', 'review', 'medium', '53dd75c5-23c2-4cd4-8318-0191a739d9ff'),
('Revisar documentación técnica', 'Validar precisión de documentación escrita', 'review', 'low', '53dd75c5-23c2-4cd4-8318-0191a739d9ff'),
('Auditar accesibilidad', 'Verificar cumplimiento de estándares WCAG', 'review', 'medium', '53dd75c5-23c2-4cd4-8318-0191a739d9ff'),
('Evaluar performance', 'Analizar métricas de rendimiento', 'review', 'high', '53dd75c5-23c2-4cd4-8318-0191a739d9ff'),
('Revisar código de feature', 'Code review de implementación reciente', 'review', 'high', '53dd75c5-23c2-4cd4-8318-0191a739d9ff'),
('Validar integración continua', 'Verificar que CI/CD funciona correctamente', 'review', 'medium', '53dd75c5-23c2-4cd4-8318-0191a739d9ff'),
('Comprobar backups', 'Verificar sistema de backup y recuperación', 'review', 'high', '53dd75c5-23c2-4cd4-8318-0191a739d9ff'),
('Revisar UX/UI', 'Evaluar experiencia de usuario final', 'review', 'medium', '53dd75c5-23c2-4cd4-8318-0191a739d9ff'),

-- Tareas completadas (done)
('Actualizar dependencias', 'Actualizar librerías a sus últimas versiones', 'done', 'medium', '53dd75c5-23c2-4cd4-8318-0191a739d9ff'),
('Configurar base de datos', 'Instalar y configurar PostgreSQL', 'done', 'high', '53dd75c5-23c2-4cd4-8318-0191a739d9ff'),
('Crear logo', 'Diseñar identidad visual para el proyecto', 'done', 'low', '53dd75c5-23c2-4cd4-8318-0191a739d9ff'),
('Configurar dominio', 'Registrar y configurar dominio del sitio', 'done', 'medium', '53dd75c5-23c2-4cd4-8318-0191a739d9ff'),
('Implementar analytics', 'Integrar Google Analytics al sitio web', 'done', 'low', '53dd75c5-23c2-4cd4-8318-0191a739d9ff'),
('Configurar SSL', 'Instalar certificado SSL para HTTPS', 'done', 'high', '53dd75c5-23c2-4cd4-8318-0191a739d9ff'),
('Crear página de contacto', 'Desarrollar formulario de contacto funcional', 'done', 'medium', '53dd75c5-23c2-4cd4-8318-0191a739d9ff'),
('Configurar monitorización', 'Implementar sistema de alertas y logs', 'done', 'high', '53dd75c5-23c2-4cd4-8318-0191a739d9ff'),
('Optimizar imágenes', 'Comprimir y optimizar recursos gráficos', 'done', 'low', '53dd75c5-23c2-4cd4-8318-0191a739d9ff'),
('Configurar correos', 'Establecer servicio de envío de emails', 'done', 'medium', '53dd75c5-23c2-4cd4-8318-0191a739d9ff');