//Funciones de Validacion

function createPlayButtonAction() {
    const butonsList = document.getElementsByClassName('play-button');

    for (let i=0; i<butonsList.length; i++) {

        butonsList[i].addEventListener('click', function playVideo (button_click) {
            const videoUrlValue = button_click.target.value;
            const videoTagHtml = '<video autoplay width="900" height="405" controls><source src="'+ videoUrlValue +'" type="video/mp4">Your browser does not support the video tag.</video>';
            document.getElementById('video-container').innerHTML = videoTagHtml;
        });

    };
};

function createRadicadoValidation() {
    
    const radicadoInputList = document.getElementsByName('Radicado');

    for (let i=0; i<radicadoInputList.length; i++) {
        const actualInput = radicadoInputList[i];
        actualInput.addEventListener('input', function (radicadoFormat) {
            let inputValue = radicadoFormat.target.value;
            let cleanInputValue = inputValue.replace(/[\W\s\._\-]+/g, '');

            let splitArray = [];

            if (cleanInputValue.length <= 27) {
                const splittedText1 = cleanInputValue.substring(0, 5);
                splitArray.push(splittedText1);

                if (cleanInputValue.length >= 6) {
                    const splittedText2 = cleanInputValue.substring(5, 12);
                    splitArray.push(splittedText2);

                    if (cleanInputValue.length >= 13) {
                        const splittedText3 = cleanInputValue.substring(12, 16);
                        splitArray.push(splittedText3);

                        if (cleanInputValue.length >= 17) {
                            const splittedText4 = cleanInputValue.substring(16, 21);
                            splitArray.push(splittedText4);

                            if (cleanInputValue.length >= 22) {
                                const splittedText4 = cleanInputValue.substring(21, 23);
                                splitArray.push(splittedText4);
                            };
                        };
                    };
                };
                actualInput.value = splitArray.join("-");
                //checkConsecutivo ();
            } else {
                actualInput.value = "";
            };
        });
    };
};

function createFechaValidation() {
    const dateInputList = document.getElementsByName('Date');

    for (let i=0; i<dateInputList.length; i++) {
        const actualInput = dateInputList[i];
        actualInput.addEventListener('input', function (dateFormat) {
            let inputValue = dateFormat.target.value;
            let cleanInputValue = inputValue.replace(/[\W\s\._\-]+/g, '');

            let splitArray = [];

            if (cleanInputValue.length <= 10) {
                const splittedText1 = cleanInputValue.substring(0, 4);
                splitArray.push(splittedText1);

                if (cleanInputValue.length >= 5) {
                    const splittedText2 = cleanInputValue.substring(4, 6);
                    splitArray.push(splittedText2);

                    if (cleanInputValue.length >= 7) {
                        const splittedText3 = cleanInputValue.substring(6, 8);
                        splitArray.push(splittedText3);
                    };
                };
                actualInput.value = splitArray.join("/");
                //checkConsecutivo ();
            } else {
                actualInput.value = "";
            };
        });
    };
};

function createHoraValidation(){

    const timeInputList = document.getElementsByName('Time');

    for (let i=0; i<timeInputList.length; i++) {
        const actualInput = timeInputList[i];
        actualInput.addEventListener('input', function (timeFormat) {
            let inputValue = timeFormat.target.value;
            let cleanInputValue = inputValue.replace(/[\W\s\._\-]+/g, '');

            let splitArray = [];

            if (cleanInputValue.length <= 8) {
                const splittedText1 = cleanInputValue.substring(0, 2);
                splitArray.push(splittedText1);

                if (cleanInputValue.length >= 3) {
                    const splittedText2 = cleanInputValue.substring(2, 4);
                    splitArray.push(splittedText2);

                    if (cleanInputValue.length >= 5) {
                        const splittedText3 = cleanInputValue.substring(4, 6);
                        splitArray.push(splittedText3);
                    };
                };
                actualInput.value = splitArray.join(":");
                //checkConsecutivo ();
            } else {
                actualInput.value = "";
            };
        });
    };
};

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

function createReservadoLibreValidation() {

    const reservedInputList = document.getElementsByName('Reserved');

    for (let i=0; i<reservedInputList.length; i++) {
        const actualInput = reservedInputList[i];
        actualInput.addEventListener('input', function (reservedFormat) {
            let inputValue = reservedFormat.target.value;
            actualInput.value = inputValue.toUpperCase();
            //checkConsecutivo ();
        });
    };
};

function createVirtualPresencialValidation() {

const virtualInputList = document.getElementsByName('Virtual');

    for (let i=0; i<virtualInputList.length; i++) {
        const actualInput = virtualInputList[i];
        actualInput.addEventListener('input', function (virtualFormat) {
            let inputValue = virtualFormat.target.value;
            actualInput.value = inputValue.toUpperCase();
            //checkConsecutivo ();
        });
    };
};