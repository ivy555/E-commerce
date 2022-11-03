export const formItems = (itemName) => {
  return [
    {
      title: 'English',
      placeholder: `${itemName} in English`,
      key: 'en',
    },
    {
      title: 'Deutsche',
      placeholder: `${itemName} in Deutsche`,
      key: 'cn',
    },
    {
      title: 'French',
      placeholder: `${itemName} in French`,
      key: 'jpn',
    },
  ]
}

export const priceItems = (discount) => {
  return [
    {
      title: 'Euro €',
      placeholder: `${
        discount ? 'Discounted price' : 'Price'
      } in EURO`,
      key: 'hkd',
    },
    {
      title: 'Dollar $',
      placeholder: `${discount ? 'Discounted price' : 'Price'} in Dollar`,
      key: 'jpn',
    },
  ]
}

export const colorItems = () => {
  return [
    {
      placeholder: 'english',
      key: 'en',
    },
    {
      placeholder: 'Deutsche',
      key: 'cn',
    },
    {
      placeholder: 'French',
      key: 'jpn',
    },
  ]
}