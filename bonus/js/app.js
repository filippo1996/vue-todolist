class Todos {
    data = {};
    tempItem;
    hasTempItem = false;
    ul;

    constructor(obj){
        this.data = obj;
        this.ul = document.getElementById('outputTodo');
        //console.log(this.data);
    }

    createTempItem()
    {
        const li = document.createElement('li');
        li.className = "list border-bottom clearfix temp";
        li.setAttribute('data-prova','ciao');
        this.ul.prepend(li);

        this.hasTempItem = true;
        this.tempItem = li;
    }

    removeTempItem()
    {
        if( !this.hasTempItem ) return

        //this.tempItem.remove();
        this.tempItem = '';
        this.hasTempItem = false;
    }

    saveTempTodo()
    {
        this.tempItem?.classList.remove('temp');
        this.hasTempItem = false;
    }


    /**
     * Scateniamo l'evento keyup nel document e associamo il valore
     * dinamico alla proprietà 
     * @param {string} property 
     * @param {string} keyboard 
     */
    setKeyupInput(property, keyboard){
        document.getElementById('inputTodo').addEventListener('keyup', (eve) => {
            this.data[property] = eve.target.value;

            if( eve.target.value === '' ){
                this.removeTempItem();
                //alert('non puoi lasciare questo campo vuoto');
                return;
            }
    
            if( !this.hasTempItem ) this.createTempItem();
            this.tempItem.innerHTML = eve.target.value;
            //console.log(this.data, eve.key);
            //this.getShowInput('#outputTodo', this.data.valueInput, 'innerHTML');
            if(eve.key === keyboard){
                this.addTodosList( eve.target.value);
                this.saveTempTodo();
                //console.log(this.data.todosList);
            }
        });
    }

    /**
     * Creiamo la struttura dell'elemento li dell'html
     * @param {string} value 
     * @returns obbject
     */
    structureList(value){
        const li = document.createElement('li');
        li.className = "list border-bottom clearfix";
        li.innerHTML = `${value}<span class="btn float-right" title="Elimina promemoria"><i class="fas fa-trash"></i></span>`;
        return li;
    }

    /**
     * Stampiamo l'array della lista todos sull'html
     */
    stampListTodo(){
        //Cicliamo l'array della todoList
        this.data.todosList?.forEach((ele) => {
            const list = document.getElementById('outputTodo');
            list.appendChild(this.structureList(ele));
        });
    }

    /**
     * Scateniamo l'evento al click 
     * @param {string} id 
     */
    setClick(id){
        const doc = id ? document.querySelector(id) : document;
        doc.addEventListener('click',(eve) => {
            this.addTodosList(this.data.valueInput);
            this.saveTempTodo();
            console.log(this.data.todosList);
        });
    }

    /**
     * Aggiungiamo la nuova lista all'array todosList
     */
    addTodosList( str ){
        str = str?.trim();
        if(!str){
            alert('non puoi lasciare questo campo vuoto');
            return false;
        }
        
        this.data.todosList.unshift(str);
        this.tempItem.innerHTML += `<span class="btn float-right" title="Elimina promemoria"><i class="fas fa-trash"></i></span>`;
        //Inseriamo il valore creato nella lista html
        //const list = this.ul;
        //list.insertBefore(this.structureList(str), list.childNodes[0]);
        //Eliminiamo il valore dell'input
        this.getShowInput('#inputTodo', this.data.valueInput = '');
    }


    /**
     * Rimuoviamo la lista html e pure dll'array todosList
     */
    removeTodosList(){
        document.getElementById('outputTodo').addEventListener('click', function(e) {
            if(e.target.className === 'fas fa-trash'){
                const arrayEle = [...this.children];
                const idx = arrayEle.indexOf(e.target.parentNode.parentNode);
                //Rimuoviamo l'elemento dall'array 
                app.data.todosList.splice(idx,1);
                //Rimuoviamo l'elemento dal dom
                e.target.parentNode.parentNode.remove();

                console.log(app.data.todosList);
            }
        });
    }

    /**
     * Impostiamo il valore all'elemento sull'HTML
     * @param {string} id 
     * @param {string} data 
     */
    getShowInput(id, data, property = 'value'){
        document.querySelector(id)[property] = data;
    }

}



//Instanziamo l'oggetto Todos
const app = new Todos(
    {
        valueInput: '',
        todosList: [
            'Fare la spesa',
            'studiare'
        ]
    }
);

//Stampiamo la lista di ul nell'html
app.stampListTodo();

//Impostiamo quale proprietà dobbiamo dare il valore del campo input +
//Scateniamo l'evento quando premiamo il tasto enter sulla tastiera
app.setKeyupInput('valueInput', 'Enter');

//Passiamo l'id html della quale vogliamo scatenare l'evento click
app.setClick('#save');

//Invochiamo l'evento che ci permette di eliminare l'elemento
app.removeTodosList();