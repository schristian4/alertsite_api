const express = require('express')

// dotenv.config({ path: '../.env' })
require('dotenv').config()

const router = express.Router()

const monitorIDs = ['613072', '606458', '613080', '610382', '613088', '610378', '613070', '613076', '610380']

const plainText = `${process.env.ALERT_USERNAME}:${process.env.ALERT_PASSWORD}`
const BufferSession = Buffer.from(plainText).toString('base64')
const BufferText = `Basic ` + BufferSession

async function get_monitor_data(id: any, rdate: any) {
  const monitorURL = `${process.env.ALERT_ENDPOINT}?devices=${id}&rdate=${rdate}&api_version=2&format=json`
  const getMonitorData = await fetch(monitorURL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: BufferText,
    },
  })

  if (!getMonitorData.ok) {
    throw new Error('Get monitor data failed')
  }

  return await getMonitorData.json()
}

/* --------------------------------------------------------------------------------
  Express route to handle multiple monitor IDs
  
  Request requirements for this route:
  - rdate: string (format: LastOneHour, LastOneDay, LastOneWeek, LastOneMonth, LastOneYear)
-------------------------------------------------------------------------------- */

router.get('/', async (req: any, res: any) => {
  const { rdate } = req.query
  // console.log('rdate', rdate)
  try {
    const dateRange = rdate === undefined ? 'LastOneHour' : rdate
    const monitorDataPromises = monitorIDs.map((id) => get_monitor_data(id, dateRange))
    const monitorData = await Promise.all(monitorDataPromises)

    if (monitorData === undefined || monitorData.length === null) {
      throw new Error('Get monitor data failed')
    }
    res.json(monitorData.flat(1))
  } catch (error: any) {
    res.status(500).send(error.message)
  }
})
export default router
