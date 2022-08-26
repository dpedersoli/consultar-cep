const error = document.getElementById("error")
const btn = document.getElementById("consult")

const populateTable = (address) => {
  // for (let i in address) {
  //   let newData = document.createElement("span");
  //   let textData = document.createTextNode(`${i}: ${address[i]}; `);
  //   newData.appendChild(textData);
  //   var element = document.getElementById("addresses");
  //   element.appendChild(newData);
  // }

  //passar uma 'id' dinâmica p/ cada elemento 'p' novo criado pelo 'setAttribute' p/ que seja deletado a partir da sua 'id'

  let newData = document.createElement("p");
  let textData = document.createTextNode(JSON.stringify(address));
  newData.appendChild(textData);
  var element = document.getElementById("addresses");
  element.appendChild(newData);
  
  let deleteButton = document.createElement("button");
  deleteButton.setAttribute("class", "btn btn-danger btn-sm text-wrap mx-2")
  let br = document.createElement("br");
  let textButton = document.createTextNode("Excluir");
  deleteButton.appendChild(textButton);
  element.appendChild(deleteButton);
  element.appendChild(br);

  const hiddenButton = document.getElementById("hiddenButton")
  hiddenButton.removeAttribute("hidden")
  hiddenButton.addEventListener("click", removeAllItems)

  deleteButton.addEventListener("click", removeOneItem)
}

const removeOneItem = () => {
  for (let i = 0; i <= 2; i++) {
  const element = document.getElementById("addresses")
    element.removeChild(element.firstChild);
  }
}

const removeAllItems = () => {
  const element = document.getElementById("addresses")
  element.parentNode.removeChild(element)

  const selectNewAddress = document.getElementById("newAddresses")
  const newElement = document.createElement("section")
  newElement.setAttribute("id", "addresses")
  newElement.setAttribute("class", "text-center")
  selectNewAddress.appendChild(newElement)

  const hiddenButton = document.getElementById("hiddenButton")
  hiddenButton.setAttribute("hidden", "hidden")
}

const consult = async (e) => {
  e.preventDefault()

  const cep = document.getElementById("cep").value
  const url = `http://viacep.com.br/ws/${cep}/json/`
  const newAddress = {
    cep: "",
    logradouro: "",
    complemento: "",
    bairro: "",
    localidade: "",
    uf: "",
    ibge: "",
    gia: "",
    ddd: "",
    siafi: ""
  }

  if(cep.length < 8){
    return error.innerText = 'Insira o CEP completo (8 dígitos)'
  } else if(isNaN(cep) || !cep) {
    return error.innerText = 'Insira somente números'
  } 
  
  await fetch(url)
  .then((response) => {
    if (response.status === 200) {
      response.json()
      .then((responseData) => {
        const data = responseData
        newAddress.cep = data.cep
        newAddress.logradouro = data.logradouro
        newAddress.complemento = data.complemento
        newAddress.bairro = data.bairro
        newAddress.localidade = data.localidade
        newAddress.uf = data.uf
        newAddress.ibge = data.ibge
        newAddress.gia = data.gia
        newAddress.ddd = data.ddd
        newAddress.siafi = data.siafi
        populateTable(data)
      })
    }
  })

  error.innerText = ''
  return
}

btn.addEventListener("click", consult)