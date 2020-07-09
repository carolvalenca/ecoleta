const ufSelect = document.querySelector('select[name="uf"]')
const citySelect = document.querySelector('select[name="city"]')
const stateInput = document.querySelector('input[name="state"]')

function populateUFs() {
    url = 'http://servicodados.ibge.gov.br/api/v1/localidades/estados'
    fetch(url)
    .then((res) => res.json())
    .then(states => {
        for (const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()


function getCities(event) {
    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    url = `http://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = '<option value="">Selecione a Cidade</option>';
    citySelect.disabled = true

    fetch(url)
    .then(res => res.json())
    .then(cities => {
        for (const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false

    })

}


ufSelect.addEventListener('change', getCities)

// itens de coleta
// pegar todos os li's

const itemsToCollect = document.querySelectorAll('.items-grid li')

for (const item of itemsToCollect) {
    item.addEventListener('click', handleSelectedItem)
}

const collectedItems = document.querySelector('input[name=items]')

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target
    itemLi.classList.toggle('selected')

    const itemId = itemLi.dataset.id

    //verificar quais os itens selecionados
    // se sim, pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex(item => item == itemId)

    //se ja estiver selecionado, tirar da seleçao
    if (alreadySelected >= 0) {
        const filteredItems = selectedItems.filter(item => item != itemId)
        selectedItems = filteredItems
    } else {
        // se nao tiver selecionado, adicionar a seleçao
        selectedItems.push(itemId)
    }


    //atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems
}

