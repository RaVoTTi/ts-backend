import Subject from './subject.models'

export const validateSubject = async (name: string) => {
    const exist = await Subject.findOne({ name: name.toUpperCase() })

    if (exist) {
        throw new Error(`The Subject "${name}" is register`)
    }

}
