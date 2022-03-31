const SerieService = require('../services/serieService')
const SerieModel = require('../models/series')
const service = new SerieService()
const express = require('express')
const serieRoute = express.Router()

serieRoute.post('/serie', async (req, res, ) => {
  try {
    const serie = SerieModel(req.body)
    const data = await service.createSerie(serie)
    res.status(201).json({ data })
  } catch (error) {
    res.status(404).json({
      message: error,
    })
  }
})

serieRoute.get('/', async (req, res) => {
  try {
    const data = await service
    .listSerie()
    res.status(200).json({ data })
  } catch (error) {
    res.status(404).json({
      message: error,
    })
  }
})

serieRoute.get('/:serieId', async (req, res, next) => {
  try {
    const { serieId } = req.params
    const data = await service
    .showSerie(serieId)
    res.status(200).json({ data })
  } catch (error) {
    next(error)
  }
})

serieRoute.get('/actor/:nameActor', async (req, res, next) => {
  try {
    const { nameActor } = req.params
    const data = await service
    .showSeriesActor(nameActor)
    res.status(200).json({ data })
  } catch (error) {
    next(error)
  }
})

serieRoute.get('/search/:date', async (req, res, next) => {
  try {
    const { date } = req.params
    const data = await service
    .showSeriesDate(date)
    res.status(200).json({ data })
  } catch (error) {
    next(error)
  }
})

serieRoute.put('/:serieId', async (req, res, next) => {
  try {
    const { serieId } = req.params;
    const { serie, number_seasons, original_language, features_seasons, episodes } = req.body;
    const data = await service.editSerie(
      serieId,
      serie,
      number_seasons,
      original_language,
      features_seasons,
      episodes
    );
    res.status(200).json({ data });
  } catch (error) {
    next(error)
  }
});

serieRoute.delete('/:serieId', async (req, res, next) => {
  try {
    const { serieId } = req.params
    const data = await service
    .removeSerie(serieId)
    res.status(200).json({ data })
  } catch (error) {
    next(error)
  }
})

module.exports = serieRoute
