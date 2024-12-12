"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockSeeder = void 0;
const User_1 = require("../../modules/user/User");
const department_service_1 = require("../../modules/company-structure/department/department.service");
const grade_service_1 = require("../../modules/company-structure/grade/grade.service");
const grade_entity_1 = require("../../modules/company-structure/grade/grade.entity");
const role_service_1 = require("../../modules/roles_and_permissions/role/role.service");
const role_entity_1 = require("../../modules/roles_and_permissions/role/role.entity");
const user_repository_1 = require("../../modules/user/user.repository");
const Account_1 = require("../../modules/accounts/Account");
const price_config_service_1 = require("./../../modules/accounts/price-config/price-config.service");
const account_repository_1 = require("./../../modules/accounts/account.repository");
const Typology_1 = require("../../modules/company-structure/typology/Typology");
const typology_repository_1 = require("../../modules/company-structure/typology/typology.repository");
const Opportunity_1 = require("../../modules/opportunity/Opportunity");
const opportunity_repository_1 = require("../../modules/opportunity/opportunity.repository");
const bcrypt_1 = __importDefault(require("bcrypt"));
const department_entity_1 = require("../../modules/company-structure/department/department.entity");
const proposal_service_1 = require("../../modules/proposal/proposal.service");
const proposal_repository_1 = require("../../modules/proposal/proposal.repository");
// Obtener departamentos
function depByName(departments, name) {
    const dep = departments.find(department => department.name === name);
    // Crea una copia si existe, sin modificar el objeto original
    if (dep) {
        const depCopy = { ...dep, id: dep.id };
        return depCopy;
    }
    else {
        return new department_entity_1.DepartmentEntity();
    }
}
// Obtener niveles
function gradeByName(grades, name) {
    const grade = grades.find(grade => grade.name === name);
    if (grade) {
        const gradeCopy = { ...grade, id: grade.id };
        return gradeCopy;
    }
    else {
        return new grade_entity_1.GradeEntity();
    }
}
// Encontrar roles
function roleByName(roles, name) {
    const role = roles.find(role => role.name === name);
    if (role) {
        const roleCopy = { ...role, id: role.id };
        return roleCopy;
    }
    else {
        return new role_entity_1.RoleEntity();
    }
}
class MockSeeder {
    async run(dataSource, factoryManager) {
        const departments = await department_service_1.departmentService.getAllDepartments();
        const grades = await grade_service_1.gradeService.getAllGrades();
        const roles = await role_service_1.roleService.getAllRoles();
        // USER
        const user1 = new User_1.User('Pablo', 'González', depByName(departments, 'Software'), gradeByName(grades, 'Director'), [roleByName(roles, 'Director de Software')], 'pgonzalez@example.com', await bcrypt_1.default.hash('12345678a', 10));
        const user2 = new User_1.User('Laura', 'Martínez', depByName(departments, 'Software'), gradeByName(grades, 'Coordinador'), [roleByName(roles, 'Coordinador de Software')], 'lmartinez@example.com', await bcrypt_1.default.hash('12345678a', 10));
        const user3 = new User_1.User('Carlos', 'López', depByName(departments, 'Software'), gradeByName(grades, 'Coordinador'), [roleByName(roles, 'Coordinador de Software')], 'clopez@example.com', await bcrypt_1.default.hash('12345678a', 10));
        const user4 = new User_1.User('Ana', 'Ramírez', depByName(departments, 'Software'), gradeByName(grades, 'Técnico'), [roleByName(roles, 'Técnico de Software')], 'aramirez@example.com', await bcrypt_1.default.hash('12345678a', 10));
        const user5 = new User_1.User('Miguel', 'Hernández', depByName(departments, 'Software'), gradeByName(grades, 'Técnico'), [roleByName(roles, 'Técnico de Software')], 'mhernandez@example.com', await bcrypt_1.default.hash('12345678a', 10));
        const user6 = new User_1.User('Sofía', 'Torres', depByName(departments, 'Software'), gradeByName(grades, 'Técnico'), [roleByName(roles, 'Técnico de Software')], 'storres@example.com', await bcrypt_1.default.hash('12345678a', 10));
        const user7 = new User_1.User('Andrés', 'Díaz', depByName(departments, 'Software'), gradeByName(grades, 'Técnico'), [roleByName(roles, 'Técnico de Software')], 'adiaz@example.com', await bcrypt_1.default.hash('12345678a', 10));
        const user8 = new User_1.User('Lucía', 'García', depByName(departments, 'Software'), gradeByName(grades, 'Técnico'), [roleByName(roles, 'Técnico de Software')], 'lgarcia@example.com', await bcrypt_1.default.hash('12345678a', 10));
        const user9 = new User_1.User('Jorge', 'Pérez', depByName(departments, 'Comercial'), gradeByName(grades, 'Director'), [roleByName(roles, 'Director Comercial')], 'jperez@example.com', await bcrypt_1.default.hash('12345678a', 10));
        const user10 = new User_1.User('María', 'Fernández', depByName(departments, 'Comercial'), gradeByName(grades, 'Coordinador'), [roleByName(roles, 'Coordinador Comercial')], 'mfernandez@example.com', await bcrypt_1.default.hash('12345678a', 10));
        const user11 = new User_1.User('Alberto', 'Ruiz', depByName(departments, 'Comercial'), gradeByName(grades, 'Coordinador'), [roleByName(roles, 'Coordinador Comercial')], 'aruiz@example.com', await bcrypt_1.default.hash('12345678a', 10));
        const user12 = new User_1.User('Elena', 'Morales', depByName(departments, 'Comercial'), gradeByName(grades, 'Técnico'), [roleByName(roles, 'Técnico Comercial')], 'emorales@example.com', await bcrypt_1.default.hash('12345678a', 10));
        const user13 = new User_1.User('David', 'Vega', depByName(departments, 'Comercial'), gradeByName(grades, 'Técnico'), [roleByName(roles, 'Técnico Comercial')], 'dvega@example.com', await bcrypt_1.default.hash('12345678a', 10));
        const user14 = new User_1.User('Patricia', 'Santos', depByName(departments, 'Comercial'), gradeByName(grades, 'Técnico'), [roleByName(roles, 'Técnico Comercial')], 'psantos@example.com', await bcrypt_1.default.hash('12345678a', 10));
        const user15 = new User_1.User('Raúl', 'Castillo', depByName(departments, 'Comercial'), gradeByName(grades, 'Técnico'), [roleByName(roles, 'Técnico Comercial')], 'rcastillo@example.com', await bcrypt_1.default.hash('12345678a', 10));
        const user16 = new User_1.User('Marta', 'Vázquez', depByName(departments, 'Comercial'), gradeByName(grades, 'Técnico'), [roleByName(roles, 'Técnico Comercial')], 'mortega@example.com', await bcrypt_1.default.hash('12345678a', 10));
        const user17 = new User_1.User('Sergio', 'Giménez', depByName(departments, 'Marketing'), gradeByName(grades, 'Director'), [roleByName(roles, 'Director de Marketing')], 'sgimenez@example.com', await bcrypt_1.default.hash('12345678a', 10));
        const user18 = new User_1.User('Cristina', 'Sánchez', depByName(departments, 'Marketing'), gradeByName(grades, 'Coordinador'), [roleByName(roles, 'Coordinador de Marketing')], 'csanchez@example.com', await bcrypt_1.default.hash('12345678a', 10));
        const user19 = new User_1.User('Manuel', 'Núñez', depByName(departments, 'Marketing'), gradeByName(grades, 'Coordinador'), [roleByName(roles, 'Coordinador de Marketing')], 'mnunez@example.com', await bcrypt_1.default.hash('12345678a', 10));
        const user20 = new User_1.User('Paula', 'Cruz', depByName(departments, 'Marketing'), gradeByName(grades, 'Técnico'), [roleByName(roles, 'Técnico de Marketing')], 'pcruz@example.com', await bcrypt_1.default.hash('12345678a', 10));
        const user21 = new User_1.User('Francisco', 'Reyes', depByName(departments, 'Marketing'), gradeByName(grades, 'Técnico'), [roleByName(roles, 'Técnico de Marketing')], 'freyes@example.com', await bcrypt_1.default.hash('12345678a', 10));
        const user22 = new User_1.User('Clara', 'Ibáñez', depByName(departments, 'Marketing'), gradeByName(grades, 'Técnico'), [roleByName(roles, 'Técnico de Marketing')], 'cibanez@example.com', await bcrypt_1.default.hash('12345678a', 10));
        const user23 = new User_1.User('Juan', 'Campos', depByName(departments, 'Marketing'), gradeByName(grades, 'Técnico'), [roleByName(roles, 'Técnico de Marketing')], 'jcampos@example.com', await bcrypt_1.default.hash('12345678a', 10));
        const user24 = new User_1.User('Alejandra', 'Romero', depByName(departments, 'Marketing'), gradeByName(grades, 'Técnico'), [roleByName(roles, 'Técnico de Marketing')], 'aromero@example.com', await bcrypt_1.default.hash('12345678a', 10));
        const existingUsers = await user_repository_1.userRepo.find();
        // Si no existen usuarios los insertamos
        let users = [];
        if (existingUsers.length <= 1) {
            users = await user_repository_1.userRepo.save([
                user1, user2, user3, user4, user5, user6, user7, user8,
                user9, user10, user11, user12, user13, user14, user15, user16,
                user17, user18, user19, user20, user21, user22, user23, user24
            ]);
            console.log('Datos Mock de Usuarios introducidos');
        }
        // ACCOUNT
        const defPriceConfig = await price_config_service_1.priceConfigService.getDefaultPriceConfig();
        const account1 = new Account_1.Account('Alimentación Robledo', 'arobledo@example.com', true, users[3], users[10], defPriceConfig);
        const account2 = new Account_1.Account('Innova Tech', 'innovatech@example.com', true, users[0], users[8], defPriceConfig);
        const account3 = new Account_1.Account('Servicios Alimentarios S.A.', 'serviciosalimentarios@example.com', true, users[5], users[9], defPriceConfig);
        const account4 = new Account_1.Account('Construcciones Álvarez', 'construccionesalvarez@example.com', false, users[4], users[11], defPriceConfig);
        const account5 = new Account_1.Account('Comercial García', 'comercialgarcia@example.com', false, users[2], users[12], defPriceConfig);
        const account6 = new Account_1.Account('Grupo Alimentario Fresco', 'grupoalimentariofresco@example.com', false, users[1], users[13], defPriceConfig);
        const account7 = new Account_1.Account('Oficina Central S.A.', 'oficinacentral@example.com', false, users[6], users[14], defPriceConfig);
        const account8 = new Account_1.Account('Ropa y Estilo', 'ropayestilo@example.com', false, users[7], users[15], defPriceConfig);
        const account9 = new Account_1.Account('Consultora Empresarial Global', 'consultoraempresarial@example.com', false, users[3], users[16], defPriceConfig);
        const account10 = new Account_1.Account('Salud y Bienestar S.L.', 'saludybienestar@example.com', false, users[0], users[17], defPriceConfig);
        // Si no existen cuentas guardadas, insertamos
        const existingAccounts = await account_repository_1.accountRepo.find();
        if (existingAccounts.length === 0) {
            await account_repository_1.accountRepo.save([
                account1, account2, account3, account4, account5, account6, account7, account8, account9, account10
            ]);
            console.log('Datos Mock de Cuentas introducidos');
        }
        // Typologies
        const typo1 = new Typology_1.Typology("Tienda Online");
        const typo2 = new Typology_1.Typology("Red social");
        const typo3 = new Typology_1.Typology("Software Empresarial");
        const typo4 = new Typology_1.Typology("Plataforma educativa");
        // Si no hay tipologias guardadas, inserta las tipologías de ejemplo
        const existingTypologies = await typology_repository_1.typologyRepo.find();
        if (existingTypologies.length === 0) {
            await typology_repository_1.typologyRepo.save([
                typo1, typo2, typo3, typo4
            ]);
            console.log('Datos Mock de Tipologías introducidos');
        }
        // Opportunities
        // Oportunidades para 'Alimentación Robledo'
        let opportunity1 = new Opportunity_1.Opportunity(account1, 'App Móvil de Recetas', ['Integración con redes sociales', 'Notificaciones push'], typo2, user10, user4);
        const opportunity2 = new Opportunity_1.Opportunity(account1, 'Sistema de Gestión de Pedidos', ['Interfaz de usuario amigable', 'Integración de pagos'], typo3, user10, user4);
        // Oportunidades para 'Innova Tech'
        let opportunity3 = new Opportunity_1.Opportunity(account2, 'Desarrollo de Plataforma de E-learning', ['Módulos de cursos', 'Sistema de gestión de usuarios'], typo4, user9, user1);
        const opportunity4 = new Opportunity_1.Opportunity(account2, 'Sistema de Gestión de Clientes (CRM)', ['Automatización de ventas', 'Análisis de datos'], typo3, user9, user1);
        // Oportunidades para 'Servicios Alimentarios S.A.'
        let opportunity5 = new Opportunity_1.Opportunity(account3, 'Plataforma de Venta de Alimentos', ['Catálogo de productos', 'Opciones de entrega'], typo1, user11, user6);
        const opportunity6 = new Opportunity_1.Opportunity(account3, 'Sistema de Gestión de Inventarios', ['Control de stock', 'Reportes de ventas'], typo3, user11, user6);
        // Si no existen oportunidades, insertamos datos de ejemplo
        const existingOpportunities = await opportunity_repository_1.opportunityRepo.find();
        if (existingOpportunities.length === 0) {
            await opportunity_repository_1.opportunityRepo.save([
                opportunity1, opportunity2, opportunity3,
                opportunity4, opportunity5, opportunity6
            ]);
            console.log('Datos Mock de Oportunidades introducidos');
        }
        // Propuestas y estimaciones
        const existingProposals = await proposal_repository_1.proposalRepo.find();
        if (existingProposals.length === 0) {
            // Propuesta para app de recetas
            const appRecetas = await opportunity_repository_1.opportunityRepo.findOne({ where: { name: 'App Móvil de Recetas' } });
            if (appRecetas) {
                await proposal_service_1.proposalService.createProposal(appRecetas.id, 'El desarrollo de una App Móvil de Recetas busca facilitar el acceso a una amplia variedad de recetas de cocina para usuarios de todos los niveles. ' +
                    'Esta plataforma permitirá a los usuarios guardar sus recetas favoritas, explorar contenido por categorías, y recibir recomendaciones personalizadas basadas en sus intereses culinarios. ' +
                    'Además, se integrará con redes sociales para compartir contenido de forma sencilla, fomentando una comunidad activa de usuarios. El objetivo principal es digitalizar el acceso a recursos culinarios, reduciendo las barreras para aprender y experimentar en la cocina.', 'La aplicación será desarrollada con React Native para compatibilidad multiplataforma y una API en Node.js para garantizar rapidez y escalabilidad.');
            }
            // Propuesta para Plataforma de E-Learning
            const eLearning = await opportunity_repository_1.opportunityRepo.findOne({ where: { name: 'Desarrollo de Plataforma de E-learning' } });
            if (eLearning) {
                await proposal_service_1.proposalService.createProposal(eLearning.id, 'La Plataforma de E-Learning tiene como objetivo ofrecer una experiencia educativa digital accesible y personalizada. ' +
                    'Permitirá a los usuarios acceder a cursos de diversas áreas, interactuar con materiales multimedia, y participar en evaluaciones interactivas. ' +
                    'El contexto del proyecto incluye un análisis profundo de necesidades educativas actuales, enfocándose en la educación a distancia como medio clave para democratizar el aprendizaje. ' +
                    'Con funcionalidades avanzadas como análisis de progreso, tutorías virtuales, y aprendizaje colaborativo, esta plataforma ayudará a instituciones y estudiantes a optimizar el proceso de enseñanza-aprendizaje.', 'Se usará una arquitectura basada en microservicios con front-end en Angular y back-end en Python (Django) para garantizar modularidad y eficiencia.');
            }
            // Propuesta para App de venta de alimentos
            const ventaAlimentos = await opportunity_repository_1.opportunityRepo.findOne({ where: { name: 'Plataforma de Venta de Alimentos' } });
            if (ventaAlimentos) {
                await proposal_service_1.proposalService.createProposal(ventaAlimentos.id, 'La Plataforma de Venta de Alimentos busca conectar a productores locales con consumidores finales a través de un mercado digital. ' +
                    'Los usuarios podrán explorar una amplia gama de productos frescos, realizar pedidos en línea, y recibirlos directamente en sus hogares. ' +
                    'El contexto incluye la necesidad de apoyar la economía local mientras se mejora la conveniencia del usuario final. ' +
                    'Los objetivos principales incluyen fomentar el comercio justo, reducir desperdicios, y mejorar la experiencia de compra de alimentos frescos, ofreciendo una alternativa más saludable y sostenible.', 'Se desarrollará con Flutter para un diseño móvil intuitivo y una API en Ruby on Rails para gestionar las transacciones de manera segura.');
            }
            console.log('Datos Mock de Propuestas introducidos');
        }
    }
}
exports.MockSeeder = MockSeeder;
