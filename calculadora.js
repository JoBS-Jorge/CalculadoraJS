const prevOperationTxt = document.querySelector("#prev-operation")
const curOperationTxt = document.querySelector("#cur-operation")
const buttons = document.querySelectorAll("#buttons-container button")

console.log(buttons)

class Calculadora {
    constructor(prevOperationTxt, curOperationTxt){
        this.prevOperationTxt = prevOperationTxt
        this.curOperationTxt = curOperationTxt
        this.curOperation = ""
    }

    //Adiciona digito na tela da calculadora
    addDigito(digito) {
        //Validar se a opreação atual já possui um ponto
        if(digito === "." && this.curOperationTxt.innerText.includes(".")) {
            return
        }
        this.curOperation = digito
        this.updateTela()

        
    }

    //Processa todas as operações da calculadora
    processoOperacao(operacao) { 
        //Validar se o cur está vazio
        if (this.curOperationTxt.innerText === "" && operacao !== "C") {
            //Mudar operação
            if (this.prevOperationTxt.curOperationTxt !== "") {
               this.mudarOperacao()
            }
            return
        }
        
        //Pegar os valores cur e prev
        let valorOperacao
        const previous = +this.prevOperationTxt.innerText.split(" ")[0]
        const current = +this.curOperationTxt.innerText

        switch(operacao) {
            case "+":
                valorOperacao = previous + current
                this.updateTela(valorOperacao, operacao, current, previous)
                break;
            case "-":
                valorOperacao = previous - current
                this.updateTela(valorOperacao, operacao, current, previous)
                break;
            case "/":
                valorOperacao = previous / current
                this.updateTela(valorOperacao, operacao, current, previous)
                break;
            case "*":
                valorOperacao = previous * current
                this.updateTela(valorOperacao, operacao, current, previous)
                break;
            case "DEL":
                this.operacaoDel()
                break;
            case "CE":
                this.operacaoCe()
                break;
            case "C":
                this.operacaoC()
                break;
            case "=":
                this.operacaoEqual()
                break;
            default:
                return;
        }
    }

    //Atualização da tela na medida que o usuário digita
    updateTela(
        valorOperacao = null,
        operacao = null,
        current = null,
        previous = null
    ) {
        if(valorOperacao === null) {
            this.curOperationTxt.innerText += this.curOperation
        } else {
            //Validar se o valor é zero, se for apenas adicionar o valor corrente
            if(previous === 0) {
                valorOperacao = current
            }

            //Adicionar o valor cur para o prev
            this.prevOperationTxt.innerText = `${valorOperacao} ${operacao}`
            this.curOperationTxt.innerText = ""
        }
    }

    //Mudar a operação
    mudarOperacao(operacao) {
        const operacoesMatematicas = ["*", "/", "+", "-"]

        if(!operacoesMatematicas.includes(operacao)) {
            return
        }
        // remover o espaço no final da operação para incluir o operador
        this.prevOperationTxt.innerText = this.prevOperationTxt.innerText.slice(0, -1) + operacao
    }

    //Deletar o último dígito incluído
    operacaoDel() {
        this.curOperationTxt.innerText = this.curOperationTxt.innerText.slice(0, -1)
    }

    //Apagar o cur inteiro
    operacaoCe() {
        this.curOperationTxt.innerText = ""
    }

     //Apagar o cur e o prev inteiros para inciar uma nova operação
    operacaoC() {
        this.curOperationTxt.innerText = ""
        this.prevOperationTxt.innerText = ""
    }

    //Apresentar resultado
    operacaoEqual() {
        const operacao = prevOperationTxt.innerText.split(" ")[1]

        this.processoOperacao(operacao)
    }
}


const calc = new Calculadora(prevOperationTxt, curOperationTxt)

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const valor = e.target.innerText;
        
        if(+valor >= 0 || valor === ".") {
            calc.addDigito(valor)
        } else {
            calc.processoOperacao(valor)
        }
    })
})