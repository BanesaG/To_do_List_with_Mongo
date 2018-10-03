
// jQuery handler that runs the encapsulated code when the page is ready.
$(() => {
    $(document).ready(() => {
        render();
    });

    const renderTables = (outputElement, dataList) => {
        // Loop through and display each of the customers

        dataList.forEach(e => {
            // Get a reference to the tableList element and populate it with tables
            const output = $(outputElement);
            // Then display the fields in the HTML (Section Name, Date, URL)
            const listItem = $(`<li class='list-todo' id='${e.task_id}'>`);
            let checkedBoolean;
            (e.compeleted === 'false') ? checkedBoolean = false : checkedBoolean = true;
            listItem.append(
                $("<input type='checkbox' id='checkboxId'>").prop("checked", checkedBoolean),
                $("<p>").text(e.task),
                $("<button style='font-size:22px' class='fas fa-times' id='removeBtn'>").text('')
            );

            output.append(listItem);
        });

    }

    const render = function () {
        $('#inputTxtId').val('');
        // The AJAX function uses the URL of our API to GET the data associated with it (initially set to localhost)
        $.ajax({ url: "/api/todolist", method: "GET" })
            .then((todoList) => {
                renderTables('#todo', todoList);
            });
    }

    // This function resets all of the data in our tables. This is intended to let you restart a demo.
    const addNewTask = function () {
        event.preventDefault();
        newTask = {
            task_id: '0',
            task: $('#inputTxtId').val(),
            compeleted: 'false'
        }

        switch (true) {
            case ((newTask.task).trim() !== ''):
                // Clear the tables on the server and then empty the elements on the client
                $.ajax({ url: "/api/addNewTask", method: "POST", data: newTask }).then(() => {
                    $("#inputTxtId").empty();
                    $("#todo").empty();
                    render();
                });
                break;
            default:
                alert('fill task on text place then add please');
                break;
        }
    }

    $("#addBtn").on("click", addNewTask);

    const removeTask = function () {
        event.preventDefault();

        taskDel = {
            task_id: String($(this).parent().attr('id'))
        }

        $.ajax({ url: "/api/removeTask", method: "DELETE", data: taskDel }).then(function () {
            $("#todo").empty();
            render();
        });
    }

    $('#todo').on('click', '#removeBtn', removeTask);

    const updateTask = function () {
        event.preventDefault();

        taskDel = {
            task_id: String($(this).parent().attr('id')),
            compeleted: String($(this).prop("checked"))
        }

        $.ajax({ url: "/api/updateTask", method: "PUT", data: taskDel }).then(function () {
            $("#todo").empty();
            render();
        });
    }

    $('#todo').on('click', '#checkboxId', updateTask);



// create "close" button and append it to each list item
const myNodelist = document.getElementsByTagName("LI");
const i;
for (i = 0; i < myNodelist.length; i++) {
  const span = document.createElement("SPAN");
  const txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
const close = document.getElementsByClassName("close");
const i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    const div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
const list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
  const li = document.createElement("li");
  const inputValue = document.getElementById("myInput").value;
  const t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  const span = document.createElement("SPAN");
  const txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      const div = this.parentElement;
      div.style.display = "none";
    }
  }
}