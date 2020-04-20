import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import express from 'express'

const router = express.Router();

const options = {
    // API 문서 설정
    swaggerDefinition: {
        info: { // API informations (required)
            title: 'AI_Project', // Title (required)
            version: '1.0.0', // Version (required)
            description: 'Swagger for API Management' // Description (optional)
        },
        host: 'localhost:8000', // Host (optional)
        basePath: '/', // Base path (optional)

        // securityDefinitions: {
        //     jwt: {
        //         type: 'apiKey',
        //         name: 'Authorization',
        //         in: 'header'
        //     }
        // },
        // security: [
        //     { jwt: [] }
        // ]
    },

    // Swagger API가 존재하는 곳, 파일에 들어간 주석을 분석한다.
    apis: ['./routers/*.yaml', './swagger/*.yaml']
};

const swaggerSpec = swaggerJsdoc(options);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;