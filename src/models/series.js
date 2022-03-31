const mongoose = require('mongoose')
const serieSchema = mongoose.Schema({
  serie: { type: String, require: true },
  number_seasons: { type: Number, require: true },
  original_language: { type: String, require: true },
  features_seasons: {
    type: Object,
    require: true,
    seasons_number: { type: Number, require: true },
    season_name: { type: String, require: true },
    premier_date: { type: Date },
    cast: { type: Array, require: true },
    episodes: {
      type: Object,
      require: true,
      episode_name: { type: String, require: true },
      time_duration: { type: Number, require: true }
    }
  }
})

module.exports = mongoose.model('SeriesDBCollection', serieSchema)
