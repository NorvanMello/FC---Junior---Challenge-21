const buttonContainer = document.querySelector(".button-container");
const titleText = document.querySelector(".title-text")
const adviceText = document.querySelector(".advice-text")

async function getAdvice() {
    const response = await fetch("https://api.adviceslip.com/advice")

    if(!response.ok) {
        throw new Error("Sorry, we couldn’t load new advice. Try again.")
    }

    const data = await response.json()

    return data;
}

function renderAdvice(advice) {
    titleText.textContent = `ADVICE #${advice.id}`
    adviceText.textContent = `${advice.advice}`
}

function renderError(error) {
    console.error(error)
    titleText.textContent = "ERROR";
    adviceText.textContent = "Sorry, we couldn’t load new advice. Try again.";
}

function setLoadingState() {
    buttonContainer.disabled = true;
    adviceText.textContent = "Loading advice...";
}

function removeLoadingState() {
    buttonContainer.disabled = false;
}

buttonContainer.addEventListener("click", async () => {
    try {
        setLoadingState();
        const adviceObj = await getAdvice();

        renderAdvice(adviceObj.slip)
    } catch(error) {
        renderError(error);
    } finally {
        removeLoadingState();
    }
})
