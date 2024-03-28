import { useEffect, useState } from "react";

function App() {
	const [name, setName] = useState("");
	const [age, setAge] = useState("");
	const [address, setAddress] = useState("");
	const [salary, setSalary] = useState("");
	const [bonus, setBonus] = useState("");
	const [penalties, setPenalties] = useState("");
	const [peoples, setPeoples] = useState(getFromStorage()?.length ? getFromStorage() : []);

	function add() {
		if (name && age && address && salary && bonus && penalties) {
			setPeoples(eski => [...eski, { name, age, address, bonus, salary, penalties }]);
			reset();
		}
	}

	function reset() {
		setName("");
		setAge("");
		setAddress("");
		setBonus("");
		setPenalties("");
		setSalary("");
	}

	useEffect(() => {
		addToStorage(peoples);
	}, [peoples]);

	function addToStorage(arr) {
		const jsondata = JSON.stringify(arr);
		localStorage.setItem("peoples", jsondata);
	}

	function getFromStorage() {
		return JSON.parse(localStorage.getItem("peoples"));
	}

	function del(index) {
			const filteredArr = peoples.filter((item, i) => i !== index);
			setPeoples(filteredArr);
	}

	return (
		<main>
			<h1 className='title'>Xodimlar ro'yxati</h1>
			<hr className='line' />

			<h3 className='subtitle'>Xodim qo'shish</h3>

			<div className='add'>
				<input
					onChange={e => {
						setName(e.target.value);
					}}
					type='text'
					value={name}
					placeholder='Mahsulot Nomi'
				/>
				<input
					type='number'
					placeholder='Mahsulot narxi'
					value={salary}
					onChange={e => {
						setSalary(e.target.value);
					}}
				/>
				<input
					type='number'
					placeholder='Saqlash muddati (Oy)'
					value={bonus}
					onChange={e => {
						setBonus(e.target.value);
					}}
				/>
				<input
					type='number'
					placeholder='Ishlab chiqarilgan sanasi'
					value={penalties}
					onChange={e => {
						setPenalties(e.target.value);
					}}
				/>
				<input
					type='number'
					placeholder='Srog tugash sanasi'
					value={age}
					onChange={e => {
						setAge(e.target.value);
					}}
				/>
				<input
					type='text'
					placeholder='Omborda bor mahsulotlar'
					value={address}
					onChange={e => {
						setAddress(e.target.value);
					}}
				/>

				<input type='button' data-type='submit' onClick={add} value="Qo'sish +" />
				<input type='button' data-type='reset' onClick={reset} value='Tozalash' />
			</div>

			<hr className='line' />

			<table>
				<thead>
					<tr>
						<th>TR</th>
						<th>F.I.SH</th>
						<th>Oylik maosh</th>
						<th>KPI uchun ustama</th>
						<th>KPI uchun Jarimalar</th>
						<th>Yoshi</th>
						<th>Manzil</th>
						<th></th>
					</tr>
				</thead>

				<tbody>
					{peoples.map((item, index) => {
						return (
							<tr key={index}>
								<td>{index + 1}</td>
								<td>{item.name}</td>
								<td>{item.salary}$</td>
								<td>{item.bonus}$</td>
								<td>{item.penalties}$</td>
								<td>{item.age}</td>
								<td>{item.address}</td>
								<td className='x-btn' onClick={() => del(index)}>
									X
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			{peoples.length === 0 && <h1 className='empty'>Ma'lumot mavjud emas </h1>}
		</main>
	);
}

export default App;
