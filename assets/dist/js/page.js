const $main = document.querySelector('.main');
const accessToken = localStorage.getItem('accessToken');
const refreshToken = localStorage.getItem('refreshToken');
const url = "https://mockinterview.shop/";

function loadingWithMask(gif) {
	//화면의 높이와 너비를 구합니다.
	var maskHeight = $(document).height();
	var maskWidth  = window.document.body.clientWidth;

	//화면에 출력할 마스크를 설정해줍니다.
	var mask = "<div id='mask' style='position:absolute; z-index:9000; background-color:#000000; display:none; left:0; top:0;'></div>";
	var loadingSpinner = `
	<div class="spinner-border text-secondary" role="status" style='position: absolute; display: block; margin-top: 10rem;' id="loading-spinner">
		<span class="visually-hidden">Loading...</span>
	</div>`;

	//화면에 레이어 추가
	$('body').append(mask)

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

