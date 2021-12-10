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
const divCurrency2 = document.querySelector(".currency2");
let inputToConvert = document.getElementById("numberToConvert");
const btnConvert = document.querySelector(".btn-convert");
const realCurrencyValue = document.querySelector(".currency-value1");   

const cleanInputValue = () => inputToConvert.value = ``;

const changeInfo = () => {  
  const [ dolar, euro, bitcoin ] = imagesHTML;

  switch (convertTo.value) {    
    case "dolar":           
      divCurrency2.innerHTML = `
      <img src="${dolar.img}" 
      alt="${dolar.imgAlt}">
      <h2 class="currency-name1">${dolar.name}</h2>
      <p class="currency-value2">$0.00</p>      
      `;
      break;

    case "euro":      
      divCurrency2.innerHTML = `
      <img src="${euro.img}" 
      alt="${euro.imgAlt}">
      <h2 class="currency-name1">${euro.name}</h2>
      <p class="currency-value2"> 0,00 €</p>      
      `;
      break;

    case "bitcoin":       
      divCurrency2.innerHTML = `
      <img src="${bitcoin.img}" 
      alt="${bitcoin.imgAlt}">
      <h2 class="currency-name1">${bitcoin.name}</h2>  
      <p class="currency-value2">0,00 XBT</p>    
      `;
      break;    
  }
  realCurrencyValue.innerHTML = `R$ 0,00`; 
};

const convertValue = () => {     
  const currencyValue = document.querySelector(".currency-value2");
  const errorMessage = document.querySelector(".error-message");  
  let valueToConvert = parseFloat(inputToConvert.value);   
  let valueConverted; 

  if(!valueToConvert || valueToConvert < 0) {
    return errorMessage.innerHTML = `<p>Insira um número válido.</p>`
  } else {
    errorMessage.innerHTML = ``;

    if(convertTo.value === "dolar") {
      valueConverted = valueToConvert / 5.54;      
      currencyValue.innerHTML = new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD' }).format(valueConverted); 
    } else if (convertTo.value === "euro"){
        valueConverted = valueToConvert / 6.29;      
        currencyValue.innerHTML = new Intl.NumberFormat('de-DE', { 
          style: 'currency', 
          currency: 'EUR' }).format(valueConverted);  
    } else {
        valueConverted = valueToConvert * 0.0000039;     
        currencyValue.innerHTML = new Intl.NumberFormat('de-DE', { 
          style: 'currency', 
          currency: 'XBT' }).format(valueConverted); 
    }
    realCurrencyValue.innerHTML = new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' }).format(valueToConvert); 
    cleanInputValue();
  }  
};

convertTo.addEventListener("change", changeInfo);
btnConvert.addEventListener("click", convertValue);
