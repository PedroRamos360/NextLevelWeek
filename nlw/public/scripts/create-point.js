function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf");

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then( states => {
        for (const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
        };
    });
};

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("input[name=state]");

    const ufValue = event.target.value;

    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

    citySelect.innerHTML = "";
    citySelect.disabled = true;

    fetch(url)
    .then(res => res.json())
    .then(cities => {
        for (const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
        }
        citySelect.disabled = false;
    });
};

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities);

// itens de coleta
const itemsToCollect = document.querySelectorAll(".items-grid li");

for (var item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem);
};

const collectedItems = document.querySelector("input[name=items]");
let selectedItems = [];

function handleSelectedItem(event) {
    const itemLi = event.target;
    const itemId = itemLi.dataset.id;

    // adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected");

    const alreadySelected = selectedItems.findIndex(item => item == itemId); // retorna true or false

    if (alreadySelected >= 0) {
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId;
            return itemIsDifferent;
        });

        selectedItems = filteredItems;
    } else {
        selectedItems.push(itemId);
    }

    collectedItems.value = selectedItems;
}