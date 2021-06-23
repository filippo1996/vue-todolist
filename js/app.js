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
                this.todosList.unshift(this.valueInput);
                this.valueInput = '';
                console.log(app.todosList);
            }
        }
    }
);