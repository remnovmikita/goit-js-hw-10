const form = document.querySelector('.form');
const btn = document.querySelector('.form button');
const input = document.querySelector('[name="delay"]');



// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const userValue = (x) =>{
    return new Promise((resolve, reject) =>{
        console.log(`${x}`);
        const time = Number(input.value);
        const nameElement = form.elements.state.value;
        setTimeout(() =>{
            if (nameElement === "fulfilled" ){
                resolve("lalalalal");
            } else{
                reject("ahahahaha");
            }
        }, time);  
    });
}

form.addEventListener("submit", event =>{
    event.preventDefault(); 
        const time = Number(input.value);
      userValue(name)
          .then( x => iziToast.success({
            position: 'topCenter',
            message: `✅ Fulfilled promise in ${time}ms`,

            }))   
          
            .catch(error => iziToast.error({
            message: `❌ Rejected promise in ${time}ms`,
            position: 'topCenter',
    }));
});