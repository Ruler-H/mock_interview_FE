const OFMPage = (str1) => `
<div class="OFMP-title">
<p class="h1 OFMP-h1">Only For Me</p>
</div>
<div class="OFMP-cardGroup">
	${str1}
</div>
`

const $main = document.querySelector('.main');
const $navOFM = document.querySelector('.nav-OFM');
const accessToken = localStorage.getItem('accessToken');
const refreshToken = localStorage.getItem('refreshToken');
const url = "http://127.0.0.1:8000/";

function loadingWithMask(gif) {
	//화면의 높이와 너비를 구합니다.
	var maskHeight = $(document).height();
	var maskWidth  = window.document.body.clientWidth;

	//화면에 출력할 마스크를 설정해줍니다.
	var mask = "<div id='mask' style='position:absolute; z-index:9000; background-color:#000000; display:none; left:0; top:0;'></div>";
	var loadingSpinner = `
	<div class="spinner-border text-secondary" role="status" style='position: absolute; display: block; margin-top: 10rem;' id="loading-spinner">
		<span class="visually-hidden">Loading...</span>
	</div>
	`;

	//화면에 레이어 추가
	$('body')
			.append(mask)

	//마스크의 높이와 너비를 화면 것으로 만들어 전체 화면을 채웁니다.
	$('#mask').css({
					'width' : maskWidth,
					'height': maskHeight,
					'opacity' : '0.3'
	}); 

	//마스크 표시
	$('#mask').show();

	//로딩중 이미지 표시	
	$('main').append(loadingSpinner);
	$('#loading-spinner').show();
}

function closeLoadingWithMask() {
	$('#mask, #loadingSpinner').hide();
	$('#mask, #loadingSpinner').empty();  
}



// 클릭 시 Only For Me 페이지로 이동
function OFMRender() {
	stopTimer();
	let addHTML = ``;
	let starId = 0;
	const starIdList = [];
	const questionBox = [];
	favoriteQuestion.forEach(que => {
		addHTML += `
		<div class="card text-center OFMP-container">
			<div class="card-header OFMP-cardHeader">
				<p>난이도 : ${que['difficulty']}</p>
				<img src="./assets/dist/images/star.png" class="OFMP-star OFM-star${starId}" alt="별" data-que=${que['question']}>
			</div>
			<div class="card-body OFMP-cardBody">
				<div class="OFMP-cardContent">
					<p class="card-text">
						${que['question']}
					</p>
					<h5 class="card-title OFMP-subHeading">질문 의도</h5>
					<hr class="OFMP-hr">
					<p class="card-text">
						${que['intent']}
					</p>
					<h5 class="card-title OFMP-subHeading">만점 답안</h5>
					<hr class="OFMP-hr">
					<p class="card-text">
						${que['perfectAnswer']}
					</p>
				</div>
			</div>
		</div>
		`
		starIdList.push(".OFM-star" + starId);
		starId += 1
	});


	pageRender(OFMPage(addHTML));

	starIdList.forEach(id => {
		const $star = $main.querySelector(id);
		const queData = $star.dataset['que'];
		$star.addEventListener('click', () => {
			const starSrc = $star.getAttribute('src')
			if (starSrc.includes('empty-star.png')) {
				$star.setAttribute('src', "./assets/dist/images/star.png");
				for(let i = 0; i < questionBox.length; i++){
					if (questionBox[i]['question'] == queData){
						favoriteQuestion.push(questionBox.pop(i));
						break;
					}
				}
			}
			else {
				$star.setAttribute('src', "./assets/dist/images/empty-star.png");
				for(let i = 0; i < favoriteQuestion.length; i++){
					if (favoriteQuestion[i]['question'] == queData){
						questionBox.push(favoriteQuestion.pop(i));
						break;
					}
				}
			}
			console.log('questionBox', questionBox);
			console.log('favoriteQuestion', favoriteQuestion);
		})
	})
}
pageRenderByButton($navOFM, OFMRender);

// main 태그 안 page 렌더링
function pageRender(page) {
	$main.innerHTML = page;
}

// 버튼에 pageRender 메서드를 클릭 이벤트 할당
function pageRenderByButton(btn, renderFunction) {
	btn.addEventListener('click', () => {
		renderFunction();
	});
}

