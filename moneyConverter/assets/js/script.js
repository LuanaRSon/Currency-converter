const imagesHTML = [{
  name: "Dólar Americano",
  img: "./assets/img/dolar.svg",
  imgAlt: "imagem da bandeira dos Estados Unidos." 
},
{
  name: "Euro",
  img: "./assets/img/euro.svg",
  imgAlt: "imagem circular contendo o símbolo da moeda Euro." 
},
{
  name: "Bitcoin",
  img: "./assets/img/bitcoin.svg",
  imgAlt: "imagem circular contendo o símbolo da moeda digital Bitcoin." 
}];

const convertTo = document.getElementById("secondSelect");
const inputToConvert = document.getElementById("numberToConvert");
const btnConvert = document.querySelector(".btn-convert");
const realCurrencyValue = document.querySelector(".currency-value1"); 

const changeInfo = () => {  
  const [ dolar, euro, bitcoin ] = imagesHTML;
  const imgCurrency = document.getElementById("currency-img2");
  const currencyName = document.getElementsByClassName("currency-name2")[0];

  switch (convertTo.value) {    
    case "dolar":       
      imgCurrency.src = dolar.img;
      imgCurrency.alt = dolar.imgAlt;
      currencyName.innerHTML = dolar.name;      
      break;

    case "euro":   
      imgCurrency.src = euro.img;
      imgCurrency.alt = euro.imgAlt;
      currencyName.innerHTML = euro.name;        
      break;

    case "bitcoin": 
      imgCurrency.src = bitcoin.img;
      imgCurrency.alt = bitcoin.imgAlt;
      currencyName.innerHTML = bitcoin.name;       
      break;    
  }
  convertValue();  
};

const convertValue = async () => {     
  const currencyValue = document.querySelector(".currency-value2");
  const errorMessage = document.querySelector(".error-message");  
  let valueToConvert = parseFloat(inputToConvert.value);   
  let valueConverted; 

  const data = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL").then(response => response.json());
  
  const dolar = data.USDBRL.high;
  const euro = data.EURBRL.high;
  const bitcoin = (data.BTCBRL.high) /.0010;

  if(!valueToConvert || valueToConvert < 0) {
    return errorMessage.innerHTML = `<p>Insira um número válido.</p>`
  } else {
    errorMessage.innerHTML = ``;

    if(convertTo.value === "dolar") {
      valueConverted = valueToConvert / dolar;      
      currencyValue.innerHTML = new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD' }).format(valueConverted); 
    } else if (convertTo.value === "euro"){
        valueConverted = valueToConvert / euro;      
        currencyValue.innerHTML = new Intl.NumberFormat('de-DE', { 
          style: 'currency', 
          currency: 'EUR' }).format(valueConverted);  
    } else {
        valueConverted = valueToConvert / bitcoin;     
        currencyValue.innerHTML = new Intl.NumberFormat('de-DE', { 
          style: 'currency', 
          currency: 'BTC',
          minimumFractionDigits: 8 }).format(valueConverted); 
    }
    realCurrencyValue.innerHTML = new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' }).format(valueToConvert);     
  }  
};

convertTo.addEventListener("change", changeInfo);
btnConvert.addEventListener("click", convertValue);
