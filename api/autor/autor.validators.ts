import Autor from './autor.models'

export const validateAutor = async (name: string) => {
    const exist = await Autor.findOne({ name: name.toUpperCase() })

    if (exist) {
        throw new Error(`El Autor ${name} esta registrado`)
    }
}
