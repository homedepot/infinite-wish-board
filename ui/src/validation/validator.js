import Schema from 'validate'

const getChildSchema = (isStrictValidation) => {
  return new Schema({
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      size: {
        min: 2,
        max: 17
      },
      required: true
    },
    hometown: {
      type: String,
      required: isStrictValidation
    },
    illness: {
      type: String,
      required: isStrictValidation
    }
  }, {strip: false})
}

const getWishDetailSchema = (isStrictValidation) => {
  const childSchema = getChildSchema(isStrictValidation)
  return new Schema({
    type: {
      type: String,
      enum: ['go', 'meet', 'be', 'have'],
      required: true
    },
    details: {
      type: String,
      required: isStrictValidation
    },
    sponsor: {
      links: {
        type: Array,
        length: {
          min: 1
        },
        each: {
          type: String
        },
        required: isStrictValidation
      }
    },
    child: childSchema
  }, {strip: false})
}

const validateWishDetail = (wishDetail, isStrictValidation) => {
  const wishDetailsSchema = getWishDetailSchema(isStrictValidation)
  return wishDetailsSchema.validate(wishDetail)
}

export {validateWishDetail};