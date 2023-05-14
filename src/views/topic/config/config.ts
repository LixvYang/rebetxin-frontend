import { ref } from "vue";

export const BtnAmountGroup = ref(
  [
    {
      amount: '100',
      isSelect: false,
    },
    {
      amount: '500',
      isSelect: false
    },
    {
      amount: '1000',
      isSelect: false
    },
    {
      amount: '5000',
      isSelect: false
    },
    {
      amount: '10000',
      isSelect: false
    },
    {
      amount: '100000',
      isSelect: false
    }
  ]
)

export const positiveNumber = (value: any) => {
  if (!value) {
    return 'Value is required';
  }
  const num = Number(value);
  if (isNaN(num) || num <= 0) {
    return 'Value must be a positive number';
  }
  if (num >= 100000000) {
    return 'Value must be less than 100000000';
  }
  return true;
};
