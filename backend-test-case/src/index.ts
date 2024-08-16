import express, { Application } from 'express'
import router from './router'
import { setupSwagger } from './swagger';

const PORT = 8000

const app: Application = express()

app.use(express.json())
app.use('/api', router)

setupSwagger(app);

app.listen(PORT, () => {
    console.log(`[API] local:   http://localhost:${PORT}/api`);
})