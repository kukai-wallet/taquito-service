import express, { Express } from 'express';
import { handleMetadata } from './handlers/base';
import { ROUTES } from './routes';

const PORT = 8080

const app: Express = express()

app.get(ROUTES.BASE, handleMetadata)

app.listen(PORT, () => {
    console.log(`⚡server:: Server is running at ${PORT}`)
})