const BEPage = (str1, str2, str3, str4, str5, str6, str7, str8) => `
<div class="BEP-title">
			<p class="h1 BEP-h1">BE Cheat Sheet</p>
		</div>
		<div class="BEP-cardGroup">
			<div class="card text-center BEP-container">
				<div class="card-header BEP-cardHeader">
					<p>난이도 : ${str1}</p>
					<img src="./assets/dist/images/empty-star.png" class="BEP-star BEP-star1" alt="빈 별">
				</div>
				<div class="card-body BEP-cardBody">
					<div class="BEP-cardContent">
						<p class="card-text">
							${str2}
						</p>
						<h5 class="card-title BEP-subHeading">질문 의도</h5>
						<hr class="BEP-hr">
						<p class="card-text">
							${str3}
						</p>
						<h5 class="card-title BEP-subHeading">만점 답안</h5>
						<hr class="BEP-hr">
						<p class="card-text">
							${str4}
						</p>
					</div>
				</div>
			</div>
			<div class="card text-center BEP-container">
				<div class="card-header BEP-cardHeader">
					<p>난이도 : ${str5}</p>
					<img src="./assets/dist/images/empty-star.png" class="BEP-star BEP-star2" alt="빈 별">
				</div>
				<div class="card-body BEP-cardBody">
					<div class="BEP-cardContent">
						<p class="card-text">
							${str6}
						</p>
						<h5 class="card-title BEP-subHeading">질문 의도</h5>
						<hr class="BEP-hr">
						<p class="card-text">
							${str7}
						</p>
						<h5 class="card-title BEP-subHeading">만점 답안</h5>
						<hr class="BEP-hr">
						<p class="card-text">
							${str8}
						</p>
					</div>
				</div>
			</div>
			<button class=BEP-arrowContainer>
				<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-chevron-right BEP-arrow" viewBox="0 0 16 16">
					<path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
				</svg>
			</button>
		</div>
`

const FEPage = (str1, str2, str3, str4, str5, str6, str7, str8) => `
<div class="FEP-title">
<p class="h1 FEP-h1">FE Cheat Sheet</p>
</div>
<div class="FEP-cardGroup">
<div class="card text-center FEP-container">
	<div class="card-header FEP-cardHeader">
		<p>난이도 : ${str1}</p>
		<img src="./assets/dist/images/empty-star.png" class="FEP-star FEP-star1" alt="빈 별">
	</div>
	<div class="card-body FEP-cardBody">
		<div class="FEP-cardContent">
			<p class="card-text">
				${str2}
			</p>
			<h5 class="card-title FEP-subHeading">질문 의도</h5>
			<hr class="FEP-hr">
			<p class="card-text">
				${str3}
			</p>
			<h5 class="card-title FEP-subHeading">만점 답안</h5>
			<hr class="FEP-hr">
			<p class="card-text">
				${str4}
			</p>
		</div>
	</div>
</div>
<div class="card text-center FEP-container">
	<div class="card-header FEP-cardHeader">
		<p>난이도 : ${str5}</p>
		<img src="./assets/dist/images/empty-star.png" class="FEP-star FEP-star2" alt="빈 별">
	</div>
	<div class="card-body FEP-cardBody">
		<div class="FEP-cardContent">
			<p class="card-text">
				${str6}
			</p>
			<h5 class="card-title FEP-subHeading">질문 의도</h5>
			<hr class="FEP-hr">
			<p class="card-text">
				${str7}
			</p>
			<h5 class="card-title FEP-subHeading">만점 답안</h5>
			<hr class="FEP-hr">
			<p class="card-text">
				${str8}
			</p>
		</div>
	</div>
</div>
<button class=FEP-arrowContainer>
	<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-chevron-right FEP-arrow" viewBox="0 0 16 16">
		<path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
	</svg>
</button>
</div>
`

const $navBE = document.querySelector('.nav-BE');
const $navFE = document.querySelector('.nav-FE');

