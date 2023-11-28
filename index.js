const main = document.querySelector('main')
const root = document.querySelector(':root') //do css
const input = document.getElementById('input')
const resultInput = document.getElementById('result')

//primeiramente vamos impedir que o usuario possa digitar outra coisa que não seja as teclas da calculadora. Criaremos um array com todas as teclas permitidas

const allowedKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "]

document.querySelectorAll('.charKey').forEach(function (charKeyBtn) {
  charKeyBtn.addEventListener('click', function () {
    const value = charKeyBtn.dataset.value
    input.value += value
  })
})// essa função selecionou os botões pela classe charKey, e para cada botão foi atribuída uma função, que ao ser pressionado incluirá no input o valor associado ao botão lá no HMTL

document.getElementById('clear').addEventListener('click', function () {
  input.value = ''
  input.focus()
  resultInput.value = '' //quando clicar no C para limpar, o input será limpo e ficará em foco
})

input.addEventListener('keydown', function (ev) {
  ev.preventDefault() //se o usuario aperta com a tecla não quero que ele inclua o valor do botão diretamente, precisamos que seja verificado se está dentro das nossas teclas permitidas

  if (allowedKeys.includes(ev.key)) { //tecla associada ao evento. Se ela for uma tecla permitida o valor do input será o que já está lá + a tecla pressionada
    input.value += ev.key
    return
  }
  if (ev.key === 'Backspace') {
    input.value = input.value.slice(0, -1) // vai para o último caractere e exclui
  }
  if (ev.key === 'Enter') {
    calculate()
  }
})

document.getElementById('equal').addEventListener('click', calculate)

function calculate() {
  resultInput.value = 'Error'
  resultInput.classList.add('error') //se o método eval der erro, a função vai parar de ser executada.

  const result = eval(input.value) // o eval vai avaliar (evaluate) o código colocado no input, é uma função perigosa, está permitindo que seja executado o que for colocado nesse input. Caso seja colocado algum código javascript malicioso pode obter dados do backend. Como nesse caso restringimos as teclas para as da calculadora não há esse problema
  resultInput.value = result
  resultInput.classList.remove('error')
}

//botão para fazer a cópia do resultado

document.getElementById('copyToClipboard').addEventListener('click', function (ev) {
  const button = ev.currentTarget
  if (button.innerText === 'Copy') {
    button.innerText = 'Copied!'
    button.classList.add('success')
    navigator.clipboard.writeText(resultInput.value)
  } else {
    button.innerText = 'Copy'
    button.classList.remove('success')
  }
})

//funcionalidade de trocar o tema. Usaremos um if para verificar se está no tema dark ou light. Lá no elemento main nós deixamos com data-theme=dark, se for dark, trocaremos para o light

document.getElementById('themeSwitcher').addEventListener('click', function () {
  if (main.dataset.theme === 'dark') {
    root.style.setProperty('--bg-color', '#f1f5f9')
    root.style.setProperty('--border-color', '#aaa')
    root.style.setProperty('--font-color', '#212529')
    root.style.setProperty('--primary-color', '#26834a')
    main.dataset.theme = 'light'
  } else {
    root.style.setProperty('--bg-color', '#212529')
    root.style.setProperty('--border-color', '#666')
    root.style.setProperty('--font-color', '#f1f5f9')
    root.style.setProperty('--primary-color', '#4dff91')
    main.dataset.theme = 'dark'
  }
})