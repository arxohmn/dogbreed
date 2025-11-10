const result = document.getElementById("result"); //savieno ar html same id
const randomBtn = document.getElementById("randomBtn"); //savieno ar html same id


randomBtn.addEventListener("click", async () => {

  
    const res = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await res.json();

    

});
