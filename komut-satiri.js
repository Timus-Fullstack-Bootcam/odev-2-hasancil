const yaricap = process.argv[2];
console.log(yaricap);
if (isNaN(yaricap)) {
  console.log("Girilen bir sayı değpil.");
} else {
  const alan = Math.PI * Math.pow(yaricap, 2);
  console.log(`Yarıçapı ${yaricap} olan dairenin alanı: ${alan}`);
}

// çalıştırmak için  node komut-satiri.js istenilen sayı
