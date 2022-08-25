//https://viacep.com.br/
const error = document.getElementById("error")

const btn = document.getElementById("consult")

const consult = (e) => {
  e.preventDefault()

  const cep = document.getElementById("cep").value
  const url = `http://viacep.com.br/ws/${cep}/json/`
  
  if(cep.length < 8){
    return error.innerText = 'Insira o CEP completo (8 dígitos)'
  } else if(isNaN(cep) || !cep) {
    return error.innerText = 'Insira somente números'
  }
  
  fetch(url)
  .then((response) => {
    if (response.status === 200) {
      response.json()
      .then((responseData) => {
        console.log(responseData)
      })
    }
  })

  error.innerText = ''
  return
}

btn.addEventListener("click", consult)