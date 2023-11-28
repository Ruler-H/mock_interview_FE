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
	loadingWithMask();
	$.ajax({
		method: "POST",
		url: url + "interview/field_question/",
		headers: {
			"Content-Type": "application/json",
			'Authorization': `Bearer ${accessToken}`,
		},
		data: JSON.stringify({"field":"BackEnd"}),
		success: function(data) {
			closeLoadingWithMask();
			const reformList = data['question_list']
			pageRender(BEPage(reformList[0]['difficulty'], reformList[0]['question'], reformList[0]['intent'], reformList[0]['perfectAnswer'], reformList[1]['difficulty'], reformList[1]['question'], reformList[1]['intent'], reformList[1]['perfectAnswer']));
			// 즐겨찾기 별 변경
			const $BEPStar1 = $main.querySelector('.BEP-star1');
			let star1Id;
			$BEPStar1.addEventListener('click', () => {
				const starSrc = $BEPStar1.getAttribute('src')
				if (starSrc.includes('empty-star.png')) {
					$BEPStar1.setAttribute('src', "./assets/dist/images/star.png");
					const question = reformList[0]
					const data={
						'grade':question['difficulty'],
						'field':"BackEnd",
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
							star1Id = data['pk'];
						},
						error: function(err) {
							console.log(err);
						}
					});
				}
				else {
					$BEPStar1.setAttribute('src', "./assets/dist/images/empty-star.png");
					$.ajax({
						type: "DELETE",
						url: url + "interview/favorite/" + star1Id,
						headers: {
							"Content-Type": "application/json",
							'Authorization': `Bearer ${accessToken}`,
						},
						error: function(err) {
							console.log(err);
						}
					})
				}
			})
			const $BEPStar2 = $main.querySelector('.BEP-star2');
			let star2Id;
			$BEPStar2.addEventListener('click', () => {
				const starSrc = $BEPStar2.getAttribute('src')
				if (starSrc.includes('empty-star.png')) {
					$BEPStar2.setAttribute('src', "./assets/dist/images/star.png");
					const question = reformList[1]
					const data={
						'grade':question['difficulty'],
						'field':"BackEnd",
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
							star2Id = data['pk'];
						},
						error: function(err) {
							console.log(err);
						}
					});
				}
				else {
					$BEPStar2.setAttribute('src', "./assets/dist/images/empty-star.png");
					$.ajax({
						type: "DELETE",
						url: url + "interview/favorite/" + star2Id,
						headers: {
							"Content-Type": "application/json",
							'Authorization': `Bearer ${accessToken}`,
						},
						error: function(err) {
							console.log(err);
						}
					})
				}
			})
			// 화살표 클릭 시 BEPage 다시 렌더링
			const $BEPArrowContainer = $main.querySelector('.BEP-arrowContainer');
			pageRenderByButton($BEPArrowContainer, BEPPageRender);
		},
		error: function(error) {
            console.log(error);
        }
	})
};
pageRenderByButton($navBE, BEPPageRender);

// 클릭 시 FE Cheat Sheet 페이지로 이동
function FEPageRender() {
	stopTimer();
	loadingWithMask();
	$.ajax({
		method: "POST",
		url: url + "interview/field_question/",
		headers: {
			"Content-Type": "application/json",
			'Authorization': `Bearer ${accessToken}`,
		},
		data: JSON.stringify({"field":"FrontEnd"}),
		success: function(data) {
			closeLoadingWithMask();
			const reformList = data['question_list']
			pageRender(FEPage(reformList[0]['difficulty'], reformList[0]['question'], reformList[0]['intent'], reformList[0]['perfectAnswer'], reformList[1]['difficulty'], reformList[1]['question'], reformList[1]['intent'], reformList[1]['perfectAnswer']));
			// 즐겨찾기 별 변경
			const $FEPStar1 = $main.querySelector('.FEP-star1');
			let star1Id;
			$FEPStar1.addEventListener('click', () => {
				const starSrc = $FEPStar1.getAttribute('src')
				if (starSrc.includes('empty-star.png')) {
					$FEPStar1.setAttribute('src', "./assets/dist/images/star.png");
					const question = reformList[0]
					const data={
						'grade':question['difficulty'],
						'field':"FrontEnd",
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
							star1Id = data['pk'];
						},
						error: function(err) {
							console.log(err);
						}
					});
				}
				else {
					$FEPStar1.setAttribute('src', "./assets/dist/images/empty-star.png");
					$.ajax({
						type: "DELETE",
						url: url + "interview/favorite/" + star1Id,
						headers: {
							"Content-Type": "application/json",
							'Authorization': `Bearer ${accessToken}`,
						},
						error: function(err) {
							console.log(err);
						}
					})
				}
			})
			const $FEPStar2 = $main.querySelector('.FEP-star2');
			let star2Id;
			$FEPStar2.addEventListener('click', () => {
				const starSrc = $FEPStar2.getAttribute('src')
				if (starSrc.includes('empty-star.png')) {
					$FEPStar2.setAttribute('src', "./assets/dist/images/star.png");
					const question = reformList[1]
					const data={
						'grade':question['difficulty'],
						'field':"FrontEnd",
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
							star2Id = data['pk'];
						},
						error: function(err) {
							console.log(err);
						}
					});
				}
				else {
					$FEPStar2.setAttribute('src', "./assets/dist/images/empty-star.png");
					$.ajax({
						type: "DELETE",
						url: url + "interview/favorite/" + star2Id,
						headers: {
							"Content-Type": "application/json",
							'Authorization': `Bearer ${accessToken}`,
						},
						error: function(err) {
							console.log(err);
						}
					})
				}
			})
			// 화살표 클릭 시 BEPage 다시 렌더링
			const $FEPArrowContainer = $main.querySelector('.FEP-arrowContainer');
			pageRenderByButton($FEPArrowContainer, FEPageRender);
		},
		error: function(error) {
            console.log(error);
        }
	})
};
pageRenderByButton($navFE, FEPageRender);