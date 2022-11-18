const questions = [
	{
		question: "Какой язык работает в браузере?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
	},
	{
		question: "Что означает CSS?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
	},
	{
		question: "Что означает HTML?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "В каком году был создан JavaScript?",
		answers: ["1996", "1995", "1994", "все ответы неверные"],
		correct: 2,
	},
];


// Находим элементы
// header
const headerContainer = document.querySelector('#header');

//body
const listContainer = document.querySelector('#list');

//кнопка "Ответить"
const submitBtn = document.querySelector('#submit');


//Переменные игры
let score = 0; // Кол-во правильных ответов

let questionIndex = 0; // текущий вопрос


clearPage();
showQuestion();

// Запустить функцкию "checkAnswer" по клику "submitBtn"
submitBtn.onclick = checkAnswer;

// Очистка разметки 
function clearPage(){
	headerContainer.innerHTML = '';
	listContainer.innerHTML = '';
}


//Отобразить вопросы
function showQuestion(){

	//Вопрос (из массива)
	questions[questionIndex]['question'];

	//Создаем шаблон для отображения в разметке
	const headerTemplate = `<h2 class="title">%title%</h2>`;

	//Ищем шаблон и заменяем его на вопрос из массива
	const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);

	//Отображаем вопрос из масива в разметке с помощью шаблона
	headerContainer.innerHTML = title;






	// Варианты ответов
	let answerNumber = 1;
	// Перебираем в массиве ответы
	for (answerText of questions[questionIndex]['answers']){
		console.log(answerNumber, answerText)

		//Созданм шаблон для разметки
		const questionTemplate = `<li>
										<label>
											<input value="%number%" type="radio" class="answer" name="answer" />
											<span>%answer%</span>
										</label>
									</li>
								`;
		// Ищем шаблон и заменяем его на ответ из массива. // То же самое делаем но с тгьиук
		let answerHTML = questionTemplate
			.replace('%answer%', answerText)
			.replace('%number%', answerNumber);

		
		//Отображаем ответы в разметке
		listContainer.innerHTML = listContainer.innerHTML + answerHTML;

		answerNumber++;

		
	}
}

//Выбор ответа
function checkAnswer(){
	// создаем переменую - что выбрана радиокнопка
	const checkRadio = listContainer.querySelector('input[type="radio"]:checked')

	//НЕ выбрана радиокнопка?
	if (!checkRadio){
		submitBtn.blur();
		alert('Выберите ответ!')
		return
	}

	const userAnswer = parseInt(checkRadio.value);
	
	//Если ответил верно - увеличивает счет
	const correctAnswer = questions[questionIndex]['correct']
	if (userAnswer === correctAnswer){
		score = score + 1;
	}

	if (questionIndex !== (questions.length - 1)){
		//-это не последний вопрос
		questionIndex++;
		clearPage();
		showQuestion();
		return;
	} else{
		// -это послендий вопрос
		clearPage();
		showResults();
	}
}

//Результаты
function showResults(){

	const resultTemplate = `
				<h2 class="title">%title%</h2>
				<h3 class="summary">%message%</h3>
				<p class="result">%result%</p>
	`

	let title;
	let message;

	// Если ответили верно на все вопросы
	if (score === questions.length){
		title = 'Поздравляем!😀';
		message = 'Вы ответили верно на все вопросы!😊';
	//Если ответи на больше половины
	}else if ((score * 100) / questions.length >= 50){
		title = 'Неплохо!😉';
		message = 'Больше половины верно!😊';
	}else  {
		title = 'Стоит постараться!';
		message = 'Меньше половины ответов верны!😔';
	}

	let result = `${score} из ${questions.length}`;
	
	//Финальный ответ, подставляем данные в шаблон
	const finalMessage = resultTemplate
				.replace('%title%', title)
				.replace('%message%', message)
				.replace('%result%', result);
	
	headerContainer.innerHTML = finalMessage;

	//Меняем кнопка на "Играть снова"
	submitBtn.innerHTML = 'Начать заново';
	submitBtn.onclick = function(){
		//Перезапустит обновление страницы
		history.go()
	};
}