var username_data;
json_username_data= localStorage.getItem('username_data_localStorage');
username_data = JSON.parse(json_username_data);
console.log(username_data);

 // Model
      //Creates a todo
      function createTodo(title, dueDate) {
        const id = '' + new Date().getTime();

        newTodo= {
          username: username_data.username,
          content: title,
          due_date: dueDate,
          id: id
        };
        json_newtodo = JSON.stringify(newTodo);
        $.ajax({
          url: "http://127.0.0.1:5000/addtodo",
          data: json_newtodo,
          type: 'POST',
          contentType: 'application/json'
        }).done(function (res){
          alert(res.msg);
          render(username_data);
        })
      }

      //Deletes a todo
      function removeTodo(idToDelete) {
        savedTodos = savedTodos.forEach(function (todo) {
          // If the id of this todo matches idToDelete, return false
          // For everything else, return true
          if (todo.id === idToDelete) {
            json_todo = JSON.stringify(todo)
            $.ajax({
              url: "http://127.0.0.1:5000/removetodo",
              data: json_todo,
              type: 'POST',
              contentType: 'application/json'
            }).done(function (res){
              alert(res.msg);
              render(username_data);
            })
          } 
        });
      }

      function setEditing(todoId) {
        savedTodos.forEach(function (todo) {
          if (todo.id === todoId) {
            todo.isEditing = true;
          }
        })

        document.getElementById('todo-list').innerHTML = '';

        // Render by recognizing isEditing 
        savedTodos.forEach(function (todo) {
          const element = document.createElement('div');

          // If todo is edited, render a textbox, date picker and a
          // button for saving the edits.
          if (todo.isEditing === true) {
            const textbox = document.createElement('input');
            textbox.type = 'text';
            textbox.style ='flex: 1; height: 32px; width: 140px; font-size: 14px; padding-bottom: 2px; font-family: Raleway';
            textbox.placeholder ='Edit Your Todo Here!'
            textbox.id = 'edit-title-' + todo.id;
            element.appendChild(textbox);

            const datePicker = document.createElement('input');
            datePicker.type = 'date';
            datePicker.style = 'flex: 1; height: 35px; width: 60px; font-size: 12px; font-family: Raleway; margin-left: 5px;';
            datePicker.id = 'edit-date-' + todo.id;
            element.appendChild(datePicker);

            const buttondiv = document.createElement('div');

            const updateButton = document.createElement('button');
            updateButton.innerText = 'Update';
            updateButton.style = 'padding-right: 7px; padding-left: 7px'
            updateButton.dataset.todoId = todo.id;
            updateButton.onclick = onUpdate;
            buttondiv.appendChild(updateButton);

            const cancelButton = document.createElement('button');
            cancelButton.innerText = 'Cancel';
            cancelButton.style = 'margin-left: 10px;'
            cancelButton.onclick = onCancel;
            buttondiv.appendChild(cancelButton);

            element.appendChild(buttondiv);
            element.style = 'margin-top: 10px; display: flex';
          } else {
            const contentdiv = document.createElement('div');
            contentdiv.innerText = todo.content;
            contentdiv.style = 'flex: 1;';
            element.appendChild(contentdiv);

            const datediv = document.createElement('div');
            datediv.innerText = 'Due: ' + todo.dueDate;
            datediv.style = "margin-left: 6px";
            element.appendChild(datediv);

            const buttondiv = document.createElement('div');
            buttondiv.style = 'align-items: flex-end;'

            const editButton = document.createElement('button');
            editButton.innerText = 'Edit';
            editButton.style = 'margin-left: 12px';
            editButton.onclick = onEdit;
            editButton.dataset.todoId = todo.id;
            buttondiv.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete';
            deleteButton.style = 'margin-left: 12px';
            deleteButton.onclick = onDelete;
            deleteButton.id = todo.id;

            buttondiv.appendChild(deleteButton);
            buttondiv.style = 'align-items: flex-end;'

            element.appendChild(buttondiv);
            element.style = 'display: flex; margin-top: 10px; align-items: center';
          }

            const todoList = document.getElementById('todo-list');
            todoList.appendChild(element);
          
        });
      }

      function updateTodo(todoId, newTitle, newDate) {
        savedTodos.forEach(function (todo) {
          if (todo.id === todoId) {
            updatedTodo = {
            content: newTitle,
            due_date: newDate,
            id: todoId
            };
            json_updatedTodo = JSON.stringify(updatedTodo);
            $.ajax({
              url: "http://127.0.0.1:5000/updatetodo",
              data: json_updatedTodo,
              type: 'POST',
              contentType: 'application/json'
            }).done(function (res){
              alert(res.msg);
              render(username_data);
            })


            todo.isEditing = false;
          }
        });
      }


      //Controller
      function onCreate() {
        const textbox = document.getElementById('todo-title');
        const title = textbox.value;

        const datePicker= document.getElementById('date-picker');
        const dueDate = datePicker.value;

        if (title === '' || dueDate === ''){
          alert('Please don\'t leave anything blank!')
        } else {
        createTodo(title, dueDate);
        }
      }

      function onDelete(event) {
        const deleteButton = event.target;
        const idToDelete = deleteButton.id;

        removeTodo(idToDelete);
      }

      function onEdit(event) {
        const editButton = event.target;
        const todoId = editButton.dataset.todoId;

        setEditing(todoId);
      }

      function onUpdate(event) {
        const updateButton = event.target;
        const todoId = updateButton.dataset.todoId;

        const textbox = document.getElementById('edit-title-' + todoId);
        const newTitle = textbox.value;

        const datePicker = document.getElementById('edit-date-' + todoId);
        const newDate = datePicker.value;

        if (newTitle === '' || newDate === ''){
          alert('Please don\'t leave anything blank! Simply refreshing the browswer if you want to cancel updating')
        } else {
        updateTodo(todoId, newTitle, newDate);
        }
      }
      

      function onCancel (){
        render(username_data);
      }

      // View
      function render(username_data) {
      $.ajax ({
        url: 'http://127.0.0.1:5000/mainpage',
        data: username_data,
        type: 'GET'
      }).done(function(res) {
        savedTodos = res.data;

        document.getElementById('todo-list').innerHTML = '';

        savedTodos.forEach(function (todo) {
          const element = document.createElement('div');
          
  
          const contentdiv = document.createElement('div');
          contentdiv.innerText = todo.content;
          contentdiv.style = 'flex: 1;';
          element.appendChild(contentdiv);

          const datediv = document.createElement('div');
          datediv.innerText = 'Due: ' + todo.dueDate;
          datediv.style = "margin-left: 6px";
          element.appendChild(datediv);

          const buttondiv = document.createElement('div');

          const editButton = document.createElement('button');
          editButton.innerText = 'Edit';
          editButton.style = 'margin-left: 12px';
          editButton.onclick = onEdit;
          editButton.dataset.todoId = todo.id;
          buttondiv.appendChild(editButton);

          const deleteButton = document.createElement('button');
          deleteButton.innerText = 'Delete';
          deleteButton.style = 'margin-left: 12px';
          deleteButton.onclick = onDelete;
          deleteButton.id = todo.id;

          buttondiv.appendChild(deleteButton);
          buttondiv.style = 'align-items: flex-end;'

          element.appendChild(buttondiv);
          element.style = 'display: flex; margin-top: 10px; align-items: center';


          const todoList = document.getElementById('todo-list');
          todoList.appendChild(element);
        });
      });
      };

      render(username_data);
       



