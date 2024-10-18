const birthYr = document.querySelector(".input1");
const birthMn = document.querySelector(".input2");
const submitBtn = document.querySelector(".submit");
const resultDiv = document.querySelector(".result");

function ageCalc(birthYr) {
    const bYear = birthYr.value;    
    const currentYr = new Date().getFullYear();
    const PresentAge = currentYr - bYear;
    return PresentAge;
}

async function fetchAdvice() {
    try {
        const response = await fetch('https://api.adviceslip.com/advice');
        const data = await response.json();
        return data.slip.advice;
    } catch(error) {
        console.error('Error fetching data', error);
        return 'Sorry, no advice for now';        
    }
    
}

submitBtn.addEventListener('click', async (event) => {
    event.preventDefault();
  
    console.log(ageCalc(birthYr));
    const pText = document.createElement('p');
    pText.textContent = 'Your Current age is ' + ageCalc(birthYr);
    resultDiv.appendChild(pText);
  
    const loadingText = document.createElement('p');
    loadingText.textContent = 'Loading...';
    resultDiv.appendChild(loadingText);
  
    const advice = await fetchAdvice();
    resultDiv.removeChild(loadingText);
    const bMonth = birthMn.value ;
    const Birthmonth = bMonth.charAt(0).toUpperCase() + bMonth.slice(1);
    const adviceText = document.createElement('p');
    adviceText.innerHTML = "Wonderful! You're a  " + Birthmonth + ' Baby ☺️ ' + '<br> Specially for you: ' + advice;
    resultDiv.appendChild(adviceText);
});

