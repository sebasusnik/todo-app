const d = document,
    table = d.querySelector(".crud-table"),
    form = d.querySelector(".crud-form"),
    title = d.querySelector(".crud-title"),
    template = d.getElementById("crud-template").content,
    fragment = d.createDocumentFragment();


// Get all tasks - GET / Read operation

const getAll = async () => {
    try {
        let res = await fetch("http://localhost:5555/tasks"),
            json = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText };

        console.log(json);
        json.forEach(el => {
            template.querySelector(".task").textContent = el.task;
            template.querySelector(".stage").textContent = el.stage;
            template.querySelector(".edit").dataset.id = el.id;
            template.querySelector(".edit").dataset.task = el.task;
            template.querySelector(".edit").dataset.stage = el.stage;
            template.querySelector(".delete").dataset.id = el.id;

            let clone = d.importNode(template, true);
            fragment.appendChild(clone);
        });

        table.querySelector("tbody").appendChild(fragment);
    } catch (err) {
        console.log(err)
        let message = err.statusText || "An error occurred";
        table.insertAdjacentHTML("afterend", `<p><b>Error ${err.status}: ${message}</b></p>`);
    }
}

d.addEventListener("DOMContentLoaded", getAll);

d.addEventListener("submit", async e => {
    if (e.target === form) {
        e.preventDefault();

        if (!e.target.id.value) {
            // Create a task - POST
            try {
                let options = {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json; charset=utf-8"
                    },
                    body: JSON.stringify({
                        task: e.target.task.value,
                        stage: e.target.stage.value
                    })
                },
                    res = await fetch("http://localhost:5555/tasks", options),
                    json = await res.json();

                if (!res.ok) throw { status: res.status, statusText: res.statusText };

                location.reload();
            } catch (err) {
                let message = err.statusText || "An error occurred";
                form.insertAdjacentHTML("afterend", `<p><b>Error ${err.status}: ${message}</b></p>`);
            }
        } else {
            // Update a task - PUT
            try {
                let options = {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json; charset=utf-8"
                    },
                    body: JSON.stringify({
                        task: e.target.task.value,
                        stage: e.target.stage.value
                    })
                },
                    res = await fetch(`http://localhost:5555/tasks/${e.target.id.value}`, options),
                    json = await res.json();

                if (!res.ok) throw { status: res.status, statusText: res.statusText };

                location.reload();
            } catch (err) {
                let message = err.statusText || "An error occurred";
                form.insertAdjacentHTML("afterend", `<p><b>Error ${err.status}: ${message}</b></p>`);
            }
        }
    }
});

d.addEventListener("click", async e => {
    if (e.target.matches(".edit")) {
        title.textContent = "Edit task";
        form.task.value = e.target.dataset.task;
        form.stage.value = e.target.dataset.stage;
        form.id.value = e.target.dataset.id;
    }

    if (e.target.matches(".delete")) {
        let isDelete = confirm(`Are you sure you want to delete task number ${e.target.dataset.id}?`);

        if (isDelete) {
            // Delete a task - DELETE
            try {
                let options = {
                    method: "DELETE",
                    headers: {
                        "Content-type": "application/json; charset=utf-8"
                    }
                },
                    res = await fetch(`http://localhost:5555/tasks/${e.target.dataset.id}`, options),
                    json = await res.json();

                if (!res.ok) throw { status: res.status, statusText: res.statusText };

                location.reload();
            } catch (err) {
                let message = err.statusText || "An error occurred";
                alert(`Error ${err.status}: ${message}`);
            }
        }
    }
})
