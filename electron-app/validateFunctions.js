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
            let checkOrganoRadicado = false;
            let checkAnoRadicado = false;
            let checkLargoRadicado = false;

            if (cleanInputValue.length <= 27) {
                let splittedText1 = cleanInputValue.substring(0, 5);
                splitArray.push(splittedText1);

                if (cleanInputValue.length >= 6) {
                    let splittedText2 = cleanInputValue.substring(5, 12);
                    splitArray.push(splittedText2);

                    // validar "organo" del radicado
                        let radicadoOrgano = splittedText1 + splittedText2;
                        if (typeof despachosObject[radicadoOrgano] !== "undefined") {
                            checkOrganoRadicado = true;
                        } else {
                            console.log('organo incorrecto');
                        }

                    if (cleanInputValue.length >= 13) {
                        let splittedText3 = cleanInputValue.substring(12, 16);
                        splitArray.push(splittedText3);

                                // validar "año" del radicado
                                if (splittedText3 <= currentYear) {
                                    checkAnoRadicado = true;
                                } else {
                                    console.log('año incorrecto');
                                }

                        if (cleanInputValue.length >= 17) {
                            let splittedText4 = cleanInputValue.substring(16, 21);
                            splitArray.push(splittedText4);

                            if (cleanInputValue.length >= 22) {
                                let splittedText4 = cleanInputValue.substring(21, 23);
                                splitArray.push(splittedText4);

                                        //validar largo
                                        if (cleanInputValue.length == 23) {
                                            checkLargoRadicado = true;
                                        } else {
                                            console.log('largo incorrecto');
                                        }
                            };
                        };
                    };
                };
                actualInput.value = splitArray.join("-");

                // validar hora y colorear correcto o incorrecto

                if (inputValue == 0) {
                    this.parentElement.style.borderBottomColor = 'rgba(255, 255, 255, 0.123)';
                }else {
                    if (checkOrganoRadicado && checkAnoRadicado && checkLargoRadicado == true) {
                        this.parentElement.style.borderBottomColor = 'green';
                    } else {
                        this.parentElement.style.borderBottomColor = 'red';
                    }
                }
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

            //variables necesarias
            let splitArray = [];
            let checkyear = false;
            let checkmonth = false;
            let checkday = false;

            if (cleanInputValue.length <= 10) {
                let splittedText1 = cleanInputValue.substring(0, 4);
                        
                    //validar año
                        if (splittedText1 <= currentYear) {
                            checkyear = true;
                        } else {
                            checkyear = false;
                            //corregir al año actual si es mas alto
                            splittedText1 = currentYear;
                        }
                        splitArray.push(splittedText1);


                    if (cleanInputValue.length >= 5) {
                        let splittedText2 = cleanInputValue.substring(4, 6);
                                
                            //validar mes
                                if (splittedText2 < 13) {
                                    checkmonth = true;
                                } else {
                                    checkmonth = false;
                                    //corregir al ultimo mes si es mas alto
                                    splittedText2 = 12;
                                }
                                splitArray.push(splittedText2);

                        if (cleanInputValue.length >= 7) {
                            let splittedText3 = cleanInputValue.substring(6, 8);
                                    
                                //validar dia
                                    if (splittedText3 < 32) {
                                        checkday = true;
                                    } else {
                                        checkday = false;
                                        //corregir al ultimo dia del mes si es mas alto
                                        const lastMonthDay = {
                                            '01': '31',
                                            '02': '29',
                                            '03': '31',
                                            '04': '30',
                                            '05': '31',
                                            '06': '30',
                                            '07': '31',
                                            '08': '31',
                                            '09': '30',
                                            '10': '31',
                                            '11': '30',
                                            '12': '31'
                                        }
                                        splittedText3 = lastMonthDay[splittedText2];
                                        checkday = true;
                                    }
                                    splitArray.push(splittedText3);
/*
                                    // si la fecha es futura corregir a la fecha actual
                                    if (splitArray.join("") > currentDate.join("")) {
                                        //asignar al input los valores de la fecha de hoy
                                        actualInput.value = currentDate.join("/");
                                    } else {
                                        //asignar al input los valores correctamente escritos
                                        actualInput.value = splitArray.join("/");
                                    } 
                                    */
                        };
                };
                actualInput.value = splitArray.join("/");


                // validar hora y colorear correcto o incorrecto
                if (inputValue == 0) {
                    this.parentElement.style.borderBottomColor = 'rgba(255, 255, 255, 0.123)';
                }else {
                    if (checkyear && checkmonth && checkday == true) {
                        this.parentElement.style.borderBottomColor = 'green';
                    } else {
                        this.parentElement.style.borderBottomColor = 'red';
                    }
                }
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
            let checkhour = false;
            let checkmin = false;
            let checkseg = false;

            if (cleanInputValue.length <= 8) {
                let splittedText1 = cleanInputValue.substring(0, 2);

                        //validar la hora
                        if (splittedText1 < 24) {
                            checkhour = true;
                        } else {
                            checkhour = false;
                            //corregir al la ultima hora del dia
                            splittedText1 = 23;
                        }
                        splitArray.push(splittedText1);

                if (cleanInputValue.length >= 3) {
                    let splittedText2 = cleanInputValue.substring(2, 4);

                            //validar la minutos
                            if (splittedText2 < 60) {
                                checkmin = true;
                            } else {
                                checkmin = false;
                                //corregir al ultimo minuto
                                splittedText2 = 59;
                            }
                            splitArray.push(splittedText2);

                    if (cleanInputValue.length >= 5) {
                        let splittedText3 = cleanInputValue.substring(4, 6);

                                //validar la minutos
                                if (splittedText3 < 60) {
                                    checkseg = true;
                                } else {
                                    checkseg = false;
                                    //corregir al ultimo segundo
                                    splittedText3 = 59;
                                    checkseg = true;
                                }
                                splitArray.push(splittedText3);
                    };
                };
                actualInput.value = splitArray.join(":");

                // validar hora y colorear correcto o incorrecto
                if (inputValue == 0) {
                    this.parentElement.style.borderBottomColor = 'rgba(255, 255, 255, 0.123)';
                }else {
                    if (checkhour && checkmin && checkseg == true) {
                        this.parentElement.style.borderBottomColor = 'green';
                    } else {
                        this.parentElement.style.borderBottomColor = 'red';
                    }
                }
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