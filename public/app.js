document.addEventListener('click', (event) => {
  if (event.target.dataset.type === 'remove') {
    const id = event.target.dataset.id;
    remove(id).then(() => {
      event.target.closest('li').remove();
    });
  }
  if (event.target.dataset.type === 'edit') {
    const id = event.target.dataset.id;

    const oldEditForm = document.querySelector('[data-editForm]');
    if (oldEditForm) {
      oldEditForm.remove();
    }

    const closestLi = event.target.closest('li');
    closestLi.insertAdjacentHTML(
      'afterend',
      `
      <div class="d-flex justify-content-between" data-editForm>
        <input type="text" class="form-control" data-newTitle/>
        <div class="d-flex justify-content-between">
          <button class="btn btn-primary" data-save>Save</button>
          <button class="btn btn-danger" data-cancel>Cancel</button>
        </div>
      </div>
      `
    );
    document.querySelector('[data-cancel]').addEventListener('click', () => {
      document.querySelector('[data-editForm]').remove();
    });
    document
      .querySelector('[data-save]')
      .addEventListener('click', async () => {
        const newTitle = document.querySelector('[data-newTitle]').value;
        await edit(id, newTitle);
        document.querySelector(`[data-noteIdTitle="${id}"]`).textContent =
          newTitle;
      });
  }
});

const remove = async (id) => {
  return await fetch(`/${id}`, {
    method: 'DELETE',
  });
};

const edit = async (id, newTitle) => {
  if (newTitle) {
    return await fetch(`/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: newTitle }),
    });
  }
};
