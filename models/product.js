const { Schema, model } = require('mongoose');
const { products } = require('../constants');
const Joi = require('joi');

const { USER_TYPE, WATERMARK, AGE } = products;

const itemsWithTitleSchema = new Schema({
  title: String,
  items: [String],
});

// Вкладена схема для об'єкта з полем paragraph
const paragraphSchema = new Schema({
  paragraph: String,
});

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    description: {
      type: Array,
      required: false,
      default: [],
      // validate: [
      //   {
      //     validator: function (value) {
      //       const result = mainSchema.validate(value);
      //       return !result.error;
      //     },
      //     message: 'Invalid data for dynamicField',
      //     // validator: function (arr) {
      //     //   // Перевіряємо, чи масив містить лише об'єкти titleListSchema або paragraphSchema
      //     //   return arr.every((item) => {
      //     //     return (
      //     //       item instanceof itemsWithTitleSchema ||
      //     //       item instanceof paragraphSchema
      //     //     );
      //     //   });
      //     // },
      //     // message: (props) => `${props.value} не є вірним типом`,
      //   },
      // ],
    },
    recomendation: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'category',
      required: true,
    },
    maker: {
      type: Schema.Types.ObjectId,
      ref: 'maker',
      required: true,
    },
    userType: {
      type: [
        {
          type: String,
          enum: [USER_TYPE.ADULT, USER_TYPE.CHILD, USER_TYPE.ANIMAL],
        },
      ],
      default: [],
    },
    age: {
      type: [
        {
          type: String,
          enum: [AGE['0TO3'], AGE['4TO6'], AGE['6TO12']],
        },
      ],
      default: [],
    },
    variants: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'variant',
        },
      ],
      default: [],
      required: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports.Product = model('product', productSchema);

const p = {
  title: '+',
  subtitle: '+',
  description: [],
  recomendation: '+',
  category: {
    type: Schema.Types.ObjectId,
    ref: 'category',
    required: true,
  },
  maker: {
    type: Schema.Types.ObjectId,
    ref: 'maker',
    required: true,
  },
  userType: {
    type: [
      {
        type: String,
        enum: [USER_TYPE.ADULT, USER_TYPE.CHILD, USER_TYPE.ANIMAL],
      },
    ],
    default: [],
  },
  age: {
    type: [
      {
        type: String,
        enum: [AGE['0TO3'], AGE['4TO6'], AGE['6TO12']],
      },
    ],
    default: [],
  },
  watermark: {
    type: [
      {
        type: String,
        enum: [WATERMARK.WOW, WATERMARK.SALE],
      },
    ],
    default: [],
  },
  variants: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'variant',
      },
    ],
    default: [],
    required: false,
  },
};
