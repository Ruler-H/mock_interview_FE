const chatbotPage = `
    <div class="d-flex w-100">
        <div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-body-tertiary chat-list h-100" style="width: 235px; max-height: 660px; overflow: auto;">
            <div class="d-flex align-items-center flex-shrink-0 p-3 link-body-emphasis text-decoration-none border-bottom chat-create">
                <svg class="bi pe-none me-2" width="30" height="24"><use xlink:href="#bootstrap"></use></svg>
                <span class="fs-5 fw-semibold">채팅방 목록</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1  0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                </svg>
            </div>
        </div>
        <div class="h-100 w-100 d-flex justify-content-center">
            <div class="w-100 d-flex flex-column" style="max-width: 766px;">
                <div class="content-container d-flex flex-row" style="height: 600px;">
                    <div class="col-md-6 w-100 mb-4" style="overflow: auto;">
                        <span class="sc-knefzF PVUie">Tech Chatbot</span>
                        <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                            <div class="col p-4 d-flex flex-column position-static" style="background-color:rgb(242, 247, 255)";>
                                HTML의 input 태그에 입력된 텍스트 값을 JavaScript를 통해서 가져오는 것은 매우 간단합니다. 아래 코드를 참조해 주세요.
                            </div>
                        </div>
                        <span class="sc-knefzF PVUie" style="display:block; text-align:right;">User</span>
                        <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                            <div class="col p-4 d-flex flex-column position-static" style="background-color:rgb(100, 70, 255); color: rgb(255, 255, 255);";>
                                HTML의 input 태그에 입력된 텍스트 값을 JavaScript를 통해서 가져오는 것은 매우 간단합니다. 아래 코드를 참조해 주세요.
                            </div>
                        </div>
                    </div>
                </div>
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="질문을 입력하세요." aria-label="Recipient's username" aria-describedby="button-addon2">
                    <button class="btn btn-outline-secondary" type="button" id="button-addon2">질문</button>
                </div>
            </div>
        </div>
    </div>
`;

const $techChat = document.querySelector('.tech-chat');

async function chatCreateEvent() {
    try {
        const accountStatusResponse = await fetch(url + "account/status/", {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        const accountData = await accountStatusResponse.json();
        
        const chatbotResponse = await fetch(url + 'chatbot/', {
            method: "POST",
            headers: {  
                "Content-Type": "application/json",
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                "client": accountData["pk"],
            }),
        });

        const chatbotData = await chatbotResponse.json();
        console.log(chatbotData);
        chatbotPageLoad();
    } catch (error) {
        console.error('Error:', error);
    }
}

function chatListLoad() {
    const $chatList = document.querySelector('.chat-list');

    fetch(url + 'chatbot/list/', {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    }).then(res => res.json()
    ).then(datas => {
        for(let i = 0; i < datas.length; i++){
            message = datas[i]["message"];
            if (message === ""){
                message = "이전 채팅 내용이 없습니다.";
            }
            divTag = `
            <div class="list-group list-group-flush border-bottom scrollarea">
                <input type="hidden" value="${datas[i]["id"]}"=>
                <a href="#" class="list-group-item list-group-item-action py-3 lh-sm chat${datas[i]["id"]}">
                    <div class="col-10 mb-1 small">${message}</div>
                </a>
            </div>
            `
            $chatList.innerHTML += divTag;
        }
    })
}

function chatbotPageLoad() {
    pageRender(chatbotPage);
    attachEventToChatCreate();
    chatListLoad();
}

function attachEventToChatCreate() {
    const $chatCreate = document.querySelector('.chat-create');
    if ($chatCreate) {
        $chatCreate.removeEventListener('click', chatCreateEventHandler);
        $chatCreate.addEventListener('click', chatCreateEventHandler);
    }
}

function chatCreateEventHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    chatCreateEvent();
}

$techChat.addEventListener('click', () => {
    fetch(url + 'account/status/', {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    }).then(async(res) => {
        const data = await res.json();
        if (res.ok) {
            chatbotPageLoad();
        }else{
            loginPageLoad();
        }
    }).catch(error => {
        console.error('Error:', error);
    });
    
});

