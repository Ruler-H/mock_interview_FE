const firstPage = `
<p class="card-group-title">여러분의 경력은?</p>
<div class="card-container">
	<div class="card fP-card">
		<img src="./assets/dist/images/ormi.jpg" alt="주니어 개발자 이미지" class="card-img">
		<div class="card-body fP-cardBody">
			<h5 class="card-title fP-cardTitle">주니어 개발자</h5>
			<button data-title="Junior" class="btn btn-primary career-select-btn">선택하기</button>
		</div>
	</div>
	<div class="card career-second-card">
		<img src="./assets/dist/images/ormi.jpg" alt="미드 레벨 개발자 이미지" class="card-img">
		<div class="card-body fP-cardBody">
			<h5 class="card-title fP-cardTitle">미드 레벨 개발자</h5>
			<button data-title="Middle Level" class="btn btn-primary career-select-btn">선택하기</button>
		</div>
	</div>
	<div class="card fP-card fP-thirdCard">
		<img src="./assets/dist/images/ormi.jpg" alt="시니어 개발자 이미지" class="card-img">
		<div class="card-body fP-cardBody">
			<h5 class="card-title fP-cardTitle">시니어 개발자</h5>
			<button data-title="Senior" class="btn btn-primary career-select-btn">선택하기</button>
		</div>
	</div>
</div>
`;

const jobSelectPage = `
<p class="card-group-title">여러분의 분야는?</p>
<div class="card-container">
	<div class="card jSP-card">
		<img src="./assets/dist/images/ormi.jpg" alt="주니어 개발자 이미지" class="card-img">
		<div class="card-body jSP-cardBody">
			<h5 class="card-title jSP-cardTitle">백엔드 개발자</h5>
			<button data-title="BackEnd" class="btn btn-primary job-select-btn">선택하기</button>
		</div>
	</div>
	<div class="card job-second-card jSP-card">
		<img src="./assets/dist/images/ormi.jpg" alt="주니어 개발자 이미지" class="card-img">
		<div class="card-body  jSP-cardBody">
			<h5 class="card-title jSP-cardTitle">프론트엔드 개발자</h5>
			<button data-title="FrontEnd" class="btn btn-primary job-select-btn">선택하기</button>
		</div>
	</div>
</div>
<button type="button" class="btn btn-secondary btn-lg pre-btn">이전으로</button>
`;

const interviewStartPage = (str1, str2) => `
<p class="start-desc">당신은 ${str1} ${str2} 개발자입니다.<br> 맞다면 모의 면접 시작 버튼을 눌러주세요.</p>
    
<div class="group-btn">
    <a type="button" class="btn btn-secondary btn-lg job-select-btn">이전으로</a>
    <a type="button" class="btn btn-primary btn-lg interview-start-btn">시작하기</a>
</div>
`;

const interviewPage = (str1, str2, str3) => `
<div class="card text-center iP-container">
	<div class="card-header iP-cardHeader">
		<p>난이도 : ${str1}</p>
		<p>${str2} / 10</p>
	</div>
	<div class="card-body">
		<div class="iP-question">
			<p class="card-text">
				${str3}
			</p>
		</div>
		<div class="input-group iP-inputGroup">
			<span class="input-group-text">답변</span>
			<textarea class="form-control iP-textarea" aria-label="With textarea"></textarea>
			<button class="btn btn-outline-secondary submit-btn" type="button"button-addon2">제출하기</button>
		</div>
	</div>
	<div class="card-footer text-muted iP-cardFooter">
		<span class=min>00</span>:<span class=sec>00</span>.<span class=micro>00</span>
	</div>
</div>
`;

const resultPage = (str1, str2, str3, str4) => `
<div class="card text-center rP-container">
<div class="card-header rP-cardHeader">
	<p>난이도 : ${str1}</p>
	<div class="rP-rightHeader">
		<p>${str2} / 10</p>
		<img src="./assets/dist/images/empty-star.png" class="rP-star" alt="빈 별">
	</div>
</div>
<div class="card-body rP-cardBody">
	<div class="rP-cardContent">
		<h5 class="card-title rP-questionPurpose">질문 의도</h5>
		<hr class="rP-hr">
		<p class="card-text rP-cardText">
			${str3}
		</p>
	</div>
	<div class="rP-cardContent">
		<h5 class="card-title rP-questionAnswer">만점 답안</h5>
		<hr class="rP-hr">
		<p class="card-text rP-cardText">
			${str4}
		</p>
	</div>
</div>
</div>
<a type="button" class="btn btn-primary btn-lg rP-nextBtn">다음 문제</a>
`;

const finalResultPage = `
<div class="card text-center fRP-container">
<div class="card-header fRP-cardHeader">
	<p>총점 : 8.5점</p>
</div>
<div class="card-body fRP-cardBody">
	<div class="fRP-cardContent">
		<h5 class="card-title fRP-redeem">보완점</h5>
		<hr class="fRP-hr">
		<p class="card-text">
			웹 통신에 대한 개념을 보완하여...
		</p>
	</div>
</div>
</div>
<a type="button" class="btn btn-primary btn-lg fRP-restartBtn">다시하기</a>
`

let questionLevel;
let questionField;
let timer_micro;
let timer_sec;
let timer_min;
let question_list;
let qIdx = 0;
let favorite_id;
const $navBrand = document.querySelector('.navbar-brand');
const $mockITV = document.querySelector('.mock-ITV');

// 모의 면접 타이머 정지
function stopTimer() {
	clearInterval(timer_micro);
	clearInterval(timer_sec);
	clearInterval(timer_min);
}

