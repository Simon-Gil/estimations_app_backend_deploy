"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionSeeder = void 0;
const permission_entity_1 = require("../../modules/roles_and_permissions/permission/permission.entity");
const Permission_1 = require("../../modules/roles_and_permissions/permission/Permission");
// Seeder para Permisos
class PermissionSeeder {
    async run(dataSource, factoryManager) {
        const repository = dataSource.getRepository(permission_entity_1.PermissionEntity);
        // Si los permisos ya existen en la base de datos, no ejecuta la inserción
        const existingPermissions = await repository.find();
        if (existingPermissions.length > 0) {
            return;
        }
        // Subject User
        const manageUser = new Permission_1.Permission('MANAGE', 'user', 'manage', 'Acceso completo a la gestión de usuarios');
        const createUser = new Permission_1.Permission('CREATE', 'user', 'create', 'Creación de nuevos usuarios', manageUser);
        const updateUser = new Permission_1.Permission('UPDATE', 'user', 'update', 'Modificar datos de usuarios', manageUser);
        const deleteUser = new Permission_1.Permission('DELETS', 'user', 'delete', 'Eliminación de usuarios', manageUser);
        const readUser = new Permission_1.Permission('READ', 'user', 'read', 'Obtener datos de usuarios', manageUser);
        const readSelf = new Permission_1.Permission('READ_SELF', 'user', 'readSelf', 'Obtener datos de usuario autenticado', readUser);
        const updateSelf = new Permission_1.Permission('UPDATE_SELF', 'user', 'updateSelf', 'Modificar datos de usuario autenticado', updateUser);
        const blockUser = new Permission_1.Permission('BLOCK', 'user', 'block', 'Gestión de bloqueo y desbloqueo de usuarios.', manageUser);
        const manageRolesPermissions = new Permission_1.Permission('MANAGE', 'roles_and_permissions', 'manage', 'Gestión de roles y asignación de permisos');
        createUser.parentPermission = manageUser;
        updateUser.parentPermission = manageUser;
        deleteUser.parentPermission = manageUser;
        readUser.parentPermission = manageUser;
        readSelf.parentPermission = readUser;
        updateSelf.parentPermission = updateUser;
        manageUser.childPermissions = [createUser, updateUser, deleteUser, readUser, blockUser];
        readUser.childPermissions = [readSelf];
        updateUser.childPermissions = [updateSelf];
        await repository.save([
            manageUser, createUser, updateUser, deleteUser, readUser, readSelf, updateSelf, blockUser
        ]);
        // Subject Settings
        const manageSettings = new Permission_1.Permission('MANAGE', 'settings', 'manage', 'Acceso completo a la configuración de la aplicación');
        const readSettings = new Permission_1.Permission('READ', 'settings', 'read', 'Obtener los datos de configuración actual del sistema', manageSettings);
        const updateEmailConfig = new Permission_1.Permission('UPDATE_EMAIL_CONFIG', 'settings', 'updateEmailConfig', 'Actualización de la configuración de notificaciones por email', manageSettings);
        const updateSecurityConfig = new Permission_1.Permission('UPDATE_SECURITY_CONFIG', 'settings', 'updateSecurityConfig', 'Actualización de la configuración de seguridad de la aplicación', manageSettings);
        const updateProposalExpiration = new Permission_1.Permission('UPDATE_PROPOSAL_EXPIRATION', 'settings', 'updateProposalExpiration', 'Actualización de los días de validez de una propuesta tras ser finalizada', manageSettings);
        const updateDefaultPriceConfig = new Permission_1.Permission('UPDATE_DEFAULT_PRICE_CONFIG', 'settings', 'updateDefaultPriceConfig', 'Actualización de la configuración de precios por defecto', manageSettings);
        const createTypology = new Permission_1.Permission('CREATE_TYPOLOGY', 'settings', 'createTypology', 'Creación de nuevas tipologías', manageSettings);
        manageSettings.childPermissions = [
            updateEmailConfig, updateSecurityConfig, updateProposalExpiration, updateDefaultPriceConfig, readSettings, createTypology
        ];
        await repository.save([
            manageSettings, updateEmailConfig, updateSecurityConfig, updateProposalExpiration, updateDefaultPriceConfig, readSettings, createTypology
        ]);
        // Subject Account
        const manageAccount = new Permission_1.Permission('MANAGE', 'account', 'manage', 'Acceso completo a la gestión de cuentas');
        const createAccount = new Permission_1.Permission('CREATE', 'account', 'create', 'Creación de nuevas cuentas', manageAccount);
        const updateAccount = new Permission_1.Permission('UPDATE', 'account', 'update', 'Modificar datos de cuentas', manageAccount);
        const deleteAccount = new Permission_1.Permission('DELETE', 'account', 'delete', 'Eliminación de cuentas', manageAccount);
        const readAccount = new Permission_1.Permission('READ', 'account', 'read', 'Obtener datos de las cuentas', manageAccount);
        const readSelfAccount = new Permission_1.Permission('READ_SELF', 'account', 'readSelf', 'Obtener datos de cuentas relacionadas con el usuario', readAccount);
        const manageSpecialFieldsAccount = new Permission_1.Permission('MANAGE_SPECIAL_FIELDS', 'account', 'manageSpecialFields', 'Acceso a la gestión de campos especiales de cuentas', manageAccount);
        const assignCommercialManager = new Permission_1.Permission('ASSIGN_COMMERCIAL_MANAGER', 'account', 'assignCommercialManager', 'Asignación de responsable comercial de cuenta', manageSpecialFieldsAccount);
        const managePriceConfig = new Permission_1.Permission('MANAGE_PRICE_CONFIG', 'account', 'managePriceConfig', 'Gestión de configuraciones de precio', manageSpecialFieldsAccount);
        const readPriceConfig = new Permission_1.Permission('READ_PRICE_CONFIG', 'account', 'readPriceConfig', 'Obtener configuraciones de precios', managePriceConfig);
        const assignCustomPrices = new Permission_1.Permission('ASSIGN_CUSTOM_PRICES', 'account', 'assignCustomPrices', 'Creación y asignación de configuraciones de precio', managePriceConfig);
        const assignTechnicalManager = new Permission_1.Permission('ASSIGN_TECHNICAL_MANAGER', 'account', 'assignTechnicalManager', 'Asignación de responsable técnico de cuenta', manageSpecialFieldsAccount);
        manageAccount.childPermissions = [createAccount, updateAccount, deleteAccount, readAccount, manageSpecialFieldsAccount];
        manageSpecialFieldsAccount.childPermissions = [assignCommercialManager, managePriceConfig, assignTechnicalManager];
        managePriceConfig.childPermissions = [readPriceConfig, assignCustomPrices];
        readAccount.childPermissions = [readSelfAccount];
        await repository.save([
            manageAccount, createAccount, updateAccount, deleteAccount, readAccount, manageSpecialFieldsAccount,
            assignCustomPrices, assignCommercialManager, assignTechnicalManager, readPriceConfig, managePriceConfig, readSelfAccount
        ]);
        // Subject Roles&Permissions
        await repository.save([manageRolesPermissions]);
        console.log('Datos seed introducidos');
        // Subject Opportunities
        const manageOpportunities = new Permission_1.Permission('MANAGE', 'opportunity', 'manage', 'Acceso total a la gestión de oportunidades');
        const readOpportunities = new Permission_1.Permission('READ', 'opportunity', 'read', 'Obtener datos de oportunidades', manageOpportunities);
        const readSelfOpportunities = new Permission_1.Permission('READ_SELF', 'opportunity', 'readSelf', 'Obtener datos de oportunidades asociadas con el usuario', readOpportunities);
        const updateOpportunities = new Permission_1.Permission('UPDATE', 'opportunity', 'update', 'Actualizar datos de oportunidades', manageOpportunities);
        const createOpportunities = new Permission_1.Permission('CREATE', 'opportunity', 'create', 'Alta de nuevas oportunidades comerciales', manageOpportunities);
        const deleteOpportunities = new Permission_1.Permission('DELETE', 'opportunity', 'delete', 'Eliminación de oportunidades comerciales', manageOpportunities);
        const manageSpecialFieldsOpportunities = new Permission_1.Permission('MANAGE_SPECIAL_FIELDS', 'opportunity', 'manageSpecialFields', 'Acceso completo a la gestión de campos especiales de oportunidades', manageOpportunities);
        const manageDocumentsOpportunities = new Permission_1.Permission('MANAGE_DOCUMENTS', 'opportunity', 'manageDocument', 'Acceso completo a la gestión de documentos asociados a oportunidad', manageSpecialFieldsOpportunities);
        const uploadDocumentOpportunities = new Permission_1.Permission('UPLOAD_DOCUMENT', 'opportunity', 'uploadDocument', 'Habilita la subida de documentos asociados a oportunidad', manageDocumentsOpportunities);
        const downloadDocumentOpportunities = new Permission_1.Permission('DOWNLOAD_DOCUMENT', 'opportunity', 'downloadDocument', 'Habilita la descarga de documentos asociados a oportunidad', manageDocumentsOpportunities);
        const deleteDocumentOpportunities = new Permission_1.Permission('DELETE_DOCUMENT', 'opportunity', 'deleteDocument', 'Habilita la eliminación de documentos asociados a oportunidad', manageDocumentsOpportunities);
        const assignCommercialManagerOpportunities = new Permission_1.Permission('ASSIGN_COMMERCIAL_MANAGER', 'opportunity', 'assignCommercialManager', 'Asignación personalizada de responsable comercial a oportunidad', manageSpecialFieldsOpportunities);
        const assignTechnicalManagerOpportunities = new Permission_1.Permission('ASSIGN_TECHNICAL_MANAGER', 'opportunity', 'assignTechnicalManager', 'Asignación de responsable técnico a oportunidad', manageSpecialFieldsOpportunities);
        const updateStatusOpportunities = new Permission_1.Permission('UPDATE_STATUS', 'opportunity', 'updateStatus', 'Actualizar el estado de una oportunidad', manageSpecialFieldsOpportunities);
        manageOpportunities.childPermissions = [
            readOpportunities, updateOpportunities, createOpportunities, deleteOpportunities, manageSpecialFieldsOpportunities
        ];
        readOpportunities.childPermissions = [readSelfOpportunities];
        manageSpecialFieldsOpportunities.childPermissions = [
            assignCommercialManagerOpportunities, assignTechnicalManagerOpportunities, updateStatusOpportunities, manageDocumentsOpportunities
        ];
        manageDocumentsOpportunities.childPermissions = [
            uploadDocumentOpportunities, downloadDocumentOpportunities, deleteDocumentOpportunities
        ];
        await repository.save([manageOpportunities, readOpportunities, updateOpportunities, createOpportunities, deleteOpportunities,
            assignCommercialManagerOpportunities, assignTechnicalManagerOpportunities, manageSpecialFieldsOpportunities, readSelfOpportunities, updateStatusOpportunities,
            manageDocumentsOpportunities, uploadDocumentOpportunities, downloadDocumentOpportunities, deleteDocumentOpportunities]);
        console.log('Datos seed introducidos');
        // Subject Proposals
        const manageProposals = new Permission_1.Permission('MANAGE', 'proposal', 'manage', 'Acceso completo a la gestión de propuestas');
        const readProposals = new Permission_1.Permission('READ', 'proposal', 'read', 'Obtener datos de propuestas', manageProposals);
        const readSelfProposals = new Permission_1.Permission('READ_SELF', 'proposal', 'readSelf', 'Obtener datos de propuestas en caso de estar relacionadas con el usuario', readProposals);
        const createProposals = new Permission_1.Permission('CREATE', 'proposal', 'create', 'Creación de nuevas propuestas comerciales', manageProposals);
        const updateProposals = new Permission_1.Permission('UPDATE', 'proposal', 'update', 'Actualización de propuestas', manageProposals);
        const deleteProposals = new Permission_1.Permission('DELETE', 'proposal', 'delete', 'Eliminación de propuestas comerciales', manageProposals);
        const manageSpecialFieldsProposals = new Permission_1.Permission('MANAGE_SPECIAL_FIELDS', 'proposal', 'manageSpecialFields', 'Acceso total a datos sensibles de propuestas', manageProposals);
        const readSpecialFieldsProposals = new Permission_1.Permission('READ_SPECIAL_FIELDS', 'proposal', 'readSpecialFields', 'Lectura de datos sensibles de propuesta, como monto total o meses estimados', manageSpecialFieldsProposals);
        const updateSpecialFieldsProposals = new Permission_1.Permission('UPDATE_SPECIAL_FIELDS', 'proposal', 'updateSpecialFields', 'Actualización de datos sensibles de propuesta, como monto total o meses estimados', manageSpecialFieldsProposals);
        manageProposals.childPermissions = [
            readProposals, createProposals, updateProposals, deleteProposals, manageSpecialFieldsProposals
        ];
        manageSpecialFieldsProposals.childPermissions = [
            readSpecialFieldsProposals, updateSpecialFieldsProposals
        ];
        readProposals.childPermissions = [readSelfProposals];
        await repository.save([
            manageProposals, readProposals, readSelfProposals, createProposals, updateProposals, deleteProposals, manageSpecialFieldsProposals, readSpecialFieldsProposals, updateSpecialFieldsProposals
        ]);
        console.log('Permisos para Proposal introducidos');
        // Subject Estimations
        const manageEstimations = new Permission_1.Permission('MANAGE', 'estimation', 'manage', 'Acceso completo a la gestión de estimaciones');
        const readEstimations = new Permission_1.Permission('READ', 'estimation', 'read', 'Obtener datos de estimaciones', manageEstimations);
        const readSelfEstimations = new Permission_1.Permission('READ_SELF', 'estimation', 'readSelf', 'Obtener datos de estimaciones en las que el usuario está involucrado', readEstimations);
        const deleteEstimations = new Permission_1.Permission('DELETE', 'estimation', 'delete', 'Eliminación de estimaciones', manageEstimations);
        const updateStatusEstimations = new Permission_1.Permission('UPDATE_STATUS', 'estimation', 'updateStatus', 'Actualizar el estado de la estimación', manageEstimations);
        const assignUsersEstimations = new Permission_1.Permission('ASSIGN_USERS', 'estimation', 'assignUsers', 'Asignación de usuarios a estimación', manageEstimations);
        manageEstimations.childPermissions = [
            readEstimations, deleteEstimations, updateStatusEstimations, assignUsersEstimations
        ];
        readEstimations.childPermissions = [
            readSelfEstimations
        ];
        await repository.save([manageEstimations, readEstimations, readSelfEstimations, deleteEstimations, updateStatusEstimations, assignUsersEstimations]);
        console.log('Datos seed introducidos');
        // Subject Tasks (Sin permisos de lectura, si puedes acceder a estimación puedes acceder a sus tareas)
        const manageTasks = new Permission_1.Permission('MANAGE', 'task', 'manage', 'Acceso total a la gestión de tareas');
        const createTasks = new Permission_1.Permission('CREATE', 'task', 'create', 'Alta de tareas', manageTasks);
        const deleteTasks = new Permission_1.Permission('DELETE', 'task', 'delete', 'Eliminación de tareas y perfiles estimables asociados', manageTasks);
        const updateTasks = new Permission_1.Permission('UPDATE', 'task', 'update', 'Actualización de tareas', manageTasks);
        const updateTasksProfiles = new Permission_1.Permission('UPDATE_TASKS_PROFILES', 'task', 'updateTasksProfiles', 'Actualización de estimaciones por perfil de una tarea (asignación de horas)', updateTasks);
        const updateTasksStatus = new Permission_1.Permission('UPDATE_STATUS', 'task', 'updateStatus', 'Actualizar estado de una tarea', updateTasks);
        const createTasksProfiles = new Permission_1.Permission('CREATE_TASKS_PROFILES', 'task', 'createTasksProfiles', 'Alta de perfiles estimables para una tarea', updateTasks);
        const deleteTasksProfiles = new Permission_1.Permission('DELETE_TASKS_PROFILES', 'task', 'deleteTasksProfiles', 'Eliminación de perfiles estimables para una tarea', updateTasks);
        manageTasks.childPermissions = [
            createTasks, deleteTasks, updateTasks
        ];
        updateTasks.childPermissions = [
            updateTasksProfiles, createTasksProfiles, deleteTasksProfiles, updateTasksStatus
        ];
        await repository.save([manageTasks, createTasks, deleteTasks, updateTasks, updateTasksProfiles, createTasksProfiles, deleteTasksProfiles, updateTasksStatus]);
        console.log('Datos seed de Permisos introducidos');
    }
}
exports.PermissionSeeder = PermissionSeeder;
