function createOrganoValidation() {
    
    const organoInputList = document.getElementsByName('Organo');

    for (let i=0; i<organoInputList.length; i++) {
        const actualInput = organoInputList[i];
        actualInput.addEventListener('input', function (organoFormat) {
            let inputValue = organoFormat.target.value;

            //solo dejar numeros
            let cleanInputValue = inputValue.replace(/[\W\s\._\-]+/g, '');

            //aceptar solo 12 valores
            if (cleanInputValue.length <= 12) {
                actualInput.value = cleanInputValue;

            } else {
                actualInput.value = "";
            };

            //consultar el listado de despachos y colorear correcto o incorrecto
            if (inputValue == 0) {
                this.parentElement.style.borderBottomColor = 'rgba(255, 255, 255, 0.123)';
            }else {
                if (typeof despachosObject[inputValue] !== "undefined") {
                    this.parentElement.style.borderBottomColor = 'green';
                } else {
                    this.parentElement.style.borderBottomColor = 'red';
                }
            }
        });
    };
};
