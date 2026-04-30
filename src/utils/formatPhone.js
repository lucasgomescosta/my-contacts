export default function formatPhone(phone) {
  const onlyNumbers = phone.replace(/\D/g, "");

  // celular com 11 dígitos
  if (onlyNumbers.length <= 11) {
    return onlyNumbers
      .replace(/^(\d{2})(\d)/g, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1");
  }

  return onlyNumbers;
}