// 메인 화면, 경력 선택 페이지 렌더링
function firstPageRender() {
	$.ajax({
		type: "GET",
		url: url + "account/status/",
		headers: {
			'Authorization': `Bearer ${accessToken}`,
		},
		success: function(data){
			stopTimer();
			pageRender(firstPage);

			const $careerSelectBtn = $main.querySelectorAll('.career-select-btn');
			$careerSelectBtn.forEach((btn) => {
				pageRenderByButton(btn, () => {
					jobSelectPageRender();
					questionLevel = btn.dataset['title'];
				});
			});
		},
		error: function(error) {
			loginPageLoad();
		}
	});
	
	
};
pageRenderByButton($navBrand, firstPageRender)
pageRenderByButton($mockITV, firstPageRender)

// 직무 선택 페이지 렌더링 메서드
function jobSelectPageRender() {

	pageRender(jobSelectPage);

	const $jobSelectBtn = $main.querySelectorAll('.job-select-btn');
	$jobSelectBtn.forEach((btn) => {
		pageRenderByButton(btn, () => {
			questionField = btn.dataset['title'];
			interviewStartPageRender();
		});
	})

	const $homeBtn = $main.querySelector('.pre-btn')
	pageRenderByButton($homeBtn, firstPageRender);
}

// 모의 면접 시작 페이지 렌더링 메서드
function interviewStartPageRender() {
	pageRender(interviewStartPage(questionField, questionLevel));
	qIdx = 0;

	const $jobSelectBtns = $main.querySelectorAll('.job-select-btn');
	$jobSelectBtns.forEach((btn) => {
		pageRenderByButton(btn, jobSelectPageRender);
	});

	const $interViewStartBtn = $main.querySelector('.interview-start-btn');
	$interViewStartBtn.addEventListener('click', () => {
		const data = {
			"career": questionLevel,
			"field": questionField,
		}
		loadingWithMask();
		$.ajax({
			type: "POST",
			url: url + "interview/question/",
			headers: {
				"Content-Type": "application/json",
				'Authorization': `Bearer ${accessToken}`,
			},
			data: JSON.stringify(data),
			success: function(data){
				closeLoadingWithMask();
				question_list = data["question_list"];
				interviewPageRender();	
			},
			error: function(err) {
				closeLoadingWithMask();
				console.log(err);
			}
		});
	})
}

// 모의 면접 문제 페이지 렌더링 메서드
function interviewPageRender() {
	pageRender(interviewPage(question_list[qIdx]['difficulty'], qIdx + 1, question_list[qIdx]['question']));

	let micro = parseInt(document.querySelector(".micro").innerText);
	let sec = parseInt(document.querySelector(".sec").innerText);
	let min = parseInt(document.querySelector(".min").innerText);

	timer_micro = setInterval(() => {
		micro++;
		if (micro == 100) {
			micro = "00";
		} else if (micro < 10) {
			micro = "0" + micro;
		}
		document.querySelector(".micro").innerText = micro;
	}, 10);

	//start seconds
	timer_sec = setInterval(() => {
		sec++;
		if (sec == 60) {
			sec = "00";
		} else if (sec < 10) {
			sec = "0" + sec;
		}
		document.querySelector(".sec").innerText = sec;
	}, 1000);

	//start minutes
	timer_min = setInterval(() => {
		min++;

		if (min == 60) {
			min = 0;
		} else if (min < 10) {
			min = "0" + min;
		}

		document.querySelector(".min").innerText = min;
	}, 60000);

	const $submitBtn = $main.querySelector('.submit-btn');
	pageRenderByButton($submitBtn, () => {
		stopTimer();
		if (qIdx === 10){
			stopTimer();
		}else{
			stopTimer();
			question_list[qIdx]["answer"] = $main.querySelector('.iP-textarea').value;
		}
		resultPageRender();
	});
	qIdx += 1;
}

// 모의 면접 단위 결과 페이지 렌더링
function resultPageRender() {
	pageRender(resultPage(question_list[question_list.length - 1]['difficulty'], qIdx, question_list[question_list.length - 1]['intent'], question_list[question_list.length - 1]['perfectAnswer']));

	// 즐겨찾기 별 변경
	const $rPStar = $main.querySelector('.rP-star');
	$rPStar.addEventListener('click', () => {
		starSrc = $rPStar.getAttribute('src')
		if (starSrc.includes('empty-star.png')) {
			$rPStar.setAttribute('src', "./assets/dist/images/star.png");
			question = question_list[question_list.length - 1]
			const data={
                'grade':question['difficulty'],
                'field':questionField,
                'question':question['question'],
                'intent':question['intent'],
                'model_answer':question['perfectAnswer'],
            }
			$.ajax({
				type: "POST",
				url: url + "interview/favorite/",
				headers: {
					"Content-Type": "application/json",
					'Authorization': `Bearer ${accessToken}`,
				},
				data: JSON.stringify(data),
				success: function(data){
					favorite_id = data['pk'];
				},
				error: function(err) {
					console.log(err);
				}
			});
		}
		else {
			$rPStar.setAttribute('src', "./assets/dist/images/empty-star.png");
			$.ajax({
				type: "DELETE",
				url: url + "interview/favorite/" + favorite_id,
				headers: {
					"Content-Type": "application/json",
					'Authorization': `Bearer ${accessToken}`,
				},
				error: function(err) {
					console.log(err);
				}
			})
		}
	});

	// 다음 문제 버튼
	const $nextBtn = $main.querySelector('.rP-nextBtn')
	if (qIdx === 10) {
		$nextBtn.innerText = "다시하기"
		pageRenderByButton($nextBtn, firstPageRender);
	} else {
		pageRenderByButton($nextBtn, interviewPageRender);
	}
}

firstPageRender();