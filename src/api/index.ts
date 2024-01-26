import express from 'express'
import ioAlert from './ioAlert'

const router = express.Router()

router.use('/io_alert', ioAlert)

export default router
