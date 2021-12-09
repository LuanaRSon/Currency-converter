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
const tagP1 = document.querySelector(".currency-value1");  
 

const changeInfo = () => {  
  switch (convertTo.value) {    
    case "dolar":           
      divCurrency2.innerHTML = `
      <img src="${imagesHTML[0].img}" 
      alt="${imagesHTML[0].imgAlt}">
      <h2 class="currency-name1">${imagesHTML[0].name}</h2>
      <p class="currency-value2">US$ 0,00</p>      
      `;
      break;

    case "euro":      
      divCurrency2.innerHTML = `
      <img src="${imagesHTML[1].img}" 
      alt="${imagesHTML[1].imgAlt}">
      <h2 class="currency-name1">${imagesHTML[1].name}</h2>
      <p class="currency-value2">€ 0,00</p>      
      `;
      break;

    case "bitcoin":       
      divCurrency2.innerHTML = `
      <img src="${imagesHTML[2].img}" 
      alt="${imagesHTML[2].imgAlt}">
      <h2 class="currency-name1">${imagesHTML[2].name}</h2>  
      <p class="currency-value2">฿ 0,0000</p>    
      `;
      break;    
  }
  tagP1.innerHTML = `R$ 0,00`; 
};

const convertValue = () => {     
  const tagP2 = document.querySelector(".currency-value2");
  const divError = document.querySelector(".error-message");  
  let valueToConvert = parseFloat(inputToConvert.value);   
  let valueConverted; 

  if(!valueToConvert) {
    return divError.innerHTML = `<p>Insira um número válido.</p>`
  } else {
    divError.innerHTML = ``;

    if(convertTo.value === "dolar") {
      valueConverted = (valueToConvert / 5.54).toFixed(2);
      tagP1.innerHTML = `R$ ${valueToConvert.toFixed(2)}`;
      tagP2.innerHTML = `US$ ${valueConverted}`; 
    } else if (convertTo.value === "euro"){
      valueConverted = (valueToConvert / 6.29).toFixed(2);
      tagP1.innerHTML = `R$ ${valueToConvert.toFixed(2)}`;
      tagP2.innerHTML = `€ ${valueConverted}`; 
    } else {
      valueConverted = (valueToConvert * 0.0000039).toFixed(4);
      tagP1.innerHTML = `R$ ${valueToConvert.toFixed(2)}`;
      tagP2.innerHTML = `฿ ${valueConverted}`; 
    }
    cleanInputValue();
  }  
};

const cleanInputValue = () => inputToConvert.value = ``;

convertTo.addEventListener("change", changeInfo);
btnConvert.addEventListener("click", convertValue);
