const container = document.querySelector('.container');
const table = document.querySelector('.table');



for (let i = 1; i <= 15; i++) {
    const tr = document.createElement('tr');
    for (let j = 1; j <= 3; j++) {
        const input = document.createElement('input');
        input.classList.add('input', `x${j}`, `y${i}`);
        tr.appendChild(input);
    }
    table.appendChild(tr);
}

const setLabels = (labels, classNames) => {
    labels.forEach((label, i) => {
        const element = document.querySelector(classNames[i]);
        element.value = label;
        element.setAttribute('readonly', 'readonly');
    });
};

setLabels(['DIFF:', 'Required:', 'Received:', 'Note:', '500', 
           '200', '100', '50', '20', '10', '5', '2', '1'],
          ['.input.x1.y1', '.input.x1.y2', '.input.x1.y3',
           '.input.x1.y4', '.input.x1.y6', 
           '.input.x1.y7', '.input.x1.y8', '.input.x1.y9', 
           '.input.x1.y10','.input.x1.y11','.input.x1.y12', 
           '.input.x1.y13','.input.x1.y14']);

setLabels(['0', '0', '0', 'AMT', '0', '0', '0', '0', '0', '0', '0'
         , '0', '0'],
          ['.input.x2.y1', '.input.x2.y2', '.input.x2.y3', '.input.x2.y4'
          , '.input.x2.y6', '.input.x2.y7', '.input.x2.y8'
          , '.input.x2.y9','.input.x2.y10','.input.x2.y11','.input.x2.y12',
           '.input.x2.y13', '.input.x2.y14']);

       
document.querySelector('.input.x2.y2').readOnly = false;
document.querySelector('.input.x1.y5').readOnly = true;
document.querySelector('.input.x2.y5').readOnly = true;
document.querySelector('.input.x3.y5').readOnly = true;


for (let i = 6; i <= 14; i++) {
    const selectable = document.querySelector(`.input.x3.y${i}`);
    if (selectable) {
      selectable.classList.add('selectable');
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const inputOrder = [
      '.input.x2.y2', 
      '.input.x3.y6', 
      '.input.x3.y7', 
      '.input.x3.y8', 
      '.input.x3.y9', 
      '.input.x3.y10', 
      '.input.x3.y11', 
      '.input.x3.y12', 
      '.input.x3.y13', 
      '.input.x3.y14'
    ];
  
    const firstInput = document.querySelector(inputOrder[0]);
    firstInput.focus();
    firstInput.select();
  
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const activeElement = document.activeElement;
        const currentIndex = inputOrder.findIndex(selector => activeElement.matches(selector));
  
        let nextIndex;
        if (e.shiftKey) {
          nextIndex = (currentIndex - 1 + inputOrder.length) % inputOrder.length;
        } else {
          nextIndex = (currentIndex + 1) % inputOrder.length;
        }
  
        const nextInput = document.querySelector(inputOrder[nextIndex]);
        nextInput.focus();
        nextInput.select();
      }
    });
  });
  
  



  

let statusMsg = document.querySelector('.input.x3.y1')


statusMsg.classList.add('statusMsg')
statusMsg.setAttribute('readonly', 'readonly')
const reqBtn =  document.querySelector('.input.x1.y2');
reqBtn.addEventListener('click', ()=>{
  document.querySelector('.input.x2.y2').value = 0;
  document.querySelector('.input.x2.y1').value = 0;
})
const clear = document.querySelector('.input.x3.y4');
clear.value = "Clear";
clear.classList = 'clearBtn';
clear.setAttribute('readonly', 'readonly')

const updateTotalsAndDifference = () => {
  const totalReceived = Array.from({ length: 10 }, (_, i) => 
                Number(document.querySelector(`.input.x2.y${i + 6}`).value)).reduce((a, b) => a + b, 0);

  const requiredAmount = Number(document.querySelector('.input.x2.y2').value);
  const difference = totalReceived - requiredAmount;

  document.querySelector('.input.x2.y3').value = totalReceived;
  document.querySelector('.input.x2.y1').value = difference;

  if(requiredAmount !== 0){
      if(totalReceived === requiredAmount){
          statusMsg.value = "Correct!";
          statusMsg.style.backgroundColor = "#6aff00";
      } else if(totalReceived > requiredAmount){
       
          statusMsg.value = `Return Rs.${Math.abs(difference)}`;
          statusMsg.style.backgroundColor = "yellow";

      } else {
          statusMsg.value = `Ask For Rs.${Math.abs(difference)}`;
          statusMsg.style.backgroundColor = "red";

      }
  } else {
      statusMsg.value = "Enter Required Amt";
      statusMsg.style.backgroundColor = "#e7f0e1"
  }
};





clear.addEventListener('click', () => {
  const entriesX3 = Array.from({ length: 10 }, (_, i) => 
                document.querySelector(`.input.x3.y${i + 6}`));
  entriesX3.forEach(entry => entry.value = '');

  const entriesX2 = Array.from({ length: 10 }, (_, i) => 
                document.querySelector(`.input.x2.y${i + 6}`));
  entriesX2.forEach(entry => entry.value = '0');

  updateTotalsAndDifference();
});





const addEventHandler = (constantSelector, amountSelector, inputSelector) => {
    const constant = document.querySelector(constantSelector);
    const amount = document.querySelector(amountSelector);
    const input = document.querySelector(inputSelector);
    input.type='number';

    input.addEventListener('input', event => {
        amount.value = event.target.value * constant.value;
        updateTotalsAndDifference();
    });
};

addEventHandler('.input.x1.y6', '.input.x2.y6', '.input.x3.y6')
addEventHandler('.input.x1.y7', '.input.x2.y7', '.input.x3.y7')
addEventHandler('.input.x1.y8', '.input.x2.y8', '.input.x3.y8')
addEventHandler('.input.x1.y9', '.input.x2.y9', '.input.x3.y9')
addEventHandler('.input.x1.y10', '.input.x2.y10', '.input.x3.y10')
addEventHandler('.input.x1.y11', '.input.x2.y11', '.input.x3.y11')
addEventHandler('.input.x1.y12', '.input.x2.y12', '.input.x3.y12')
addEventHandler('.input.x1.y13', '.input.x2.y13', '.input.x3.y13')
addEventHandler('.input.x1.y14', '.input.x2.y14', '.input.x3.y14');

document.querySelector('.input.x2.y2').addEventListener('input', updateTotalsAndDifference);







