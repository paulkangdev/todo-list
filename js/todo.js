var UIController = (function(){
    
    var DOMstrings = {
        inputName: '.add__input',
        inputBtn: '.add__list__item',
        deleteBtn: '.del__list__item',
        todoList: '.todo-list',
        listWrapper: '.display-list'
    }
    var ListItem = function(name, id) {
        this.name = name;
        this.id = id;
    }
    
    var listArray = [];
        
    return {
        getInput: function() {
            return document.querySelector(DOMstrings.inputName).value;
        },

        getDOMstrings: function() {
            return DOMstrings;
        },
        
        getListID: function(inp){
            return ListItem[inp].id;
        },

        addItemHTML: function(inp) {
            var html, newHTML;
            var itemID;            
            if (listArray.length>0){
               itemID = listArray[listArray.length-1].id+1;
            } else {
                itemID = 0;
            }
            newItem = new ListItem(inp, itemID); 
            listArray.push(newItem);
            html = "<li class='list__item' id='list-%id%'><p>%name%</p><input type='checkbox'><button class='del__list__item'>Delete</button></li>";
            newHTML = html.replace('%name%', inp);
            newHTML = newHTML.replace('%id%', itemID);
            document.querySelector(DOMstrings.todoList).insertAdjacentHTML('beforeend', newHTML);
            console.log(newHTML);
            console.log(newItem);
            console.log(listArray);
            
        },
        
       delItem: function(selectorID) {
           var splitID;
           var del = document.getElementById(selectorID);            
           var ids;
           var delIndex;
           console.log(del);
           ids = listArray.map(function(current) {
               return current.id;
           });
           
           splitID = selectorID.split('-');
           delIndex = ids.indexOf(parseInt(splitID[1]));
           
           if (delIndex !== -1){
            listArray.splice(delIndex,1);
            del.parentNode.removeChild(del);
           }
           
        },

        clearFields: function(){
            document.querySelector(DOMstrings.inputName).value = "";
        }

    }
})();

var controller = (function(UICtrl) {
    
    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMstrings();
        
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
        document.querySelector(DOM.todoList).addEventListener('click', ctrlDelItem);
        document.addEventListener('keypress', function(event) {
            if(event.keyCode === 13 || event.which === 13) {
               ctrlAddItem();
               }
        });
    }
    
    var ctrlAddItem = function() {
      console.log("call click");
        var input, newItem;
        input = UICtrl.getInput().trim();  
        if (input!=='') {
            UICtrl.addItemHTML(input);
        } else{
        }
        UICtrl.clearFields();
    }
    
    var ctrlDelItem = function() {
        if(event.target.className ==='del__list__item'){
        var el = event.target.parentNode.id;
        UICtrl.delItem(el);
        }
    }
    
    
    return {
        init: function() {
            console.log("We startin\'");
            setupEventListeners();
        }
    }
    
})(UIController);

controller.init();