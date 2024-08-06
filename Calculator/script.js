class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {         /*constructor adalah bawaan dari syntax class pada js*/
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()                                                          /*ini nge-set clear sebagai defaultdari calculator... nge-link ke constructor lewat function "updateDisplay()"*/
    }

    clear() {                         /*dalam 1 claas terdapat beberapa constructor*/
        this.currentOperand = ''        /*ini adalah variabel baru yg d deklarasikan... jadi g ada kaitannya sama DOM*/
        this.previousOperand = ''
        this.operation = undefined              /*mksdnya klo g ada operasi (+-/*) maka akan undefined*/
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)   /*???????*/
    }

    appendNumber(number) {            /*number liat pada forEach d bawah*/
        if (number === '.' && this.currentOperand.includes('.')) return               /*biar titik cuma 1 dn g terus menerus*/
            this.currentOperand = this.currentOperand.toString() + number.toString()      /*akan menambah nilai tapi dalambentuk string, jadi g berhitung*/
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)          /*parseFloat mengubah string menjaadi number*/
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return              /*jika kondisi tdk terpenuhi maka akan meng-cancel program secara keseluruhan*/
        switch (this.operation) {
            case '+' :
                computation = prev + current
                break
            case '-' :
                computation = prev - current
                break
            case '*' :
                computation = prev * current
                break
            case '/' :
                computation = prev / current
                break
            default :                  /*ini emng syntax, tapi karena tdk d butuhkan, maka d beri nilai return saja*/
                return      
        }
        this.currentOperand = computation
        this.operation = undefined           /*setelah operasi dilakukan, maka operation akan bernilai tdk ada*/
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumbers = number.toString()
        const integerDigits = parseFloat(stringNumbers.split('.')[0])             /*split('.') berfungsi memberikan spasi (split ketika ada ".")...cth '123' --> '1' '2' '3' (jadi array)*/
        const decimalDigits = stringNumbers.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        }else {
            integerDisplay = integerDigits.toLocaleString('en', {         /*toLocaleString() merupakan function untuk mengubah tipe data menjadi string......alias 2+2=22*/
                maximumFractionDigits: 0                                  /*(en) diatas mksdnya memunculkan angka" dalam format english... klo ar jadi angka arab*/
            })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        }else {
            return integerDisplay
        }
    }                                                    

    updateDisplay() {
        this.currentOperandTextElement.innerText = 
            this.getDisplayNumber(this.currentOperand)             /*akan kosong dulu d awal.... btw innerText fungsinya emngambil text*/
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = 
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }
        
    }
}



const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)       /*syntax untuk memanggil class Calculator di atas*/
                                                                                                /*new digunakan untuk memanggil constructor beserta deklarasinya*/

numberButtons.forEach(button => {                     /*syntax untuk membuat tombol bisa d klik dan meghasilkan value*/
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)     /*menambah angka jika button d klik....innerText itu mengambil konten dalam tag*/
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {                    
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)     
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', () => {
    calculator.compute()    
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', () => {
    calculator.clear()    
    calculator.updateDisplay()
})


deleteButton.addEventListener('click', () => {
    calculator.delete()    
    calculator.updateDisplay()
})
