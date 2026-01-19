document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.toggle-form').forEach(form => {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const taskCard = form.closest('.task-item');

            // Toggle completed клас
            taskCard.classList.toggle('completed');

            // Збираємо action та метод форми
            const url = form.action;
            const formData = new FormData(form);

            // Відправляємо fetch POST без перезавантаження
            fetch(url, {
                method: form.method,
                body: formData
            })
                .then(response => {
                    if (!response.ok) console.error('Помилка при toggle task');
                })
                .catch(err => console.error(err));
        });
    });

    document.querySelectorAll('.delete-form').forEach(form => {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const taskCard = form.closest('.task-item');

            // Плавне зникнення
            taskCard.classList.add('fade-out');

            const url = form.action;
            const formData = new FormData(form);

            setTimeout(() => {
                fetch(url, {
                    method: form.method,
                    body: formData
                })
                    .then(response => {
                        if (!response.ok) console.error('Помилка при delete task');
                        else taskCard.remove(); // видаляємо елемент з DOM
                    })
                    .catch(err => console.error(err));
            }, 300);
        });
    });
});