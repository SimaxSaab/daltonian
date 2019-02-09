var timer,              //  игровой таймер
    numOfSuccess = 0,   //  количество правильных ответов
    numOfAnswers = 6,   //  всего ответов +1
	elem,
    swither;            //  защита от многократных попыток выбора ответа
	
window.onload = run;
	
function run()
	{
		elem = document.querySelector('a');		//	выбрать ссылку
		elem.addEventListener('click',Main);	//	и пповесить на неё слушатель
		elem.style.color = 'blue';				//	а также покрасить в link
	}
	
	function Main()
		{
			numOfAnswers--;                 // 5 заданий
			swither = 0;
			seeTheQuest(numOfAnswers);      // показать очередное задание
			$('#timer').text(6);            //  инит таймера
			cycleGame();                    //  запустить игровой цикл
		}
        
	function cycleGame()
		{
			var time = Number($('#timer').text());  //  уменьшить
			time--;                                 //  таймер
			$('#timer').text(time);                 //  и показать его
			if (numOfAnswers){                                                  //  если есть вопросы
				if (time!=-1)                                   //  и если не закончилось время
					timer = setTimeout("cycleGame()",1000);     //  то крутить цикл
				else
				{
					clearTimeout(timer);                        //  иначе обнулить его
					Main();                                     //  и показать следующий вопрос
				}
			}
			else
			{
				$('#timer').text('');       //  таймер спрятать
				numOfAnswers=6;             //  новый инит
				numOfSuccess = 0;           //  игры
			}
		}
        
	function seeTheQuest(k)     // функция с заданиями
		{
			switch (k)
			{
				case 5:
					$('#b').html('<a href="#" id="success" class="b">черный</a><br /><a href="#" class="b">синий</a><br /><a href="#" class="b">красный</a>');
					break;
				case 4:
					$('#b').html('<a href="#" class="g">черный</a><br /><a href="#" id="success" class="bl">синий</a><br /><a href="#" class="b">зеленый</a>');
					break;
				case 3:
					$('#b').html('<a href="#" class="g">красный</a><br /><a href="#" class="b">синий</a><br /><a href="#" id="success" class="g">зеленый</a>');
					break;
				case 2:
					$('#b').html('<a href="#" id="success" class="bl">синий</a><br /><a href="#" class="b">красный</a><br /><a href="#" class="bl">зеленый</a>');
					break;
				case 1:
					$('#b').html('<a href="#" class="b">синий</a><br /><a href="#" id="success" class="r">красный</a><br /><a href="#" class="bl">черный</a>');
					break;
				default:    //  закончились вопросы
					resume(); //    вызвать подведение итогов
					break;
			}
			$('#success').one('click',success);
			$('a').one('click',state);      //  выбрать все тэги а и по клику вызвать state
		}
        
	function success()    //  функция подсчета правильных ответов
		{
			if (!swither){
                numOfSuccess++;
                swither = 1;
			}
		}
        
	function resume()   //  функция вывода результатов
		{
			$('#b').html('<p>Вы набрали ' + numOfSuccess + ' очков из 5</p><a href="#">Играть снова</a>');
			run();
		}
        
	function state(eventObj)
        {
			//(!swither) ? null :swither = 1;
			$('#success').unbind('click',success);	//	не давать засчитать ответ
			$(this).toggleClass('y');           //  высветить ответ желтым
			$('a').unbind('click',state);       //  и запретить повторный вызов этой функции
		}
