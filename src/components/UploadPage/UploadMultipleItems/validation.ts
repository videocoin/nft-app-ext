import * as yup from 'yup';

const validationSchema = yup.object().shape({
  name: yup.string().required(),
  instantSalePrice: yup.string().optional(),
  putOnSalePrice: yup.string().optional(),
  previewItems: yup
    .array()
    .of(yup.object())
    .required()
    .min(1, 'Minimum of 1 item'),
  contentItems: yup
    .array()
    .of(yup.object())
    .required()
    .min(1, 'Minimum of 1 item'),
  locked: yup.boolean(),
  size: yup.string().optional(),
  royalties: yup.string().optional(),
  description: yup.string().optional(),
  tokenAddress: yup
    .string()
    .when('putOnSale', { is: true, then: yup.string().required() }),
});

export default validationSchema;
