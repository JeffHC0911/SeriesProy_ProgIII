const serieSchema = require('../models/series')

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
    return serieSchema.findById({_id: serieId})
  }

  async showSeriesActor(nameActor){
    return serieSchema.find({'features_seasons.cast': nameActor})
  }

  async showSeriesDate(date){
    return serieSchema.find({'features_seasons.premier_date': date})
  }

  async editSerie(
    serieId,
    serie,
    number_seasons,
    original_language,
    features_seasons,
    episodes
  ) {
    return serieSchema.findById({ _id: serieId }).then(() => {
      if (!serieId) throw Error('Serie no encontrada');
      return serieSchema.updateOne(
        { _id: serieId },
        { serie, number_seasons, original_language, features_seasons, episodes }
      );
    });
  }

  async removeSerie(serieId){
    const serieRemove = serieSchema.findById({_id: serieId})
    return serieSchema.deleteOne(serieRemove)
  }
}

module.exports = SerieService
