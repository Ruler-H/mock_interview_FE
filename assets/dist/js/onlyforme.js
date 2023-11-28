const OFMPage = (str1) => `
<div class="OFMP-title">
<p class="h1 OFMP-h1">Only For Me</p>
</div>
<div class="OFMP-cardGroup">
	${str1}
</div>
`

const $navOFM = document.querySelector('.nav-OFM');

// 클릭 시 Only For Me 페이지로 이동
function OFMRender() {
	stopTimer();
    let addHTML = ``;
    $.ajax({
        method: "GET",
		url: url + "interview/favorite/",
		headers: {
			"Content-Type": "application/json",
			'Authorization': `Bearer ${accessToken}`,
		},
        success: function(datas) {
            datas.forEach(data => {
                addHTML += `
                <div class="card text-center OFMP-container">
                    <div class="card-header OFMP-cardHeader">
                        <p>난이도 : ${data['grade']}</p>
                        <img src="./assets/dist/images/star.png" class="OFMP-star OFM-star${data['id']}" alt="별" data-que=${data['question']}>
                    </div>
                    <div class="card-body OFMP-cardBody">
                        <div class="OFMP-cardContent">
                            <p class="card-text">
                                ${data['question']}
                            </p>
                            <h5 class="card-title OFMP-subHeading">질문 의도</h5>
                            <hr class="OFMP-hr">
                            <p class="card-text">
                                ${data['intent']}
                            </p>
                            <h5 class="card-title OFMP-subHeading">만점 답안</h5>
                            <hr class="OFMP-hr">
                            <p class="card-text">
                                ${data['model_answer']}
                            </p>
                        </div>
                    </div>
                </div>
                `
            })
            pageRender(OFMPage(addHTML));
            datas.forEach(data => {
                const $star = $main.querySelector(`.OFM-star${data['id']}`);
                $star.addEventListener('click', () => {
                    const starSrc = $star.getAttribute('src');
                    if (starSrc.includes('empty-star.png')) {
                        $star.setAttribute('src', "./assets/dist/images/star.png");
                        $.ajax({
                            type: "POST",
                            url: url + "interview/favorite/",
                            headers: {
                                "Content-Type": "application/json",
                                'Authorization': `Bearer ${accessToken}`,
                            },
                            data: JSON.stringify(data),
                            success: function(res){
                                data['id'] = res['pk'];
                            },
                            error: function(err) {
                                console.log(err);
                            }
                        });
                    }else{
                        $star.setAttribute('src', "./assets/dist/images/empty-star.png");
                        $.ajax({
                            type: "DELETE",
                            url: url + "interview/favorite/" + data['id'],
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
            })
        },
        error: function(error) {
            console.log(error);
        }
    })
}
pageRenderByButton($navOFM, OFMRender);