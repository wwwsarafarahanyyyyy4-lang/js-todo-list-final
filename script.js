// گرفتن المان‌ها 
const input = document.querySelector('#todo-input');
const addBtn = document.querySelector('#add-btn');
const list = document.querySelector('#todo-list');
const filterBtns = document.querySelectorAll('.filter-btn');

// آرایه‌ی اصلی
let todos = [];

// گرفتن اطلاعات در زمان لود صفحه
const getFromLocal = () => {
  const data = localStorage.getItem('todos');
  if (data) {
    todos = JSON.parse(data);
  }
};

//ذخیره اطلاعات  
const saveToLocal = () => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

// نمایش 
const renderTodos = (items) => {
  list.innerHTML = '';

  items.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'list-group-item';

    //completed
    if (todo.completed) {
      li.classList.add('completed');
    }

    const text = document.createElement('span');
    text.textContent = todo.text;

    const btnGroup = document.createElement('div');

    // دکمه done
    const doneBtn = document.createElement('button');
    doneBtn.textContent = 'Done';
    doneBtn.className = 'btn btn-success btn-sm me-2';
    doneBtn.addEventListener('click', () => {
      toggleTodo(todo.id);
    });

    // دکمه حذف
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'btn btn-danger btn-sm';
    deleteBtn.addEventListener('click', () => {
      deleteTodo(todo.id);
    });

    btnGroup.append(doneBtn, deleteBtn);
    li.append(text, btnGroup);
    list.appendChild(li);
  });
};

// اضافه کردن todo 
const addTodo = () => {
  // جلوگیری از اضافه شدن todo خالی
  if (input.value === '') {
    alert('لطفا یک متن وارد کنید');
    return;
  }

  // ساخت object 
  const newTodo = {
    id: Date.now(),
    text: input.value,
    completed: false
  };

  // اضافه کردن ا spread operato
  todos = [...todos, newTodo];

  saveToLocal();
  renderTodos(todos);

  // خالی کردن input
  input.value = '';
};

// تغییر وضعیت انجام شدن  map
const toggleTodo = (id) => {
  todos = todos.map(todo =>
    todo.id === id
      ? { ...todo, completed: !todo.completed }
      : todo
  );

  saveToLocal();
  renderTodos(todos);
};

// حذف 
const deleteTodo = (id) => {
  todos = todos.filter(todo => todo.id !== id);

  saveToLocal();
  renderTodos(todos);
};

// فیلتر کردن todo 
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // تغییر حالت active دکمه‌ها
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const type = btn.dataset.filter;

    if (type === 'all') {
      renderTodos(todos);
    } else if (type === 'active') {
      renderTodos(todos.filter(t => !t.completed));
    } else {
      renderTodos(todos.filter(t => t.completed));
    }
  });
});

// رویداد کلیک روی دکمه add
addBtn.addEventListener('click', addTodo);

// اضافه کردن todo با زدن Enter
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTodo();
  }
});

// اجرای اولیه برنامه
getFromLocal();
renderTodos(todos);
// sara phorghany farahany