const app = new Vue(
    {
        el: '#app',
        data: {
            valueInput: '',
            todosList: [
                'Fare la spesa',
                'Studiare programmazione'
            ]
        },
        methods:{
            saveTodo: function(){
                if(!this.valueInput?.trim()){
                    alert('Non puoi lasciare il campo vuoto');
                    return false;
                }
                this.todosList.unshift(this.valueInput);
                this.valueInput = '';
                console.log(app.todosList);
            },
            deleteTodo: function(value){
                this.todosList.splice(value, 1);
            }
        }
    }
);