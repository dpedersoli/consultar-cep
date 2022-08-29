const error = document.getElementById("error")
const btn = document.getElementById("consult")
const teste = document.getElementById("teste")

//fazer o 'forEach(itens) => {itens}' da 'colinha' aqui
const populateTable = (address) => {
  teste.innerHTML = ''

  for(const itens in address) {
    const validando = `
      <span>${itens} ${address[itens]}</span>
      <br />
    `
    
    teste.innerHTML += validando
  }
}

const consult = async (e) => {
  e.preventDefault()

  const cep = document.getElementById("cep").value
  const url = `http://viacep.com.br/ws/${cep}/json/`
  const newAddress = {
    cep: "",
    logradouro: "",
    bairro: "",
    localidade: "",
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
        newAddress.bairro = data.bairro
        newAddress.localidade = data.localidade
        populateTable(data)
      })
    }
  })

  error.innerText = ''
  return
}

btn.addEventListener("click", consult)