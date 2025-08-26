const BASE62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function encodeBase62(num) {
  let n = BigInt(num);
  let result = "";

  while (n > 0n) {
    const r = n % 62n;
    result = BASE62[Number(r)] + result;
    n = n / 62n;
  }

  return result || "0";
}

export function decodeBase62BigInt(str) {
  let result = 0n;
  for (let char of str) {
    result = result * 62n + BigInt(BASE62.indexOf(char));
  }
  return result;
}
