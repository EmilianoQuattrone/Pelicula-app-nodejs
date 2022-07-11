const { Schema, model } = require('mongoose');

const peliculaSchema = new Schema({

    nombre: {

        type: String,
    },

    idioma: {

        type: String
    },

    genero: {

        type: String
    },

    fechaEstreno: {

        type: Date
    },

    favorito: {

        type: Boolean
    },

    comentario: {

        type: String
    },

    usuario: {

        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
});

module.exports = model('Pelicula', peliculaSchema);