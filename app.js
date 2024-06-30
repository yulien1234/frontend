const apiUrl = 'http://localhost:3000/api/movies';

$(document).ready(function() {
    loadTasks();

    $('#taskForm').submit(function(event) {
        event.preventDefault();
        const taskTitle = $('#taskTitle').val();
        const newTask = {
            title: taskTitle
        };
        addTask(newTask);
    });
});

function loadTasks() {
    $.get(apiUrl, function(tasks) {
        $('#taskList').empty();
        tasks.forEach(task => {
            $('#taskList').append(`
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <span>${task.title}</span>
                    <div>
                        <button class="btn btn-success btn-sm mr-2" onclick="completeTask(${task.id})">Complete</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteTask(${task.id})">Delete</button>
                    </div>
                </li>
            `);
        });
    });
}

function addTask(task) {
    $.post(apiUrl, task, function(data) {
        loadTasks();
        $('#taskForm')[0].reset();
    });
}

function completeTask(id) {
    $.ajax({
        url: `${apiUrl}/${id}`,
        type: 'PUT',
        data: JSON.stringify({ completed: true }),
        contentType: 'application/json',
        success: function() {
            loadTasks();
        }
    });
}

function deleteTask(id) {
    $.ajax({
        url: `${apiUrl}/${id}`,
        type: 'DELETE',
        success: function() {
            loadTasks();
        }
    });
}
