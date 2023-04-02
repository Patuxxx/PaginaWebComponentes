$("#formulario1").validate({
    rules: {
        "email": {
            required: true,
            email: true
        },
        "nombre":{
            minlength: 2
        }
    },
    messages: {
        "email": {
            required: 'Ingrese email!',
            email: 'no cumple formato'
        },
        "nombre":{
            required: 'Ingresa tu Nombre',
            minlength: 'Min. 2 caracteres'
        }
    }
})

