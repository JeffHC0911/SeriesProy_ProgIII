const serieSchema = require('../models/series')
const Boom = require('@hapi/boom')

class SerieService{
  async createSerie(serie){
    serie.save()
    return serie
  }

  async listSerie(){
    return new Promise((resolve, reject) =>{
      setTimeout(() => resolve(serieSchema.find()), 3000)
    })
  }

  async showSerie (serieId){
    return serieSchema.findById({_id: serieId}).then(
      (serieFind) =>{
        if(!serieFind) throw Boom.notFound('No se encontró la serie')
        return serieFind
      }
    )
  }

  async showSeriesActor(nameActor){
    return serieSchema.find({'features_seasons.cast': nameActor}).then(
      (serieActorFind) =>{
        if(!serieActorFind) throw Boom.notFound('No se encontró el actor')
        return serieActorFind
      }
    )
  }

  async showSeriesDate(date){
    return serieSchema.find({'features_seasons.premier_date': date}).then(
      (serieDateFind) =>{
        if(!serieDateFind) throw Boom.notFound('No se encontraron series con esa fecha')
        return serieDateFind
      }
    )
  }

  async editSerie(
    serieId,
    serie,
    number_seasons,
    original_language,
    features_seasons,
    episodes
  ) {
    return serieSchema.findById({ _id: serieId }).then(
      (serieFind) => {
      if (!serieFind) throw Boom.notFound('No se encontró la serie')
      return serieSchema.updateOne(
        { _id: serieId },
        { serie, number_seasons, original_language, features_seasons, episodes }
      );
    });
  }

  async removeSerie(serieId){
    return serieSchema.findById({_id: serieId}).then(
      (serieFind) =>{
        if(!serieFind) throw Boom.notFound('No se encontró la serie')
        return serieSchema.deleteOne(serieFind)
      }
    )
  }
}

module.exports = SerieService
