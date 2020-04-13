import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import express from 'express'

const router = express.Router();

const options = {
    // API 문서 설정
    swaggerDefinition: {
        info: {
            title : 'AI_Project',
            version: '1.0.0',
            description: 'Swagger for API Management'
        },
        host: 'localhost:8000',
        basePath: '/'
    },

    // Swagger API가 존재하는 곳
    apis: ['../controllers/*.js']
};

const specs = swaggerJsdoc(options);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

export default router;