// 클릭 시 BE Cheat Sheet 페이지로 이동
function BEPPageRender() {
	stopTimer();
	data[0]['content'] = "assistant는 백엔드 기술 면접 전문가이다.";
	data[1]['content'] = "백엔드 기술 면접 예시 질문 2개를 질문, 모범 답변, 질문 의도, 질문 난이도로 정리해서 한글로 답해줘. 질문 난이도는 상, 중, 하로 답변해주고, 오직 json 형태로만 응답주고, key 값으로는 question, answer, intent, difficulty로 응답해줘.";
	loadingWithMask();
	fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
		redirect: "follow",
	}).then((res) => res.json()
	).then((res) => res.choices[0].message.content
	).then((res) => {
		const queList = res.split('}');
		const reformList = []
		queList.forEach(que => {
			queInfo = que.split("\n")
			if (queInfo.length != 1) {
				const queReform = {};
				queInfo.forEach(info => {
					if (info.includes(":")) {
						console.log(info);
						queContent = info.split(":")[1].trim().replaceAll('"', '').replaceAll(',', '');
						if (info.includes("question")) {
							queReform['question'] = queContent;
						} else if(info.includes("answer")){
							queReform['perfectAnswer'] = queContent;
						} else if(info.includes("intent")){
							queReform['intent'] = queContent;
						} else if(info.includes("difficulty")){
							queReform['difficulty'] = queContent;
						}
					}
				})
				queReform['part'] = 'BackEnd';
				reformList.push(queReform);
			}
		})
		closeLoadingWithMask();
		pageRender(BEPage(reformList[0]['difficulty'], reformList[0]['question'], reformList[0]['intent'], reformList[0]['perfectAnswer'], reformList[1]['difficulty'], reformList[1]['question'], reformList[1]['intent'], reformList[1]['perfectAnswer']));

		// 즐겨찾기 별 변경
		const $BEPStar1 = $main.querySelector('.BEP-star1');
		$BEPStar1.addEventListener('click', () => {
			const starSrc = $BEPStar1.getAttribute('src')
			if (starSrc.includes('empty-star.png')) {
				$BEPStar1.setAttribute('src', "./assets/dist/images/star.png");
				favoriteQuestion.push(reformList[0]);
			}
			else {
				$BEPStar1.setAttribute('src', "./assets/dist/images/empty-star.png");
				favoriteQuestion = favoriteQuestion.filter((favQue) => favQue['question'] !== reformList[0]['question'])
			}
		})
		const $BEPStar2 = $main.querySelector('.BEP-star2');
		$BEPStar2.addEventListener('click', () => {
			const starSrc = $BEPStar2.getAttribute('src')
			if (starSrc.includes('empty-star.png')) {
				$BEPStar2.setAttribute('src', "./assets/dist/images/star.png");
				favoriteQuestion.push(reformList[1]);
			}
			else {
				$BEPStar2.setAttribute('src', "./assets/dist/images/empty-star.png");
				favoriteQuestion = favoriteQuestion.filter((favQue) => favQue['question'] !== reformList[1]['question'])
			}
		})
		// 화살표 클릭 시 BEPage 다시 렌더링
		const $BEPArrowContainer = $main.querySelector('.BEP-arrowContainer');
		pageRenderByButton($BEPArrowContainer, BEPPageRender);
	}).catch((err) => {
		console.log(err);
	})
};
pageRenderByButton($navBE, BEPPageRender);

// 클릭 시 FE Cheat Sheet 페이지로 이동
function FEPageRender() {
	stopTimer();
	data[0]['content'] = "assistant는 프론트엔드 기술 면접 전문가이다.";
	data[1]['content'] = "프론트엔드 기술 면접 예시 질문 2개를 질문, 모범 답변, 질문 의도, 질문 난이도로 정리해서 한글로 답해줘. 질문 난이도는 상, 중, 하로 답변해주고, 오직 json 형태로만 응답주고, key 값으로는 question, answer, intent, difficulty로 응답해줘.";
	loadingWithMask();
	fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
		redirect: "follow",
	}).then((res) => res.json()
	).then((res) => res.choices[0].message.content
	).then((res) => {
		const queList = res.split('}');
		const reformList = []
		queList.forEach(que => {
			queInfo = que.split("\n")
			if (queInfo.length != 1) {
				const queReform = {};
				queInfo.forEach(info => {
					if (info.includes(":")) {
						queContent = info.split(":")[1].trim().replaceAll('"', '').replaceAll(',', '');
						if (info.includes("question")) {
							queReform['question'] = queContent;
						} else if(info.includes("answer")){
							queReform['perfectAnswer'] = queContent;
						} else if(info.includes("intent")){
							queReform['intent'] = queContent;
						} else if(info.includes("difficulty")){
							queReform['difficulty'] = queContent;
						}
					}
				})
				queReform['part'] = 'FrontEnd';
				reformList.push(queReform);
			}
		})
		closeLoadingWithMask();
		pageRender(FEPage(reformList[0]['difficulty'], reformList[0]['question'], reformList[0]['intent'], reformList[0]['perfectAnswer'], reformList[1]['difficulty'], reformList[1]['question'], reformList[1]['intent'], reformList[1]['perfectAnswer']));

		// 즐겨찾기 별 변경
		const $FEPStar1 = $main.querySelector('.FEP-star1');
		$FEPStar1.addEventListener('click', () => {
			const starSrc = $FEPStar1.getAttribute('src')
			if (starSrc.includes('empty-star.png')) {
				$FEPStar1.setAttribute('src', "./assets/dist/images/star.png");
				favoriteQuestion.push(reformList[0]);
			}
			else {
				$FEPStar1.setAttribute('src', "./assets/dist/images/empty-star.png");
				favoriteQuestion = favoriteQuestion.filter((favQue) => favQue['question'] !== reformList[0]['question'])
			}
		})
		const $FEPStar2 = $main.querySelector('.FEP-star2');
		$FEPStar2.addEventListener('click', () => {
			const starSrc = $FEPStar2.getAttribute('src')
			if (starSrc.includes('empty-star.png')) {
				$FEPStar2.setAttribute('src', "./assets/dist/images/star.png");
				favoriteQuestion.push(reformList[1]);
			}
			else {
				$FEPStar2.setAttribute('src', "./assets/dist/images/empty-star.png");
				favoriteQuestion = favoriteQuestion.filter((favQue) => favQue['question'] !== reformList[1]['question'])
			}
		})
		// 화살표 클릭 시 FEPage 다시 렌더링
		const $FEPArrowContainer = $main.querySelector('.FEP-arrowContainer');
		pageRenderByButton($FEPArrowContainer, FEPageRender);
	}).catch((err) => {
		console.log(err);
	})
};
pageRenderByButton($navFE, FEPageRender);