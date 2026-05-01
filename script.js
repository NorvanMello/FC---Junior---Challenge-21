const buttonContainer = document.querySelector(".button-container");
const titleText = document.querySelector(".title-text")
const adviceText = document.querySelector(".advice-text")

async function getAdvice() {
    const response = await fetch("https://api.adviceslip.com/advice")

    if(!response.ok) {
        throw new Error("")
    }

    const data = await response.json()

    return data;
}

buttonContainer.addEventListener("click", async () => {
    try {
        const adviceObj = await getAdvice()

        titleText.textContent = `ADVICE #${adviceObj.slip.id}`
        adviceText.textContent = `${adviceObj.slip.advice}`
    } catch(error) {
        console.log(error)
    }
})
