import { useContext, useRef, useState } from "react";
import { NameContext } from "./App";

export default function TodoApp() {
	const { name } = useContext(NameContext);
	const inputRef = useRef();
	const [todos, setTodos] = useState([]);

	function addTodo(e) {
		e.preventDefault();
		const text = inputRef.current.value;
		const nextTodos = [...todos];
		nextTodos.push({
			text,
			done: false,
		});
		setTodos(nextTodos);
		inputRef.current.value = "";
	}

	function toggleDone(index) {
		const nextTodos = [...todos];
		nextTodos[index].done = !nextTodos[index].done;
		setTodos(nextTodos);
	}

	function editTodo(index) {
		const text = prompt("Edit todo", todos[index].text);
		if (!text?.trim()) return;
		const nextTodos = [...todos];
		nextTodos[index].text = text;
		setTodos(nextTodos);
	}

	function deleteTodo(index) {
		const nextTodos = [];
		for (let i = 0; i < todos.length; i++) {
			if (i !== index) {
				nextTodos.push(todos[i]);
			}
		}
		setTodos(nextTodos);
	}

	return (
		<main>
			<h1>📝 Get things done, {name == "" ? "???" : name}!</h1>

			<form onSubmit={addTodo}>
				<input
					ref={inputRef}
					placeholder="Task"
				/>
			</form>

			<ol>
				{todos.map((todo, i) => (
					<li key={i}>
						<span onClick={() => toggleDone(i)}>
							{todo.done ? <s>{todo.text}</s> : todo.text}
						</span>

						<button onClick={() => editTodo(i)}>
							Edit
						</button>

						<button onClick={() => deleteTodo(i)}>
							Delete
						</button>
					</li>
				))}
			</ol>
		</main>
	);
}