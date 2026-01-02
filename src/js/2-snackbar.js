const form = document.querySelector('.form');
const input = document.querySelector('[name="delay"]');



// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const userValue = (time, nameElement) =>{
    return new Promise((resolve, reject) =>{
        setTimeout(() =>{
            if (nameElement === "fulfilled" ){
                resolve(time);
            } else{
                reject(time);
            }
        }, time);  
    });
}

form.addEventListener("submit", event =>{
    const time = Number(input.value);
    const nameElement = form.elements.state.value;
    if(!nameElement){
        iziToast.warning({
      position: "topCenter",
      message: "❗ Please select Fulfilled or Rejected before starting",
    });
    return;
    }
    event.preventDefault(); 
      userValue(time, nameElement)
          .then( x => iziToast.success({
            position: 'topCenter',
            message: `✅ Fulfilled promise in ${x}ms`,
            }))   
            .catch(error => iziToast.error({
            message: `❌ Rejected promise in ${error}ms`,
            position: 'topCenter',
    }));
});