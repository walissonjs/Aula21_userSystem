// 1º passo - Identificar as Variáveis do projeto: CRIANDO VARIÁVEIS DO HTML
const form = document.querySelector('#formCadastro');

// OUVIR EVENTOS>>> Definindo eventos para os botões de ação (botãos de cadastro e reset)
form.addEventListener("submit", function(event){
    event.preventDefault(); // Impedir que o botão submit recarregue a página sempre que clicar nele (desta forma as informações digitadas não serão perdidas até que a funcionalidade do botão enviar seja definida)
    
// 2º Passo - Criar o 'OBJETO' para armazenar as informações    
// TODO: Explica esta función y sus parámetros
    console.log(Object.fromEntries([...form.elements] // [] : array | ...form.elements : armazena todos os dados 
        .filter(element => element.id)   //dentro deste array elements para que ele faça de forma    
        .map(element => [element.id, element.value] // automática a entrada dos dados e organize dentro 
        )));                                         // do array   
});