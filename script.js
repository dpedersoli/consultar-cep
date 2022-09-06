const error = document.getElementById("error")
const btn = document.getElementById("consult")
const addresses = document.getElementById("addresses")
const hiddenButton = document.getElementById("hiddenButton")
const url = "http://localhost:3000/enderecos"

const render = (address) => {
  addresses.innerHTML = ''

  address.forEach((data) => {
    const addNewAddress = `
    <div id=${data.id} class="d-flex justify-content-center align-items-center text-center w-full">
      <p><strong style="font-size: 20px; color: #AF29AF;">${data.cep}</strong> ${data.logradouro} <strong>${data.localidade}</strong> ${data.bairro} </p>
      <button id="deleteOne" class="btn btn-danger btn-sm text-wrap mt-4"><i class="bi bi-trash"></i></button>
    </div>
    `
    addresses.innerHTML += addNewAddress 

    if (data) {
      hiddenButton.removeAttribute("hidden")
    }
  })


}

const populateTable = (address) => {

  const lastAddress = address[address.length - 1]

  const addNewAddress = `
    <div id=${lastAddress.id} class="d-flex justify-content-center align-items-center text-center w-full">
      <p><strong style="font-size: 20px; color: #AF29AF;">${lastAddress.cep}</strong> ${lastAddress.logradouro} <strong>${lastAddress.localidade}</strong> ${lastAddress.bairro} </p>
      <button id="deleteOne" class="btn btn-danger btn-sm text-wrap mt-4"><i class="bi bi-trash"></i></button>
    </div>
    `
  addresses.innerHTML += addNewAddress

  console.log(lastAddress.id)
     
  hiddenButton.removeAttribute("hidden")

    //validar ceps repetidos com error de retorno ///////////////////////////////////////////////////////////////////////////
    // if(formattedCEPChecker.includes(cep)){
    //   return error.innerText = 'Esse CEP já está na tabela'
    // }

  }



  //exluir 1 (preciso passar o 'id' aqui por meio do chamamento da função (toda 'div' já tem seu 'id' específico)) //////////////////////////////////////////////////////////////////////
  //alinhar /////////////////////////////////////////////////////////////////////////// 

//exluir todos do DB ->  /////////////////////////////////////////////////////////////
async function deleteAll (e) {
  e.preventDefault();

  await fetch(`${url}`, {
    method: "DELETE",
    headers: {"Content-Type": "application/json;charset=UTF-8"},
  })
  .then(res => res)

  // addresses.innerHTML = ''
  // hiddenButton.setAttribute("hidden", "hidden");
}


async function getRenderData () {

  await fetch(url)
  .then((response) => {
    response.json()
    .then((data) =>{
      render(data)
    })
  })
}

async function getData () {

  await fetch(url)
  .then((response) => {
    response.json()
    .then((data) =>{
      populateTable(data)
    })
  })
}

async function postData (address) {

  await fetch(url, {
  method: "POST",
  headers: {"Content-Type": "application/json;charset=UTF-8"},
  body: JSON.stringify(address),
})
  .then((response) => response.json())
  .then((data) => {
    getData(data)
  })
  
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

        if (!data.cep){
          return error.innerText = 'Insira um CEP válido'
        } else {
          postData(data)
        }
      })
    }
  })

  error.innerText = ''
  return
}

hiddenButton.addEventListener("click", deleteAll)
btn.addEventListener("click", consult)
getRenderData()