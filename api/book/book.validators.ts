import {Book} from './book.models'

export const validateBook = async (name: string) => {
    const exist = await Book.findOne({ name: name.toUpperCase() })

    if (exist) {
        throw new Error(`The Book ${name} is register`)
    }
}

export const validateBookIdName = async (id: string, name: string ) => {
    const exist = await Book.findById(id);
    if (!exist) {
      throw new Error(`The id doesn't exist or the name is in use`);
    }
  };