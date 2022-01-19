document.addEventListener('click', (event) => {
  if (event.target.dataset.type === 'remove') {
    const id = event.target.dataset.id;
    remove(id).then(() => {
      event.target.closest('li').remove();
    });
  }
  if (event.target.dataset.type === 'edit') {
    const id = event.target.dataset.id;
    edit(id);
  }
});

const remove = async (id) => {
  return await fetch(`/${id}`, {
    method: 'DELETE',
  });
};

const edit = async (id) => {
  const newTitle = prompt('Enter new Title');
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
